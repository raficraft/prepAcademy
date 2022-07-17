import React from "react";
import { IMG_URL_original } from "../../../config/request";
import S from "./details.module.scss";
import { useURL_TMDB } from "../../../core/hooks/URL_TMDB/useURL_TMDB";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Media_info() {
  const [params, paramsURL] = useURL_TMDB("media");
  const SWR = useSWR(paramsURL[`media`](), fetcher);

  return (
    <>
      {params.id > 0 && SWR.data ? (
        <section className={S.banner}>
          <div className={S.banner_content__img}>
            {SWR.data.backdrop_path !== null ? (
              <img src={`${IMG_URL_original}${SWR.data.backdrop_path}`} />
            ) : (
              <div className={S.backdrop_fail}>
                <h2>No</h2>
                <h2>image</h2>
                <h2>available</h2>
              </div>
            )}
          </div>
        </section>
      ) : (
        <p>Error</p>
      )}
    </>
  );
}
