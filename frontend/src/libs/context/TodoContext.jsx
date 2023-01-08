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
import { getItems, postItem } from "../services/todos";
export const TodoContext = createContext();
export const TodoContextProvider = memo(({ children }) => {
  const [items, loading] = useFetch("http://localhost:4500/api/v1/todos");
  const [todos, setTodos] = useState([]);

  const completeTodo = useCallback((todo) => {
    const newTodos = todos.map((item) => {
      if (item._id === todo._id) {
        item.completed = !todo.completed;
        (async () => {
          await postItem(
            "http://localhost:4500/api/v1/todos/update/" + todo._id,
            {
              method: "PUT",
              body: JSON.stringify(item),
            }
          );
        })();
      }
      return item;
    });
    setTodos(newTodos);
  });

  const addItem = useCallback((newItem) => {
    if (newItem.length > 2) {
      (async () => {
        await postItem("http://localhost:4500/api/v1/todos/add", {
          body: JSON.stringify({ completed: false, content: newItem }),
        });
        const { todos } = await getItems("http://localhost:4500/api/v1/todos");
        setTodos(todos);
      })();
    } else {
      alert("Entrer une tache valide");
    }
  }, []);

  const deleteItem = (todo) => {
    (async () => {
      await postItem("http://localhost:4500/api/v1/todos/delete/" + todo._id, {
        method: "DELETE",
      });
      const newstate = todos.filter(({ _id }) => _id !== todo._id);
      setTodos(newstate);
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
