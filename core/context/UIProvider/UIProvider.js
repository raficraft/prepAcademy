import React, { createContext, useState } from "react";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const [UI, SetUI] = useState({
    language: "FR",
    language_select: false,
    search: false,
  });

  const callback = {
    toggleSearchBar() {
      SetUI((S) => ({ ...S, search: !UI.search }));
    },
    toggleLanguageSelect() {
      SetUI((S) => ({ ...S, language_select: !UI.language_select }));
    },

    toggleLanguage(language) {
      SetUI((S) => ({ ...S, language: language }));
    },
  };

  return (
    <UIContext.Provider value={{ UI, callback }}>{children}</UIContext.Provider>
  );
}
