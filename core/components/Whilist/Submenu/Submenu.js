import React from "react";
import {
  Icon_bookmark,
  Icon_heart,
  Icon_star,
  Icon_thumbnails_list,
} from "../../../assets/SVG/UI_icon";
import { dispatchStorage, manageStorage } from "../../../manageStorage";
import S from "./Submenu.module.scss";

export default function Submenu({ style }) {
  return (
    <ul className={S[style]}>
      <li
        className="features_notImplemented"
        onClick={() => {
          dispatchStorage("whishlist");
        }}
      >
        <Icon_thumbnails_list /> Ajouter à une liste
      </li>
      <li className="features_notImplemented" onClick={() => {}}>
        <Icon_heart />
        Favoris
      </li>
      <li className="features_notImplemented" onClick={() => {}}>
        <Icon_bookmark />
        List de suivi
      </li>
      <li className="features_notImplemented" onClick={() => {}}>
        <Icon_star />
        Votre note
      </li>
    </ul>
  );
}
