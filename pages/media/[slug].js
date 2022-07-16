import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import S from "./movies.module.scss";
import Pagination from "../../core/components/Filter/Pagination/Pagination";

import { useURL_TMDB } from "../../core/hooks/URL_TMDB/useURL_TMDB";
import {
  UI_I18n_title_pages,
  UI_I18n_title_word,
} from "../../core/Data/UI_I8n";
import { UIContext } from "../../core/context/UIProvider/UIProvider";
import Filter from "../../core/components/Filter/Filter";
import useMediaQuery from "../../core/hooks/mediaQueries/useMediaQueries";
import List_media from "../../core/components/List_media/Desktop/List_media";
import List_media_tablet from "../../core/components/List_media/Tablet/List_media_tablet";
import useTouchEvent from "../../core/hooks/touchEvent/useTouchEvent";

export default function Media() {
  const [CALL_URL, setCAll_URL] = useState("discoverDESC");
  const [SWR, params, paramsURL] = useURL_TMDB(CALL_URL);
  const { UI, callback } = useContext(UIContext);
  const isTablet = useMediaQuery("(max-width: 960px)");

  const pageRef = useRef(null);
  const { onTouch } = useTouchEvent(pageRef);

  useEffect(() => {
    if (
      onTouch.direction_X === "left" &&
      onTouch.percent_X > 20 &&
      onTouch.start === false
    ) {
      console.log("goToNext");
      paramsURL.setPagination(params.pagination + 1);
      // goToNext();
    } else if (
      onTouch.direction_X === "right" &&
      onTouch.percent_X > 20 &&
      onTouch.start === false
    ) {
      const page = params.pagination;
      const newPage = page - 1 === 0 ? 1 : page - 1;
      paramsURL.setPagination(params.pagination + 1);
      // goToPrev();
    }
  }, [onTouch.start]);

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

      <div className="wrapper_inside" ref={pageRef}>
        <section className={S.media_page}>
          <header>
            <h2>{`${UI_I18n_title_pages[params.slug][UI.language]}  ${
              UI_I18n_title_word[`discover`][UI.language]
            }`}</h2>
          </header>
          <div className={S.media_page__content}>
            <aside className={S.aside_container}>
              {!isTablet && (
                <div className={S.bloc_aside}>
                  <header>
                    <h3>Navigation</h3>
                  </header>
                  <Pagination
                    callback={paramsURL.setPagination}
                    page={params.pagination}
                  ></Pagination>
                </div>
              )}
              <div className={S.bloc_aside}>
                <header>
                  <h3>{UI_I18n_title_word.filter[UI.language]}</h3>
                </header>
                {isTablet ? (
                  <div>Filter tablet</div>
                ) : (
                  <Filter CALL_URL={setCAll_URL} />
                )}
              </div>
            </aside>
            {!SWR.data ? (
              <div className="loading">Loading ... </div>
            ) : (
              <>
                {isTablet ? (
                  <List_media_tablet data={SWR.data} slug={params.slug} />
                ) : (
                  <List_media data={SWR.data} slug={params.slug}></List_media>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
