import Link from "next/link";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

import RadialChart from "../../RadialChart/RadialChart";
import S from "./List_media.module.scss";
import { IMG_URL } from "../../../../config/request";
import { Icon_heart } from "../../../assets/SVG/UI_icon";

export default function List_media({ data, slug }) {
  const [size_img, setSize_img] = useState({
    x: 0,
    y: 0,
  });

  function createItems() {
    // console.log(data);

    return data.results.map((el, key) => {
      return (
        <Link
          href={`details/${slug}_${el.id}`}
          key={key}
          title={el.original_title ? el.title : el.name}
        >
          <a className={S.container}>
            <div className={`${S.img_container} img_media`}>
              {el.poster_path !== null ? (
                <Image
                  objectFit="cover"
                  src={`${IMG_URL}${el.poster_path}`}
                  alt={el.original_title ? el.title : el.name}
                  width={size_img.x}
                  height={size_img.y}
                />
              ) : (
                <div className={S.poster_fail}>
                  <h2>No</h2>
                  <h2>POSTER</h2>
                </div>
              )}

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
              <div
                className={S.details}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p>{el.vote_count}</p>
                <span className={S.icon_heart}>
                  <Icon_heart />
                </span>
              </div>
            </footer>
          </a>
        </Link>
      );
    });
  }

  useLayoutEffect(() => {
    const currentImg = document.getElementsByClassName("img_media")[0];
    if (currentImg) {
      const styles_img = window.getComputedStyle(currentImg);
      setSize_img((S) => ({ ...S, x: styles_img.width, y: styles_img.height }));
    }
  }, []);
  return <div className={S.list_item}>{createItems()}</div>;
}
