import React from "react";
import UseTodoContext from "../libs/context/TodoContext";
import TodoItem from "./TodoItem";

const ListTodos = ({ todos }) => {
  const { completeTodo, deleteItem } = UseTodoContext();
  return (
    <ul className="max-w-full p-5 bg-white rounded-lg todo-item w-96">
      {todos
        .filter((item) => !item.completed)
        .map((item, index) => (
          <TodoItem
            todo={item}
            key={index}
            index={item._id}
            isActive={item.completed}
            onClick={() => completeTodo(item)}
            Ondelete={() => deleteItem(item)}
          >
            {item.title}
          </TodoItem>
        ))}
    </ul>
  );
};

export default ListTodos;
