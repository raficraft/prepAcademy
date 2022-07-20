import Link from "next/link";
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
            <Link href="/" locale="fr">
              <a>
                Français
                <Icon_flag_french />
              </a>
            </Link>

            <Link href="/en" locale="en">
              <a>
                Anglais
                <Icon_flag_UK />
              </a>
            </Link>
          </footer>
        </div>
      )}
    </>
  );
}
