import { useState } from "react";
import PropTypes from 'prop-types';

const Input = ({ addTodo }) => {
  const [val, setVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.trim()) {
      addTodo(val);
      setVal("");
    }
  };

  return (
    <div className="input-box">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Enter a Task..." 
          value={val} 
          onChange={(e) => setVal(e.target.value)} 
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

Input.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Input;
