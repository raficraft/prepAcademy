import Link from "next/link";
import React, { useContext } from "react";
import { TMDB_icon } from "../../../assets/SVG/logo";
import { Search_icon } from "../../../assets/SVG/UI_icon";
import { UIContext } from "../../../context/UIProvider/UIProvider";
import Layout_container from "../Layout_container/Layout_container";
import S from "./Header.module.scss";
import SearchBar from "./SearchBar/SearchBar";

export default function Header() {
  const { UI, callback } = useContext(UIContext);

  return (
    <>
      <Layout_container style={S.layout}>
        <header className={S.header}>
          <nav>
            <Link href="/">
              <a className={S.logo_container}>
                <TMDB_icon />
              </a>
            </Link>
            <Link href="/media/movie">
              <a>Movies</a>
            </Link>
            <Link href="/media/tv">
              <a>Series</a>
            </Link>
          </nav>
          <aside>
            <p>lang</p>
            <div className={S.search_icon_container}>
              <Search_icon
                onClick={() => {
                  callback.toggleSearchBar();
                }}
              />
            </div>
          </aside>
        </header>
      </Layout_container>
      {UI.search && <SearchBar />}
    </>
  );
}
