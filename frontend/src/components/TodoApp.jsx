import React from "react";
import UseTodoContext from "../libs/context/TodoContext";
import AddTodo from "./AddTodo";
import CountStateTodo from "./CountStateTodo";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const { todos, loading, completeTodo, deleteItem } = UseTodoContext();
  return (
    <div className="row">
      <div className="space-x-2 col-md-6">
        <h2 className="title title-2">List Undone</h2>
        <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
          <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
            {loading
              ? "Loading..."
              : todos
                  .filter((item) => !item.completed)
                  .map((item, index) => (
                    <TodoItem
                      todo={item}
                      key={index}
                      index={`${item._id}-${Date.now()}`}
                      isActive={item.completed}
                      onClick={() => completeTodo(item)}
                      Ondelete={() => deleteItem(item)}
                    >
                      {item.title}
                    </TodoItem>
                  ))}
          </ul>
          <CountStateTodo
            count={todos.filter((item) => !item.completed).length}
            text={"state restant"}
          />
          <AddTodo />
        </div>
      </div>

      <div className="space-x-2 col-md-6 ">
        <h2 className="title title-2">List Done</h2>
        <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
          <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
            {todos
              .filter((item) => item.completed)
              .map((item, index) => (
                <TodoItem
                  todo={item}
                  key={index}
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
            {todos.filter((item) => item.completed).length} taches terminées
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
