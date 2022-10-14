import { useState } from "react";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div className="">
      <div className="container">
        <h1 className="my-3 text-4xl font-bold">Todo List</h1>
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
