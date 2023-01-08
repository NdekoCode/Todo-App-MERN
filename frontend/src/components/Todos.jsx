import React from "react";
import AddTodo from "./AddTodo";
import CountStateTodo from "./CountStateTodo";
import ListTodos from "./ListTodos";

const Todos = ({
  loading = false,
  todos,
  add = true,
  label = "Tache restant",
  children = "",
}) => {
  return (
    <div className="space-x-2 col-md-6">
      {children}
      <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96 card">
        {loading ? "Loading..." : <ListTodos todos={todos} />}
        <CountStateTodo
          count={todos.filter((item) => !item.completed).length}
          text={label}
        />
        {add && <AddTodo />}
      </div>
    </div>
  );
};

export default Todos;
