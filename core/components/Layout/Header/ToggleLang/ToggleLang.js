import React, { useContext } from "react";
import { Icon_flag_french, Icon_flag_UK } from "../../../../assets/SVG/UI_icon";
import { UIContext } from "../../../../context/UIProvider/UIProvider";
import S from "./ToggleLang.module.scss";

export default function ToggleLang() {
  const { UI, callback } = useContext(UIContext);
  return (
    <>
      <div
        className={S.lang_button}
        onClick={(e) => {
          e.stopPropagation();
          callback.toggleLanguageSelect();
        }}
      >
        <p>{UI.language}</p>
      </div>
      {UI.language_select && (
        <div className={S.country_list}>
          <header>
            <h1>Settings</h1>
          </header>
          <footer>
            <span
              onClick={() => {
                callback.toggleLanguage("FR");
              }}
            >
              <button type="button">Français</button>
              <Icon_flag_french />
            </span>
            <span
              onClick={() => {
                callback.toggleLanguage("EN");
              }}
            >
              <button type="button">Anglais</button>
              <Icon_flag_UK />
            </span>
          </footer>
        </div>
      )}
    </>
  );
}
