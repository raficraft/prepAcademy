import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Icon_cross,
  Icon_movie,
  Icon_screen,
  Icon_search,
} from "../../../../assets/SVG/UI_icon";
import { UIContext } from "../../../../context/UIProvider/UIProvider";
import { UI_I18n_searchBar } from "../../../../Data/UI_I8n";
import Layout_container from "../../Layout_container/Layout_container";
import S from "./SearchBar.module.scss";

export default function SearchBar() {
  const { UI } = useContext(UIContext);
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  const searchInput_Ref = useRef();

  function showButton(event) {
    //Ajouts a faire, traitements de l'entrée utilisateur.
    const user_search_SIZE = event.target.value.length;

    if (user_search_SIZE < 3) {
      return false;
    }

    // setIsShow(true);
  }

  function launchSearch(event, slug) {
    const request = searchInput_Ref.current.value;

    console.log();
    if (router.asPath.includes("query")) {
      router.push(`search?query=${request}&${slug}`);

      setTimeout(() => {
        router.reload(false);
      }, 50);
      return false;
    }

    router.push(`/search?query=${request}&${slug}`);
  }

  return (
    <>
      <Layout_container style={S.layout}>
        <form className={S.form}>
          <div className={S.form_content}>
            <span className={S.search_icon}>
              <Icon_search />
            </span>
            <input
              className={S.searchInput}
              type="text"
              id="search"
              name="search"
              placeholder={UI_I18n_searchBar.placeholder[UI.language]}
              pattern="^[a-zA-Z0-9]$"
              onKeyUp={(e) => {
                showButton(e);
              }}
              ref={searchInput_Ref}
            />
            <span className={S.cross_icon}>
              <Icon_cross />
            </span>
          </div>
        </form>
      </Layout_container>
      {isShow && (
        <div className={S.bloc_input}>
          <span>
            <button
              onClick={(event) => {
                launchSearch(event, "movie");
              }}
            >
              <Icon_movie />
              Rechercher dans les films
            </button>
          </span>
          <span>
            <button
              onClick={(event) => {
                launchSearch(event, "tv");
              }}
            >
              <Icon_screen />
              Rechercher dans les séries
            </button>
          </span>
        </div>
      )}
    </>
  );
}
