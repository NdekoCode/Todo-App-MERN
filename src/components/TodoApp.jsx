import React from "react";
import { useCallback } from "react";
import { useState } from "react";

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
  return (
    <>
      <div className="row">
        <div className="space-x-2 col-md-6 ">
          <h2 className="title title-2">List Undone</h2>
          <ul className="card">
            {items
              .filter((item) => !item.completed)
              .map((item, index) => (
                <li onClick={() => completeTodo(item)} key={index}>
                  {item.title}
                </li>
              ))}
          </ul>
        </div>

        <div className="space-x-2 col-md-6 ">
          <h2 className="title title-2">List Done</h2>
          <ul className="card">
            {items
              .filter((item) => item.completed)
              .map((item, index) => (
                <li onClick={() => completeTodo(item)} key={index}>
                  {item.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="w-full h-screen pt-8 bg-gray-100">
        <div className="max-w-md p-3 mx-auto bg-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold">ToDo App</h1>
            <div className="flex mt-4">
              <input
                className="text-black border-b-2 border-gray-500 w-80"
                type="text"
                placeholder="Enter your task here"
              />
              <button className="flex p-2 ml-2 text-green-500 border-2 border-green-500 rounded-lg hover:text-white hover:bg-green-500">
                <svg
                  className="w-6 h-6"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {"{"}" "{"}"}
                  <path stroke="none" d="M0 0h24v24H0z" />
                  {"{"}" "{"}"}
                  <circle cx={12} cy={12} r={9} />
                  {"{"}" "{"}"}
                  <line x1={9} y1={12} x2={15} y2={12} />
                  {"{"}" "{"}"}
                  <line x1={12} y1={9} x2={12} y2={15} />
                </svg>
                <span>Add</span>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <ul>
              <li className="p-2 rounded-lg">
                <div className="flex flex-row justify-between align-middle">
                  <div className="p-2">
                    <input
                      type="checkbox"
                      className="w-6 h-6 "
                      defaultValue="true"
                      defaultChecked=""
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-lg text-gray-400 line-through">
                      Cook maggie
                    </p>
                  </div>
                  <button className="flex p-2 text-red-500 border-2 border-red-500 rounded-lg">
                    <svg
                      className="w-6 h-6 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {"{"}" "{"}"}
                      <circle cx={12} cy={12} r={10} />
                      {"{"}" "{"}"}
                      <line x1={15} y1={9} x2={9} y2={15} />
                      {"{"}" "{"}"}
                      <line x1={9} y1={9} x2={15} y2={15} />
                    </svg>
                    <span>Remove</span>
                  </button>
                </div>
                <hr className="mt-2" />
              </li>
              <li className="p-2 rounded-lg">
                <div className="flex flex-row justify-between align-middle">
                  <div className="p-2">
                    <input
                      type="checkbox"
                      className="w-6 h-6 "
                      defaultValue="true"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-lg text-black">Wash disc</p>
                  </div>
                  <button className="flex p-2 text-red-500 border-2 border-red-500 rounded-lg">
                    <svg
                      className="w-6 h-6 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {"{"}" "{"}"}
                      <circle cx={12} cy={12} r={10} />
                      {"{"}" "{"}"}
                      <line x1={15} y1={9} x2={9} y2={15} />
                      {"{"}" "{"}"}
                      <line x1={9} y1={9} x2={15} y2={15} />
                    </svg>
                    <span>Remove</span>
                  </button>
                </div>
                <hr className="mt-2" />
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <button className="p-2 text-red-500 border-2 border-red-500">
              Clear Completed Task
            </button>
            <button className="p-2 ml-4 text-indigo-500 border-2 border-indigo-500">
              Reset Todo List
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-screen h-screen font-medium">
        <div className="flex items-center justify-center flex-grow h-full text-gray-600 bg-gray-100">
          {/* Component Start */}
          <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-indigo-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h4 className="ml-3 text-lg font-semibold">Frodo's Jobs</h4>
            </div>
            <div>
              <input
                className="hidden"
                type="checkbox"
                id="task_1"
                defaultChecked=""
              />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                htmlFor="task_1"
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
                <span className="ml-4 text-sm">Weed front garden.</span>
              </label>
            </div>
            <div>
              <input
                className="hidden"
                type="checkbox"
                id="task_2"
                defaultChecked=""
              />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                htmlFor="task_2"
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
                <span className="ml-4 text-sm">
                  Chill and smoke some Old Toby.
                </span>
              </label>
            </div>
            <div>
              <input className="hidden" type="checkbox" id="task_3" />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                htmlFor="task_3"
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
                <span className="ml-4 text-sm">Keep ring secret and safe.</span>
              </label>
            </div>
            <div>
              <input className="hidden" type="checkbox" id="task_4" />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                htmlFor="task_4"
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
                <span className="ml-4 text-sm">Meet Gandalf at Bree.</span>
              </label>
            </div>
            <div>
              <input className="hidden" type="checkbox" id="task_5" />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                htmlFor="task_5"
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
                <span className="ml-4 text-sm">
                  Destroy ring and defeat dark lord.
                </span>
              </label>
            </div>
            <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
              <svg
                className="w-5 h-5 text-gray-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <input
                className="flex-grow h-8 ml-4 font-medium bg-transparent focus:outline-none"
                type="text"
                placeholder="add a new task"
              />
            </button>
          </div>
          {/* Component End  */}
        </div>
        <div className="flex items-center justify-center flex-grow h-full bg-gray-900">
          {/* Component Start */}
          <div className="max-w-full p-8 text-gray-200 bg-gray-800 rounded-lg shadow-lg w-96">
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-indigo-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h4 className="ml-3 text-lg font-semibold">Sam's Jobs</h4>
            </div>
            <div>
              <input
                className="hidden"
                type="checkbox"
                id="task_6"
                defaultChecked=""
              />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                htmlFor="task_6"
              >
                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
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
                <span className="ml-4 text-sm">Trim the verge.</span>
              </label>
            </div>
            <div>
              <input
                className="hidden"
                type="checkbox"
                id="task_7"
                defaultChecked=""
              />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                htmlFor="task_7"
              >
                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
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
                <span className="ml-4 text-sm">
                  Eavesdrop on Master Frodo &amp; Gandalf.
                </span>
              </label>
            </div>
            <div>
              <input className="hidden" type="checkbox" id="task_8" />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                htmlFor="task_8"
              >
                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
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
                <span className="ml-4 text-sm">
                  Boil, mash, and stick potatoes in stew.
                </span>
              </label>
            </div>
            <div>
              <input className="hidden" type="checkbox" id="task_9" />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                htmlFor="task_9"
              >
                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
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
                <span className="ml-4 text-sm">Carry Frodo.</span>
              </label>
            </div>
            <div>
              <input className="hidden" type="checkbox" id="task_10" />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                htmlFor="task_10"
              >
                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
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
                <span className="ml-4 text-sm">Be all round legend.</span>
              </label>
            </div>
            <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
              <svg
                className="w-5 h-5 text-gray-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <input
                className="flex-grow h-8 ml-4 font-medium bg-transparent focus:outline-none"
                type="text"
                placeholder="add a new task"
              />
            </button>
          </div>
          {/* Component End  */}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
