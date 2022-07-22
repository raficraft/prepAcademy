import React from "react";
import {
  Icon_bookmark,
  Icon_heart,
  Icon_star,
  Icon_thumbnails_list,
} from "../../../assets/SVG/UI_icon";
import S from "./Submenu.module.scss";

export default function Submenu() {
  return (
    <ul className={S.submenu}>
      <li>
        <Icon_thumbnails_list /> Ajouter à une liste
      </li>
      <li>
        <Icon_heart />
        Favoris
      </li>
      <li>
        <Icon_bookmark />
        List de suivi
      </li>
      <li>
        <Icon_star />
        Votre note
      </li>
    </ul>
  );
}
