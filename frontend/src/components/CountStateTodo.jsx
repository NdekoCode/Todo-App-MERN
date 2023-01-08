import React from "react";

const CountStateTodo = ({ count, text }) => {
  return <p className="my-2">{`${count} ${text}`}</p>;
};

export default CountStateTodo;
