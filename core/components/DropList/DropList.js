import React, { useLayoutEffect, useState, useRef } from "react";
import { Icon_chevron_right } from "../../assets/SVG/UI_icon";
import S from "./DropList.module.scss";

export default function DropList({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const child = React.Children.toArray(children);
  console.log(child);

  function dispatchChild(child) {
    return child.map((el) => {
      return el;
    });
  }

  return (
    <div className={S.dropList_container} data-isopen={isOpen}>
      <header
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <h3>{title}</h3>
        <div className={S.container_SVG}>
          <Icon_chevron_right />
        </div>
      </header>

      {isOpen && dispatchChild(child)}
    </div>
  );
}
