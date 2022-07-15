import React, { useEffect, useState } from "react";
import { API_KEY, IMG_URL } from "../../../config/request";
import { useRouter } from "next/router";
import useSWR from "swr";
import S from "./details.module.scss";
import { useURL_TMDB } from "../../../core/hooks/URL_TMDB/useURL_TMDB";

export default function Media_info() {
  const [SWR, params] = useURL_TMDB("media");

  return (
    <>
      {params.id > 0 && SWR.data ? (
        <section>
          <div className={S.banner}>
            <div className={S.banner_content__img}>
              <img src={`${IMG_URL}${SWR.data.backdrop_path}`} />
            </div>
          </div>
        </section>
      ) : (
        <p>Error</p>
      )}
    </>
  );
}
