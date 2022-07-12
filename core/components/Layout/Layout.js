import Link from "next/link";
import React from "react";
import S from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <header className={S.header}>
        <nav>
          <Link href="/">
            <a>Home pages</a>
          </Link>
          <Link href="/movies">
            <a>Movies pages</a>
          </Link>
          <Link href="/TV">
            <a>TV pages</a>
          </Link>
        </nav>
      </header>

      <main className="wrapper">
        <div className="wrapper_inside">{children}</div>
      </main>
    </>
  );
}
