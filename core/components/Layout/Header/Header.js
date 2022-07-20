import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { I18N_en } from "../../../locales/en";
import { TMDB_icon } from "../../../assets/SVG/logo";
import { Icon_cross, Icon_search } from "../../../assets/SVG/UI_icon";
import { UIContext } from "../../../context/UIProvider/UIProvider";
import {
  UI_I18n_nav,
  UI_I18n_nav_2,
  UI_I18n_nav_two,
} from "../../../Data/UI_I8n";
import Layout_container from "../Layout_container/Layout_container";
import Burger_menu from "./Burger_menu/Burger_menu";
import S from "./Header.module.scss";
import ToggleLang from "./ToggleLang/ToggleLang";
import { useI18nContext } from "../../../context/I18nProvider/I18nProvider";

export default function Header() {
  const { UI, callback } = useContext(UIContext);

  const { i18n } = useI18nContext();

  return (
    <>
      <Layout_container style={S.layout} id="header_top">
        <header className={S.header}>
          <Burger_menu />
          <nav>
            <Link href="/">
              <a className={S.logo_container}>
                <TMDB_icon />
              </a>
            </Link>
            <Link
              href={{
                pathname: "/[media]",
                query: {
                  media: "movie",
                },
              }}
            >
              <a>{i18n?.nav_link.movie}</a>
            </Link>

            <Link
              href={{
                pathname: "/[media]",
                query: {
                  media: "tv",
                },
              }}
            >
              <a>{i18n?.nav_link.tv}</a>
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
