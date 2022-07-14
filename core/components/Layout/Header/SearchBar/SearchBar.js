import React from "react";
import { Icon_search } from "../../../../assets/SVG/UI_icon";
import Layout_container from "../../Layout_container/Layout_container";
import S from "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <Layout_container style={S.layout}>
      <form className={S.form}>
        <Icon_search />
        <input
          className={S.searchInput}
          type="text"
          id="search"
          name="search"
          placeholder="Rechercher un film, une série..."
          pattern="^[a-zA-Z0-9]$"
        />
      </form>
    </Layout_container>
  );
}
