import React from "react";
import UseTodoContext from "../libs/context/TodoContext";
import Todos from "./Todos";

const TodoApp = () => {
  const { todos, loading } = UseTodoContext();
  return (
    <div className="row">
      <Todos
        todos={todos.filter((item) => !item.completed)}
        loading={loading}
        add={true}
      >
        <h2 className="title title-2">List Undone</h2>
      </Todos>

      <Todos
        todos={todos.filter((item) => item.completed)}
        label={"taches terminées"}
      >
        <h2 className="title title-2">List Done</h2>
      </Todos>
    </div>
  );
};

export default TodoApp;
