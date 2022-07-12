import React, { useEffect, useState } from "react";

export function useFetch(url) {
  const [state, setState] = useState({
    currentData: [],
    loading: true,
    error: false,
  });

  async function fetchData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setState((S) => ({
          ...S,
          currentData: data,
        }));

        setTimeout(() => {
          setState((S) => ({
            ...S,
            loading: false,
          }));
        }, 500);
      } else {
        setState((S) => ({
          ...S,
          error: data.error,
          loading: true,
        }));
      }
    } catch (error) {
      console.log("Error parsing JSON:", error);
    }
  }

  useEffect(() => {
    setState((S) => ({
      ...S,
      loading: true,
    }));
    fetchData(url);
  }, [url]);
  return [state];
}
