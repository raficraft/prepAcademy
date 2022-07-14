import React, { createContext, useState } from "react";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const [UI, SetUI] = useState({
    language: "FR",
    search: false,
  });

  callBack = {
    toggleSearchBar() {
      SetUI((S) => ({ ...S, search: !search }));
    },
  };

  return (
    <UIContext.Provider value={{ UI, callBack }}>{children}</UIContext.Provider>
  );
}
