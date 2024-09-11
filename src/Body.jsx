import { useState, useEffect } from "react";
import Input from "./Input";
import Todos from "./Todos";

const Body = () => {
  const [todoPasser, setTodoPasser] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [completedTodos, setCompletedTodos] = useState(() => {
    const savedCompletedTodos = localStorage.getItem("completedTodos");
    return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : {};
  });

  useEffect(() => {
    if (todoPasser.length === 0) {
      localStorage.removeItem("todos");
      localStorage.removeItem("completedTodos");
    } else {
      localStorage.setItem("todos", JSON.stringify(todoPasser));
      localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    }
  }, [todoPasser, completedTodos]);

  const addTodo = (val) => {
    const newTodo = { id: Date.now(), text: val };
    setTodoPasser(prevTodos => [...prevTodos, newTodo]);
  };

  const delTodo = (id) => {
    const updatedTodos = todoPasser.filter(todo => todo.id !== id);
    setTodoPasser(updatedTodos);
    const updatedCompletedTodos = { ...completedTodos };
    delete updatedCompletedTodos[id];
    setCompletedTodos(updatedCompletedTodos);
    if (updatedTodos.length === 0) {
      localStorage.removeItem('todos');
      localStorage.removeItem('completedTodos');
    } else {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    }
  };

  const editTodo = (id, newValue) => {
    const updatedTodos = todoPasser.map(todo => 
      todo.id === id ? { ...todo, text: newValue } : todo
    );
    setTodoPasser(updatedTodos);
  };

  const toggleComplete = (id) => {
    setCompletedTodos(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="box">
      <Input addTodo={addTodo} />
      <Todos 
        todoPasser={todoPasser}
        delTodo={delTodo}
        editTodo={editTodo}
        completedTodos={completedTodos}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default Body;
