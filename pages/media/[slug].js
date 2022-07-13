import React from "react";
import Head from "next/head";
import S from "./movies.module.scss";
import Pagination from "../../core/components/Filter/Pagination/Pagination";
import List_media from "../../core/components/List_media/List_media";
import { useURL_TMDB } from "../../core/hooks/URL_TMDB/useURL_TMDB";

export default function Media() {
  const [SWR, params, setParams] = useURL_TMDB("discover");

  if (SWR.error) return <div>Failed to load</div>;

  return (
    <>
      <Head>
        <title>Prep academy - next - Movies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={S.movies_pages}>
        <Pagination callback={setParams} page={params.pagination}></Pagination>
        {!SWR.data && !SWR.error ? (
          <div>Loading ... </div>
        ) : (
          <>
            <List_media data={SWR.data} slug={params.slug}></List_media>
          </>
        )}
      </div>
    </>
  );
}
