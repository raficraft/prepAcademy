import Link from "next/link";
import React, { useContext } from "react";
import { UIContext } from "../../context/UIProvider/UIProvider";
import Header from "./Header/Header";
import SearchBar from "./Header/SearchBar/SearchBar";
import S from "./Layout.module.scss";

export default function Layout({ children }) {
  const { UI, callback } = useContext(UIContext);

  return (
    <>
      <Header />
      {UI.search && <SearchBar />}
      <main className="wrapper">
        <div className="wrapper_inside">{children}</div>
      </main>
    </>
  );
}
