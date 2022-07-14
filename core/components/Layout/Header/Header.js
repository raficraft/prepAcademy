import Link from "next/link";
import React, { useContext } from "react";
import { TMDB_icon } from "../../../assets/SVG/logo";
import { Icon_cross, Icon_search } from "../../../assets/SVG/UI_icon";
import { UIContext } from "../../../context/UIProvider/UIProvider";
import { UI_I18n_nav } from "../../../Data/UI_I8n";
import Layout_container from "../Layout_container/Layout_container";
import S from "./Header.module.scss";
import SearchBar from "./SearchBar/SearchBar";
import ToggleLang from "./ToggleLang/ToggleLang";

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
              <a>{UI_I18n_nav.movie.text[UI.language]}</a>
            </Link>
            <Link href="/media/tv">
              <a>{UI_I18n_nav.tv.text[UI.language]}</a>
            </Link>
          </nav>
          <aside>
            <ToggleLang />
            {!UI.search ? (
              <div className={`${S.svg_container} ${S.svg_container__search}`}>
                <Icon_search
                  onClick={() => {
                    callback.toggleSearchBar();
                  }}
                />
              </div>
            ) : (
              <div className={`${S.svg_container} ${S.svg_container__cross}`}>
                <Icon_cross
                  onClick={() => {
                    callback.toggleSearchBar();
                  }}
                />
              </div>
            )}
          </aside>
        </header>
      </Layout_container>
    </>
  );
}
