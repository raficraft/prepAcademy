import React, { useContext, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UIContext } from "../../../../context/UIProvider/UIProvider";
import Portal from "../../../../utils/Portal";
import S from "./Navigation.module.scss";

export default function Navigation_mobil() {
  const { UI, callBack } = useContext(UIContext);
  const [topPosition, setTopPosition] = useState("0px");

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
        Navigation_mobil
      </aside>
    </Portal>
  );
}
