import React, { createContext, useState } from "react";

export const UrlContext = createContext();

export default function UrlProvider({ children }) {
  /**
   * Modal Initial Context
   */
  const [url, setUrl] = useState({
    path: "",
    slug: "",
  });

  callback = {
    getUrlInfo: () => {
      console.log(window.location);
      const pathArray = window.location.pathname.split("/");
      const slug = pathArray[pathArray.length - 1].split("_");
      const targetMedia = slug[0];
      const targetId = slug[1];
      return [targetMedia, targetId];
    },
  };

  return (
    <UrlContext.Provider value={{ url, callBack }}>
      {children}
    </UrlContext.Provider>
  );
}
