import PropTypes from 'prop-types';
import { TiDelete } from 'react-icons/ti';
import { PiSmileySad } from "react-icons/pi";
import { MdModeEdit, MdCheckBoxOutlineBlank, MdCheckBox, MdOutlineDone } from 'react-icons/md';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect } from 'react';

const Todos = ({ todoPasser, delTodo, editTodo, completedTodos, toggleComplete }) => {
  // const noDataImg = 'https://i.ibb.co/rsWL99H/Screenshot-2024-09-08-161243.png';
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

  const handleEditClick = (index, currentValue) => {
    setEditMode(index);
    setEditValue(currentValue);
  };

  const saveEdit = (index) => {
    editTodo(index, editValue);
    setEditMode(null);
  };

  return (
    <div>
      <ul>
        <TransitionGroup>
          {todoPasser.length !== 0 ? (
            todoPasser.map((todo, index) => (
              <CSSTransition key={index} timeout={300} classNames="todo-item">
                <li>
                  <div style={{
                    textDecoration: completedTodos[index] ? 'line-through' : 'none'
                  }}>
                    {editMode === index ? (
                      <input
                        className='editBox'
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      todo
                    )}
                  </div>
                  <div>
                    {completedTodos[index] ? (
                      <MdCheckBox onClick={() => toggleComplete(index)} />
                    ) : (
                      <MdCheckBoxOutlineBlank onClick={() => toggleComplete(index)} />
                    )}

                    {editMode === index ? (
                      <MdOutlineDone onClick={() => saveEdit(index)} />
                    ) : (
                      <MdModeEdit onClick={() => handleEditClick(index, todo)} />
                    )}

                    <TiDelete onClick={() => delTodo(index)} />
                  </div>
                </li>
              </CSSTransition>
            ))
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
  todoPasser: PropTypes.arrayOf(PropTypes.string).isRequired,
  delTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  completedTodos: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired
};

export default Todos;