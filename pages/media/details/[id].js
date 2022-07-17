import React, { useState, useLayoutEffect, useContext } from "react";
import Link from "next/link";
import {
  IMG_URL,
  IMG_URL_300,
  IMG_URL_original,
} from "../../../config/request";
import S from "./details.module.scss";
import { useURL_TMDB } from "../../../core/hooks/URL_TMDB/useURL_TMDB";
import useSWR from "swr";
import Image from "next/image";
import { UIContext } from "../../../core/context/UIProvider/UIProvider";
import RadialChart from "../../../core/components/RadialChart/RadialChart";
import { UI_I18n_media_details } from "../../../core/Data/UI_I8n";
import Tooltip from "../../../core/components/Tooltip/Tooltip";
import {
  Icon_bookmark,
  Icon_heart,
  Icon_play,
  Icon_star,
  Icon_thumbnails_list,
} from "../../../core/assets/SVG/UI_icon";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Media_info() {
  const { UI, callback } = useContext(UIContext);
  const [params, paramsURL] = useURL_TMDB("media");
  const SWR = useSWR(paramsURL[`media`](), fetcher);

  const [params_credits, paramsURL_credits] = useURL_TMDB("credits");
  const SWR_credits = useSWR(paramsURL[`credits`](), fetcher);

  function convertRunTime(time) {
    console.log(UI);
    const hours = Math.floor(time / 60);
    const min = time % 60;
    return `${hours}h ${min}min`;
  }

  function getReleaseYear(release_date) {
    return release_date.split("-")[0];
  }

  function genreList(arrayGenre) {
    return arrayGenre.map((el, key) => {
      return (
        <Link href="/">
          <a>{el.name}</a>
        </Link>
      );
    });
  }

  function manageDate(date) {
    let convertDate = "";

    switch (UI.language) {
      case "FR":
        const dateArray = date.split("-");
        convertDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]} (${UI.language})`;

        break;
      default:
    }

    return convertDate;
  }

  if (SWR.error)
    return (
      <div className="error_container">
        <p className="error_text">Failed to load</p>
      </div>
    );

  console.log("render details", SWR.data);

  return (
    <>
      {params.id > 0 && SWR.data ? (
        <section className={S.banner}>
          <div className={S.banner_content__img} id="banner_img">
            {SWR.data.backdrop_path !== null ? (
              <Image
                objectFit="cover"
                src={`${IMG_URL_original}${SWR.data.backdrop_path}`}
                alt={SWR.data.original_title ? SWR.data.title : SWR.data.name}
                width={1980}
                height={800}
              />
            ) : (
              <div className={S.backdrop_fail}>
                <h2>No</h2>
                <h2>image</h2>
                <h2>available</h2>
              </div>
            )}
          </div>
          <div className={S.banner_inside}>
            <div className={S.banner_inside_img}>
              {/* <img src={`${IMG_URL_300}${SWR.data.poster_path}`} /> */}
              <Image
                objectFit="cover"
                src={`${IMG_URL_300}${SWR.data.poster_path}`}
                alt={SWR.data.original_title ? SWR.data.title : SWR.data.name}
                width={300}
                height={450}
              />
            </div>
            <div className={S.banner_inside_content}>
              {
                /////////////////////////////////////////////////
                // Header
                // title - release_date - genres
                ////////////////////////////////////////////////
              }

              <header className={S.banner_header}>
                <span>
                  <Link href="/">
                    <a>{SWR.data.title}</a>
                  </Link>
                  {
                    <span className={S.title_date}>
                      `(${getReleaseYear(SWR.data.release_date)})`
                    </span>
                  }
                </span>
                <div className={S.facts_details}>
                  <p className={S.release_date}>
                    {manageDate(SWR.data.release_date)}
                  </p>

                  <span className={S.genre}>{genreList(SWR.data.genres)}</span>
                  <p>{convertRunTime(SWR.data.runtime)}</p>
                </div>
              </header>

              {
                /////////////////////////////////////////////////
                // Div
                // Radial chart - tooltip - trailer => modal
                ////////////////////////////////////////////////
              }

              <div>
                <span className={S.radial_container}>
                  <RadialChart
                    score={SWR.data.vote_average * 10}
                    min={0}
                    max={100}
                    lineWidth={4}
                    size={60}
                    padding={4}
                  />
                  <span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: UI_I18n_media_details.userNote[UI.language],
                      }}
                    ></p>
                  </span>
                </span>
                <div className={S.tooltip_list}>
                  <Tooltip
                    SVG={<Icon_thumbnails_list />}
                    hover_text={"Ajouter à une liste"}
                  ></Tooltip>

                  <Tooltip
                    SVG={<Icon_heart />}
                    hover_text={"Ajouter à une liste"}
                  ></Tooltip>

                  <Tooltip
                    SVG={<Icon_bookmark />}
                    hover_text={"Ajouter à une liste"}
                  ></Tooltip>

                  <Tooltip
                    SVG={<Icon_star />}
                    hover_text={"Ajouter à une liste"}
                  ></Tooltip>
                </div>
                <span>
                  <p>
                    <Icon_play /> Bande-annonce
                  </p>
                </span>
              </div>

              {
                /////////////////////////////////////////////////
                // Div
                // tagline - synopsis
                ////////////////////////////////////////////////
              }

              <div>
                {SWR.data.tagline && <p>{SWR.data.tagline}</p>}
                {SWR.data.overview && <p>{SWR.data.overview}</p>}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}
