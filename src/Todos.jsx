import PropTypes from 'prop-types';
import { TiDelete } from 'react-icons/ti';
import { PiSmileySad } from "react-icons/pi";
import { MdModeEdit, MdCheckBoxOutlineBlank, MdCheckBox, MdOutlineDone } from 'react-icons/md';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect } from 'react';

const Todos = ({ todoPasser, delTodo, editTodo, completedTodos, toggleComplete }) => {
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    if (todoPasser.length === 0) {
      const timer = setTimeout(() => {
        setShowNoData(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowNoData(false);
    }
  }, [todoPasser]);

  const handleEditClick = (id, currentValue) => {
    setEditMode(id);
    setEditValue(currentValue);
  };

  const saveEdit = (id) => {
    editTodo(id, editValue);
    setEditMode(null);
  };

  return (
    <div>
      <ul>
        <TransitionGroup>
          {todoPasser.length !== 0 ? (
            todoPasser.map(todo => (
              <CSSTransition key={todo.id} timeout={300} classNames="todo-item">
                <li>
                  <div style={{
                    textDecoration: completedTodos[todo.id] ? 'line-through' : 'none'
                  }}>
                    {editMode === todo.id ? (
                      <input
                        className='editBox'
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      todo.text
                    )}
                  </div>
                  <div>
                    {completedTodos[todo.id] ? (
                      <MdCheckBox onClick={() => toggleComplete(todo.id)} />
                    ) : (
                      <MdCheckBoxOutlineBlank onClick={() => toggleComplete(todo.id)} />
                    )}

                    {editMode === todo.id ? (
                      <MdOutlineDone onClick={() => saveEdit(todo.id)} />
                    ) : (
                      <MdModeEdit onClick={() => handleEditClick(todo.id, todo.text)} />
                    )}

                    <TiDelete onClick={() => delTodo(todo.id)} />
                  </div>
                </li>
              </CSSTransition>
            )).reverse()
          ) : showNoData ? (
            <CSSTransition key="no-data" timeout={300} classNames="no-data">
              <div className="noData">
                <PiSmileySad style={{fontSize:"80px",margin:"16px 0px"}} />
                <p style={{fontSize:"28px"}}>No items to display...</p>
              </div>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </ul>
    </div>
  );
};

Todos.propTypes = {
  todoPasser: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  delTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  completedTodos: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired
};

export default Todos;
