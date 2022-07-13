import React from "react";
import { IMG_URL } from "../../../config/request";
import S from "./List_media.module.scss";

export default function List_media({ data }) {
  function createItems() {
    // console.log(data);
    return data.results.map((el, key) => {
      return (
        <div className={S.container} key={key}>
          <div className={S.img_container}>
            <img src={`${IMG_URL}${el.poster_path}`} />
          </div>
          <footer>
            <h4>{el.original_title ? el.original_title : el.name}</h4>
            <p className={S.details}>
              <span>Note :</span> <span>{el.vote_average * 10}%</span>
            </p>
            <p className={S.details}>
              <span>Popularité :</span> <span>{el.popularity}</span>
            </p>
          </footer>
        </div>
      );
    });
  }
  return <div className={S.list_item}>{createItems()}</div>;
}
