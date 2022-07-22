import React, { useState, useRef } from "react";
import Submenu from "../Submenu/Submenu";
import S from "./Dotted_icon.module.scss";

export default function Dotted_icon() {
  const [isShow, setIsShow] = useState(false);
  const refItem = useRef();

  return (
    <>
      <div
        className={S.dotted_menu}
        ref={refItem}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsShow(!isShow);
        }}
      >
        <div className={S.dotted_menu_content}>
          <span className={S.dotted_top}></span>
          <span className={S.dotted_middle}></span>
          <span className={S.dotted_bottom}></span>
        </div>
        {isShow && (
          <div class={S.submenu_wrapper}>
            <Submenu />
          </div>
        )}
      </div>
    </>
  );
}
