import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItems from "./TodoItems";
import "./style.css";

const API_BASE = "http://localhost:4001/todo";
const TodoHome = () => {
  const [items, setItems] = useState([]);
  // Add input state, we will store the user's input in this state
  const [input, setInput] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);
  // Store the target's value into the input state
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addItem = () => {
    axios.post(API_BASE + "/new", { data: input }).then((res) => {
      GetTodos();
      setInput("");
    });
  };

  const GetTodos = () =>
    axios
      .get(API_BASE)
      .then((res) => {
        setItems(res.data.reverse());
      })
      .catch((Error) => {});

  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>
        <button onClick={addItem}>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">
        {items.map((item, index) => (
          <TodoItems
            name={item.name}
            id={item._id}
            setItems={setItems}
            isCompleted={item.isCompleted}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoHome;
