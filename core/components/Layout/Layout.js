import Link from "next/link";
import React from "react";
import Header from "./Header/Header";
import S from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="wrapper">
        <div className="wrapper_inside">{children}</div>
      </main>
    </>
  );
}
