import React, { useEffect, useState } from "react";

export function useFetch(url) {
  console.log(url);
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
          loading: false,
        }));
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
  }, []);
  return [state];
}
