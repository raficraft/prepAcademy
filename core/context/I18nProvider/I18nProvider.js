import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import en from "../../locales/en";
import fr from "../../locales/fr";

const I18nContext = createContext();

function I18nContextProvider({ children }) {
  const router = useRouter();
  const { locale } = router;
  const [state, setState] = useState([]);

  useEffect(
    () =>
      setState({
        i18n: locale === "fr" ? fr : en,
      }),
    [locale]
  );

  return <I18nContext.Provider value={state}>{children}</I18nContext.Provider>;
}

// context consumer hook
const useI18nContext = () => {
  // get the context
  const context = useContext(I18nContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useI18nContext was used outside of its Provider");
  }

  return context;
};

export { useI18nContext, I18nContextProvider };
