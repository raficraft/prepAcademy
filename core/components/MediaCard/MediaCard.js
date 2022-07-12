import React from "react";
import { IMG_URL } from "../../../config/request";
import S from "./Media_card.module.scss";

export default function MediaCard({ info }) {
  return (
    <div className={S.container}>
      <div className={S.img_container}>
        <img src={`${IMG_URL}${info.poster_path}`} />
      </div>
      <footer>
        <h4>{info.original_title}</h4>
        <p className={S.details}>
          <span>Note :</span> <span>{info.vote_average}</span>
        </p>
        <p className={S.details}>
          <span>Popularité :</span> <span>{info.popularity}</span>
        </p>
      </footer>
    </div>
  );
}
