import Link from "next/link";
import React from "react";
import { IMG_URL } from "../../../config/request";
import { Icon_heart } from "../../assets/SVG/UI_icon";
import RadialChart from "../RadialChart/RadialChart";
import S from "./List_media.module.scss";

export default function List_media({ data, slug }) {
  function createItems() {
    console.log(data);
    return data.results.map((el, key) => {
      return (
        <Link
          href={`details/${slug}_${el.id}`}
          key={key}
          title={el.original_title ? el.title : el.name}
        >
          <a className={S.container}>
            <div className={S.img_container}>
              <img src={`${IMG_URL}${el.poster_path}`} />
              <div className={S.radial_container}>
                <RadialChart
                  score={el.vote_average * 10}
                  min={0}
                  max={100}
                  lineWidth={4}
                  size={50}
                  padding={4}
                  animationInterval={Number(key) * 1}
                />
              </div>
            </div>
            <footer>
              <h4>{el.original_title ? el.title : el.name}</h4>

              <p
                className={S.details}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p>{el.vote_count}</p>
                <span className={S.icon_heart}>
                  <Icon_heart />
                </span>
              </p>
            </footer>
          </a>
        </Link>
      );
    });
  }
  return <div className={S.list_item}>{createItems()}</div>;
}
