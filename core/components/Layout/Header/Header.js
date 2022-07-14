import Link from "next/link";
import React from "react";
import { TMDB_icon } from "../../../assets/SVG/logo";
import Layout_container from "../Layout_container/Layout_container";
import S from "./Header.module.scss";

export default function Header() {
  return (
    <Layout_container style={S.layout}>
      <header className={S.header}>
        <nav>
          <Link href="/">
            <a className={S.logo_container}>
              <TMDB_icon />
            </a>
          </Link>
          <Link href="/media/movie">
            <a>Movies pages</a>
          </Link>
          <Link href="/media/tv">
            <a>TV pages</a>
          </Link>
        </nav>
        <aside>
          <p>lang</p>
          <p>search</p>
        </aside>
      </header>
    </Layout_container>
  );
}
