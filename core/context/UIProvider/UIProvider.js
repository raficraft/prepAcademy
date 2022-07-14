import React, { createContext, useState } from "react";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const [UI, SetUI] = useState({
    language: "FR",
    search: false,
  });

  const callback = {
    toggleSearchBar() {
      SetUI((S) => ({ ...S, search: !UI.search }));
    },
  };

  return (
    <UIContext.Provider value={{ UI, callback }}>{children}</UIContext.Provider>
  );
}
