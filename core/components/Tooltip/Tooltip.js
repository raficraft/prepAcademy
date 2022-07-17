import React, { useState } from "react";
import S from "./Tooltip.module.scss";

export default function Tooltip({
  SVG,
  hover_text = "hover_text",
  callback = () => {},
}) {
  const [isShow, setIshow] = useState(false);

  return (
    <div className={S.tooltip}>
      <span className={S.tooltip_container}>{SVG}</span>
      {isShow && <span class={S.tooltip_text}>{hover_text}</span>}
    </div>
  );
}
