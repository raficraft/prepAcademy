import React, { useContext } from "react";
import { Icon_cross, Icon_search } from "../../../../assets/SVG/UI_icon";
import { UIContext } from "../../../../context/UIProvider/UIProvider";
import { UI_I18n_searchBar } from "../../../../Data/UI_I8n";
import Layout_container from "../../Layout_container/Layout_container";
import S from "./SearchBar.module.scss";

export default function SearchBar() {
  const { UI } = useContext(UIContext);

  return (
    <Layout_container style={S.layout}>
      <form className={S.form}>
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
        />
        <span className={S.cross_icon}>
          <Icon_cross />
        </span>
      </form>
    </Layout_container>
  );
}
