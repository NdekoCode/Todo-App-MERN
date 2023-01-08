import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetch } from "../hooks/useFetch";
import { postItem } from "../services/todos";
export const TodoContext = createContext();
export const TodoContextProvider = memo(({ children }) => {
  const [items, loading] = useFetch("http://localhost:4500/api/v1/todos");
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");

  const completeTodo = useCallback(async (todo) => {
    const newTodos = todos.map((item) => {
      if (item === todo) {
        item.completed = !todo.completed;
      }
      (async () => {
        await postItem(
          "http://localhost:4500/api/v1/todos/update/" + todo._id,
          {
            method: "PUT",
            body: JSON.stringify(item),
          }
        );
      })();
      setNewItem("");
      return item;
    });
    setTodos(newTodos);
  });

  const addItem = useCallback(() => {
    if (newItem.length > 2) {
      (async () => {
        await postItem("http://localhost:4500/api/v1/todos/add", {
          body: JSON.stringify({ completed: false, content: newItem }),
        });
        setTodos([...state.todos, { completed: false, content: newItem }]);
        setNewItem("");
      })();
    } else {
      alert("Entrer une tache valide");
    }
  }, []);

  const deleteItem = (todo) => {
    const newstate = state.todos.filter((item) => item !== todo);
    setTodos(newstate);
    (async () => {
      await postItem("http://localhost:4500/api/v1/todos/delete/" + todo._id, {
        method: "DELETE",
      });
    })();
  };
  useEffect(() => {
    setTodos(items?.todos ? items?.todos : []);
  }, [loading]);
  const value = useMemo(
    () => ({
      todos,
      loading,
      setTodos,
      newItem,
      setNewItem,
      completeTodo,
      addItem,
      deleteItem,
    }),
    [todos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
});
const UseTodoContext = () => useContext(TodoContext);
export default UseTodoContext;
