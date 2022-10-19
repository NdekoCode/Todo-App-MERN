import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [state, setstate] = useState({
    todos: [],
    loading: true,
  });
  useEffect(() => {
    (async () => {
      if (state.loading) {
        const response = await fetch("http://localhost:4500/todos");
        const responseData = await response.json();
        setstate({
          todos: responseData?.todos,
          loading: false,
        });
      }
    })();
  }, [state.loading]);
  const [newItem, setNewItem] = useState("");
  const completeTodo = useCallback((todo) => {
    const todos = state.todos.map((item) => {
      if (item === todo) {
        item.completed = !todo.completed;
      }
      fetch("http://localhost:4500/todos/update/" + todo._id, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      return item;
    });
    setstate((state) => ({ ...state, todos }));
  });
  const addItem = () => {
    if (newItem.length > 2) {
      setstate((state) => ({
        ...state,
        todos: [...state.todos, { completed: false, content: newItem }],
      }));
      fetch("http://localhost:4500/todos/add", {
        method: "POST",
        body: JSON.stringify({ completed: false, content: newItem }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      setNewItem("");
    } else {
      alert("Entrer une tache valide");
    }
  };
  const submitItem = useCallback((event) => {
    event.preventDefault();
    addItem();
  });
  const deleteItem = (todo) => {
    const newstate = state.todos.filter((item) => item !== todo);
    console.log(todo);
    setstate((state) => ({ ...state, todos: newstate }));
    fetch("http://localhost:4500/todos/delete/" + todo._id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    setNewItem(event.target.value);
  };
  return (
    <div className="row">
      <div className="space-x-2 col-md-6">
        <h2 className="title title-2">List Undone</h2>
        <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
          <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
            {state.todos
              .filter((item) => !item.completed)
              .map((item, index) => (
                <TodoItem
                  todo={item}
                  key={item._id}
                  index={`${item._id}-${Date.now()}`}
                  isActive={item.completed}
                  onClick={() => completeTodo(item)}
                  Ondelete={() => deleteItem(item)}
                >
                  {item.title}
                </TodoItem>
              ))}
          </ul>
          <p className="my-2">
            {state.todos.filter((item) => !item.completed).length} state restant
          </p>
          <form
            onSubmit={submitItem}
            method="POST"
            className="flex state-center w-full h-8 px-2 mt-2 text-sm font-medium rounded"
          >
            <button onClick={submitItem}>
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
            </button>
            <input
              className="flex-grow h-8 ml-4 font-medium bg-transparent focus:outline-none"
              type="text"
              value={newItem}
              onChange={handleChange}
              onKeyDown={handleChange}
              placeholder="add a new task"
            />
          </form>
        </div>
      </div>

      <div className="space-x-2 col-md-6 ">
        <h2 className="title title-2">List Done</h2>
        <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
          <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
            {state.todos
              .filter((item) => item.completed)
              .map((item, index) => (
                <TodoItem
                  todo={item}
                  key={item._id}
                  index={`${item._id} + ${item.title}`}
                  onClick={() => completeTodo(item)}
                  Ondelete={() => deleteItem(item)}
                  isActive={item.completed}
                  completeTodo={completeTodo}
                >
                  {item.title}
                </TodoItem>
              ))}
          </ul>
          <p className="my-2">
            {state.todos.filter((item) => item.completed).length} taches
            terminées
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
