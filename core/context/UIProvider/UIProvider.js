import React, { createContext, useState } from "react";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const [UI, setUI] = useState({
    language: "FR",
    language_select: false,
    search: false,
    nav_mobil: false,
    pagination_UI: 1,
    modal: false,
  });

  const callback = {
    toggleSearchBar() {
      setUI((S) => ({ ...S, search: !UI.search }));
    },
    toggleLanguageSelect() {
      setUI((S) => ({ ...S, language_select: !UI.language_select }));
    },

    toggleLanguage(language) {
      setUI((S) => ({ ...S, language: language }));
    },
    toggleNavMobil() {
      setUI((S) => ({ ...S, nav_mobil: !UI.nav_mobil }));
    },

    closeNavMobil() {
      setUI((S) => ({ ...S, nav_mobil: false }));
    },
    openModal: (state) => {
      console.log("toto");
      setUI((S) => ({ ...S, modal: state }));
    },

    closeModal: () => {
      setUI((S) => ({ ...S, modal: "reverse" }));
      setTimeout(() => {
        setUI((S) => ({ ...S, modal: false }));
      }, 500);
    },
  };

  return (
    <UIContext.Provider value={{ UI, callback }}>{children}</UIContext.Provider>
  );
}
