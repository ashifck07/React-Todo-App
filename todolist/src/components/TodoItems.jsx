import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const API_BASE = "http://localhost:4001/todo";

const TodoItems = ({ item=[], setItems }) => {
  const { name, _id, isCompleted } = item;
  const [check, setCheck] = useState(isCompleted);

  useEffect(() => {
    setCheck(isCompleted);
  }, [isCompleted]);

  const deleteTodo = (id) => {
    axios.delete(`${API_BASE}/delete/${id}`).then(() => {
      setItems((items) => items.filter((item) => item._id !== id));
    });
  };

  const handleCheckBox = (e, id) => {
    const newChecked = e.target.checked;

    axios.put(API_BASE + "/update", { _id: id})
      .then(() => {
        setCheck(newChecked);
        setItems((items) =>
          items.map((item) =>
            item._id === id ? { ...item, isCompleted: newChecked } : item
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update the task status", err);
      });
  };

  return (
    <div>
    <div className={`todo ${check?"check":"unCheck"}`}>
      <input
        checked={check}
        className="box"
        type="checkbox"
        onChange={(e) => handleCheckBox(e, _id)}
        />
      <div className={check ? "completed" : "text"}>{name}</div>
      <div className="delete-todo" onClick={() => deleteTodo(_id)}>
        <span>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </div>
    </div>
  </div>
  );
};

export default TodoItems;






