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
import useMediaQuery from "../../../core/hooks/mediaQueries/useMediaQueries";
import Modal from "../../../core/components/Modal/Modal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Media_info() {
  const { UI, callback } = useContext(UIContext);
  const [params, paramsURL] = useURL_TMDB("media");
  const SWR = useSWR(paramsURL[`media`](), fetcher);
  const isTablet = useMediaQuery("(max-width: 960px)");

  function getLastTrailer(videoArray) {
    const lastTrailer = videoArray.find((el, key) => el.type === "Trailer");
    return `https://www.youtube.com/embed/${lastTrailer.key}`;
  }

  function convertRunTime(time) {
    console.log(UI);
    if (time < 60) {
      return `${time}m`;
    } else {
      const hours = Math.floor(time / 60);
      const min = time % 60;
      return `${hours}h ${min}m`;
    }
  }

  function getReleaseYear(release_date) {
    return release_date.split("-")[0];
  }

  function genreList(arrayGenre) {
    return arrayGenre.map((el, key) => {
      const endLine = key < arrayGenre.length - 1 ? "," : "";
      return (
        <Link href="/" key={key}>
          <a className={S.genre_link}>
            {el.name}
            {endLine}
          </a>
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
        <>
          <section className={S.banner}>
            {
              /////////////////////////////////////////////////
              // Banner image
              // Banner content - absolute position
              ////////////////////////////////////////////////
            }

            {!isTablet && (
              <div className={S.banner_content__img} id="banner_img">
                {SWR.data.backdrop_path !== null ? (
                  <img
                    src={`${IMG_URL_original}${SWR.data.backdrop_path}`}
                    alt={
                      SWR.data.original_title ? SWR.data.title : SWR.data.name
                    }
                  />
                ) : (
                  <div className={S.backdrop_fail}>
                    <h2>No</h2>
                    <h2>image</h2>
                    <h2>available</h2>
                  </div>
                )}
              </div>
            )}

            <div className={S.banner_inside}>
              {!isTablet ? (
                <div className={S.banner_inside_img}>
                  <img
                    src={`${IMG_URL_300}${SWR.data.poster_path}`}
                    alt={
                      SWR.data.original_title ? SWR.data.title : SWR.data.name
                    }
                  />
                </div>
              ) : (
                <div className={S.banner_img__mobil}>
                  <img
                    src={`${IMG_URL_original}${SWR.data.backdrop_path}`}
                    alt={
                      SWR.data.original_title ? SWR.data.title : SWR.data.name
                    }
                  />

                  <div className={S.banner_poster_wrapper}>
                    <div className={S.banner_poster__mobil}>
                      <img
                        src={`${IMG_URL_300}${SWR.data.poster_path}`}
                        alt={
                          SWR.data.original_title
                            ? SWR.data.title
                            : SWR.data.name
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={S.banner_inside_content}>
                {
                  /////////////////////////////////////////////////
                  // Header
                  // title - release_date - genres
                  ////////////////////////////////////////////////
                }

                <header className={S.banner_header}>
                  <div className={S.title_content}>
                    <Link href="/">
                      <a className={S.title_link}>
                        {params.slug === "movie"
                          ? SWR.data.title
                          : SWR.data.name}
                      </a>
                    </Link>
                    {
                      <span className={S.title_date}>
                        {" "}
                        (
                        {getReleaseYear(
                          params.slug === "movie"
                            ? SWR.data.release_date
                            : SWR.data.first_air_date
                        )}
                        )
                      </span>
                    }
                  </div>

                  {isTablet && (
                    <div className={S.radial_tablet}>
                      <div className={S.radial_container}>
                        <RadialChart
                          score={SWR.data.vote_average * 10}
                          min={0}
                          max={100}
                          lineWidth={2}
                          size={44}
                          padding={4}
                        />
                        <span className={S.radial_label}>
                          <p
                            className="bold"
                            dangerouslySetInnerHTML={{
                              __html:
                                UI_I18n_media_details.userNote_mobil[
                                  UI.language
                                ],
                            }}
                          ></p>
                        </span>
                      </div>

                      <span className={S.hr_vertical}></span>

                      <span className={S.trailer}>
                        <p
                          className={S.trailer_text}
                          onClick={() => {
                            callback.openModal(true);
                          }}
                        >
                          <Icon_play /> Bande-annonce
                        </p>
                      </span>
                    </div>
                  )}

                  <div className={S.facts_container}>
                    {!isTablet && (
                      <span className={S.release_date}>
                        {manageDate(
                          params.slug === "movie"
                            ? SWR.data.release_date
                            : SWR.data.first_air_date
                        )}
                      </span>
                    )}
                    <span className={S.genre}>
                      {genreList(SWR.data.genres)}
                    </span>
                    <span className={S.duration}>
                      {convertRunTime(
                        params.slug === "movie"
                          ? SWR.data.runtime
                          : SWR.data.episode_run_time
                      )}
                    </span>
                  </div>
                </header>

                {
                  /////////////////////////////////////////////////
                  // Div
                  // Radial chart - tooltip - trailer => modal
                  ////////////////////////////////////////////////
                }

                {!isTablet && (
                  <div className={S.radial_and_tooltip}>
                    <div className={S.radial_container}>
                      <RadialChart
                        score={SWR.data.vote_average * 10}
                        min={0}
                        max={100}
                        lineWidth={4}
                        size={60}
                        padding={4}
                      />
                      <span className={S.radial_label}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: UI_I18n_media_details.userNote[UI.language],
                          }}
                        ></p>
                      </span>
                    </div>

                    <div className={S.tooltip_list}>
                      <Tooltip
                        SVG={<Icon_thumbnails_list />}
                        hover_text={"Ajouter à une liste"}
                      ></Tooltip>

                      <Tooltip
                        SVG={<Icon_heart />}
                        hover_text={"Marquer comme favori"}
                      ></Tooltip>

                      <Tooltip
                        SVG={<Icon_bookmark />}
                        hover_text={"Ajouter à votre liste de suivi"}
                      ></Tooltip>

                      <Tooltip
                        SVG={<Icon_star />}
                        hover_text={"Notez moi !"}
                      ></Tooltip>
                    </div>

                    <span className={S.trailer}>
                      <p
                        className={S.trailer_text}
                        onClick={() => {
                          callback.openModal(true);
                        }}
                      >
                        <Icon_play /> Bande-annonce
                      </p>
                    </span>
                  </div>
                )}

                {
                  /////////////////////////////////////////////////
                  // Div
                  // tagline - synopsis
                  ////////////////////////////////////////////////
                }

                <div className={S.synopsis_container}>
                  {SWR.data.tagline && (
                    <p className={S.tagline}>{SWR.data.tagline}</p>
                  )}
                  {SWR.data.overview && (
                    <>
                      <h2>Synopsis</h2>
                      <p>{SWR.data.overview}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          {UI.modal && (
            <Modal>
              <div className={S.video_container}>
                <iframe
                  className={S.responsive_iframe}
                  src={getLastTrailer(SWR.data.videos.results)}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal>
          )}
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}
