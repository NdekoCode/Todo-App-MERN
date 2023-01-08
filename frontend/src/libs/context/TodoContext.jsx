import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetch } from "../hooks/useFetch";
export const TodoContext = createContext();
export const TodoContextProvider = memo(({ children }) => {
  const [items, loading] = useFetch("http://localhost:4500/api/v1/todos");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(items?.todos ? items?.todos : []);
  }, [loading]);
  const value = useMemo(
    () => ({
      todos,
      loading,
      setTodos,
    }),
    [todos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
});
const UseTodoContext = () => useContext(TodoContext);
export default UseTodoContext;
