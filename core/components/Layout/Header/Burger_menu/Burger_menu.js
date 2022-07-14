import React, { useContext, useLayoutEffect, useState } from "react";
import { UIContext } from "../../../../context/UIProvider/UIProvider";

import S from "./Burger_menu.module.scss";

export default function Burger_menu() {
  const { UI, callback } = useContext(UIContext);
  return (
    <>
      <div className={S.burger_menu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
