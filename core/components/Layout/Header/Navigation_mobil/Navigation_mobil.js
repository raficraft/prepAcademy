import Link from "next/link";
import React, { useContext, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UIContext } from "../../../../context/UIProvider/UIProvider";
import { UI_I18n_nav } from "../../../../Data/UI_I8n";
import Portal from "../../../../utils/Portal";
import S from "./Navigation.module.scss";

export default function Navigation_mobil() {
  const { UI, callback } = useContext(UIContext);
  const [topPosition, setTopPosition] = useState("0px");

  function createNav() {
    return Object.keys(UI_I18n_nav).map((el, key) => {
      const item = UI_I18n_nav[el];
      return (
        <Link href={item.link} key={key}>
          <a
            onClick={() => {
              callback.toggleNavMobil();
            }}
          >
            {item.text[UI.language]}
          </a>
        </Link>
      );
    });
  }

  useLayoutEffect(() => {
    const header = document.getElementById("header_top");

    if (header) {
      const styles_header = window.getComputedStyle(header);
      setTopPosition(styles_header.height);
    }
  }, []);
  return (
    <Portal selector="#__next">
      <aside
        className={S.navigation_mobil}
        data-show={UI.nav_mobil}
        style={{ top: topPosition }}
      >
        <nav>{createNav()}</nav>
      </aside>
    </Portal>
  );
}
