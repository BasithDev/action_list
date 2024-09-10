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
    localStorage.setItem("todos", JSON.stringify(todoPasser));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [todoPasser, completedTodos]);

  const addTodo = (val) => {
    const tempArr = [...todoPasser, val].reverse();
    setTodoPasser(tempArr);
  };

  const delTodo = (id) => {
    const tempArr = todoPasser.filter((_, i) => id !== i);
    setTodoPasser(tempArr);
    const updatedCompletedTodos = { ...completedTodos };
    delete updatedCompletedTodos[id];
    setCompletedTodos(updatedCompletedTodos);
  };

  const editTodo = (index, newValue) => {
    const updatedTodos = todoPasser.map((todo, i) => (i === index ? newValue : todo));
    setTodoPasser(updatedTodos);
  };

  const toggleComplete = (index) => {
    setCompletedTodos(prev => ({
      ...prev,
      [index]: !prev[index],
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