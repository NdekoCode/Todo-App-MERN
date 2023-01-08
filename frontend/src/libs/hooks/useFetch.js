import { useEffect, useState } from "react";

export function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
        console.log(response.ok);
        if (response.ok) {
          setState((state) => ({
            ...state,
            items: responseData,
            loading: false,
          }));
        } else {
          setState((state) => ({
            ...state,
            items: { todos: [] },
            loading: false,
          }));
        }
      } catch (error) {
        setState((state) => ({
          ...state,
          items: { todos: [] },
          loading: false,
        }));
        console.log(error);
      }
    })();
  }, [state.loading]);
  console.log(state);
  return [state.items, state.loading];
}
