import React, { useCallback } from "react";

const AddTodo = () => {
  const { newItem, setNewItem, addItem } = UseTodoContext();
  const submitItem = useCallback((event) => {
    event.preventDefault();
    addItem();
  });
  const handleChange = (event) => {
    setNewItem(event.target.value);
  };
  return (
    <form
      onSubmit={submitItem}
      method="POST"
      className="flex w-full h-8 px-2 mt-2 text-sm font-medium rounded state-center"
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
  );
};

export default AddTodo;
