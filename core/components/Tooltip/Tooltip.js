import React, { useState } from "react";
import S from "./Tooltip.module.scss";

export default function Tooltip({
  SVG,
  hover_text = "hover_text",
  callback = () => {},
}) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className={S.tooltip}>
      <span
        className={S.tooltip_container}
        onMouseEnter={() => {
          setIsShow(true);
        }}
        onMouseLeave={() => {
          setIsShow(false);
        }}
      >
        {SVG}
      </span>
      {isShow && (
        <span class={S.tooltip_text}>
          <p>{hover_text}</p>
        </span>
      )}
    </div>
  );
}
