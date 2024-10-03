import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItems from "./TodoItems";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";
import CompletedItem from "./CompletedItem";
import InCompletedItem from "./InCompletedItem";

const API_BASE = "http://localhost:4001/todo";

const TodoHome = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const location = useLocation();
  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => {
        setItems(res.data.reverse());
      })
      .catch((err) => console.log(err));
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addItem = () => {
    if (input) {
      axios.post(API_BASE + "/new", { data: input }).then(() => {
        setInput("");
      });
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>
          TO-DO<span className="head">APP</span>
        </h1>
      </div>
      <div className="form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="enter task"
        />
        <button onClick={addItem}>
          <span>ADD</span>
        </button>
      </div>
      <ul className="d-flex gap-3 p-0 justify-content-between">
        <li className="list">
          <Link
            to="/"
            className={`link ${location.pathname === "/" ? "underline" : ""}`}
          >
            All
          </Link>
        </li>
        <li className="list">
          <Link
            to="/completed"
            className={`link ${
              location.pathname === "/completed" ? "underline" : ""
            }`}
          >
            Completed
          </Link>
        </li>
        <li className="list">
          <Link
            to="/incomplete"
            className={`link ${
              location.pathname === "/incomplete" ? "underline" : ""
            }`}
          >
            Incomplete
          </Link>
        </li>
      </ul>
      <div className="todolist">
        <Routes>
          <Route
            path="/"
            element={items.map((item) => (
              <TodoItems key={item._id} item={item} setItems={setItems} />
            ))}
          />
          <Route
            path="/completed"
            element={
            <CompletedItem items={items} setItems={setItems} />}
          />
          <Route
            path="/incomplete"
            element={<InCompletedItem items={items} setItems={setItems} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default TodoHome;

