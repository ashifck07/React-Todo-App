import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const TodoItems = (props) => {
  const API_BASE = "http://localhost:4001/todo";
  const { name, id, setItems, isCompleted } = props;
  const [check, setCheck] = useState(isCompleted);
  const deleteTodo = (id) => {
    axios.delete(`${API_BASE}/delete/${id}`).then((res) => {
      setItems((items) => items.filter((item) => item._id !== id));
    });
  };
  const handleCheckBox = (e, id) => {
    axios.put(API_BASE + "/update", { _id: id }).then((res) => {});

    setCheck(e.target.checked);
  };

  return (
    <div className="todo">
      <input
        checked={check}
        className="box"
        type="checkbox"
        onChange={(e) => handleCheckBox(e, id)}
      />
      <div className={check ? "completed" : "text"}>{name}</div>
      <div className="delete-todo" onClick={() => deleteTodo(id)}>
        <span>X</span>
      </div>
    </div>
  );
};
export default TodoItems;
