import { useEffect, useState } from "react";

export function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });
  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const responseData = await response.json();
      if (response.ok) {
        setState((state) => ({
          ...state,
          items: responseData,
          loading: false,
        }));
      } else {
        setState((state) => ({ ...state, loading: false }));
      }
    })();
  }, [state.loading]);
  return [state.items, state.loading];
}
