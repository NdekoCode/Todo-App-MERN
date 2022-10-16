import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [items, setItems] = useState([
    { completed: true, title: "Item #1" },
    { completed: true, title: "Item #2" },
    { completed: false, title: "Item #3" },
    { completed: false, title: "Item #4" },
    { completed: true, title: "Item #5" },
  ]);
  const completeTodo = useCallback((todo) => {
    const todos = items.map((item) => {
      console.log(todo.title);
      if (item === todo) {
        item.completed = !todo.completed;
      }
      return item;
    });
    setItems(todos);
  });
  const [newItem, setNewItem] = useState("");
  const addItem = () => {
    if (newItem.length > 2) {
      setItems((item) => [...item, { completed: false, title: newItem }]);
      setNewItem("");
    } else {
      alert("Entrer une tache valide");
    }
  };
  const deleteItem = (todo) => {
    const newItems = items.filter((item) => item !== todo);
    setItems(newItems);
  };
  const handleChange = (event) => {
    setNewItem(event.target.value);
    console.log(newItem);
    if (event.key === "Enter") {
      addItem(newItem);
    }
  };
  return (
    <div className="row">
      <div className="space-x-2 col-md-6">
        <h2 className="title title-2">List Undone</h2>
        <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
          <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
            {items
              .filter((item) => !item.completed)
              .map((item, index) => (
                <TodoItem
                  todo={item}
                  key={index}
                  index={`${index}-${new Date().getMilliseconds()}`}
                  isActive={item.completed}
                  onClick={() => completeTodo(item)}
                  Ondelete={() => deleteItem(item)}
                >
                  {item.title}
                </TodoItem>
              ))}
          </ul>
          <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              width={30}
              height={30}
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={32}
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M256 176v160M336 256H176"
              />
            </svg>

            <input
              className="flex-grow h-8 ml-4 font-medium bg-transparent focus:outline-none"
              type="text"
              value={newItem}
              onChange={handleChange}
              onKeyDown={handleChange}
              placeholder="add a new task"
            />
          </button>
        </div>
      </div>

      <div className="space-x-2 col-md-6 ">
        <h2 className="title title-2">List Done</h2>
        <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
          <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
            {items
              .filter((item) => item.completed)
              .map((item, index) => (
                <TodoItem
                  todo={item}
                  key={index}
                  index={`${index} + ${item.title}`}
                  onClick={() => completeTodo(item)}
                  Ondelete={() => deleteItem(item)}
                  isActive={item.completed}
                  completeTodo={completeTodo}
                >
                  {item.title}
                </TodoItem>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
