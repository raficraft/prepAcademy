import React, { useContext, useState } from "react";
import Head from "next/head";
import S from "./movies.module.scss";
import Pagination from "../../core/components/Filter/Pagination/Pagination";
import List_media from "../../core/components/List_media/List_media";
import { useURL_TMDB } from "../../core/hooks/URL_TMDB/useURL_TMDB";
import {
  UI_I18n_title_pages,
  UI_I18n_title_word,
} from "../../core/Data/UI_I8n";
import { UIContext } from "../../core/context/UIProvider/UIProvider";

export default function Media() {
  const [CALL_URL, setCAll_URL] = useState("discover");
  const [SWR, params, paramsURL] = useURL_TMDB(CALL_URL);
  const { UI, callback } = useContext(UIContext);

  if (SWR.error)
    return (
      <div className="error_container">
        <p className="error_text">Failed to load</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>Prep academy - next - Movies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className={S.media_page}>
        <header>
          <h2>{`${UI_I18n_title_pages[params.slug][UI.language]}  ${
            UI_I18n_title_word[CALL_URL][UI.language]
          }`}</h2>
        </header>
        <div className={S.media_page__content}>
          <aside>
            <div className={S.bloc_aside}>
              <header>
                <h3>Navigation</h3>
              </header>
              <Pagination
                callback={paramsURL.setPagination}
                page={params.pagination}
              ></Pagination>
            </div>
          </aside>
          {!SWR.data && !SWR.error ? (
            <div>Loading ... </div>
          ) : (
            <>
              <List_media data={SWR.data} slug={params.slug}></List_media>
            </>
          )}
        </div>
      </section>
    </>
  );
}
