import React, { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/clickOutside/UseclickOutside";
import Submenu from "../Submenu/Submenu";
import S from "./Dotted_icon.module.scss";

export default function Dotted_icon({ children }) {
  const [isShow, setIsShow, refOutsideClick] = useClickOutside(false);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsShow(!isShow);
  }

  return (
    <>
      <div
        className={S.dotted_menu}
        onClick={(e) => {
          handleClick(e);
        }}
        ref={refOutsideClick}
      >
        <div className={S.dotted_menu_content}>
          <span className={S.dotted_top}></span>
          <span className={S.dotted_middle}></span>
          <span className={S.dotted_bottom}></span>
        </div>
        {isShow && <div className={S.submenu_wrapper}>{children}</div>}
      </div>
    </>
  );
}
