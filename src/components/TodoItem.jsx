import React from "react";

const TodoItem = ({ todo, index, onClick, Ondelete, isActive }) => {
  return (
    <li className="flex items-center justify-between w-full">
      <input
        onInput={onClick}
        className={`hidden ${isActive && "is-active"}`}
        type="checkbox"
        id={index}
        defaultChecked=""
      />
      <label
        className="flex items-center h-10 px-2 rounded cursor-pointer basis-11/12 hover:bg-gray-100"
        htmlFor={index}
      >
        <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="ml-4 text-sm">{todo.title}</span>
      </label>
      <button onClick={Ondelete}>
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19 5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"
            fill="currentColor"
          />
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;
