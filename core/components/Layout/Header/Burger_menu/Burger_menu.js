import React, { useContext, useLayoutEffect, useState } from "react";
import { UIContext } from "../../../../context/UIProvider/UIProvider";
import Navigation_mobil from "../Navigation_mobil/Navigation_mobil";

import S from "./Burger_menu.module.scss";

export default function Burger_menu() {
  const { UI, callback } = useContext(UIContext);
  return (
    <>
      <div
        className={S.burger_menu}
        onClick={() => {
          callback.toggleNavMobil();
        }}
        data-show={UI.nav_mobil}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Navigation_mobil />
    </>
  );
}
