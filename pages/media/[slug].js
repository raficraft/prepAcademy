import React, { useEffect, useState } from "react";
import { API_KEY, IMG_URL } from "../../config/request";
import Head from "next/head";
import { useRouter } from "next/router";
import MediaCard from "../../core/components/MediaCard/MediaCard";
import S from "./movies.module.scss";

import useSWR from "swr";
import Pagination from "../../core/components/Filter/Pagination/Pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Media() {
  const router = useRouter();
  const [pagination, setPagination] = useState(1);

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/discover/${router.query.slug}?sort_by=popularity.desc&${API_KEY}&language=fr-FR&region=FR&page=${pagination}`,
    fetcher
  );

  useEffect(() => {
    setPagination(1);
  }, [router.query.slug]);

  function createItems() {
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

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Prep academy - next - Movies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={S.movies_pages}>
        <Pagination callback={setPagination} page={pagination}></Pagination>

        <div className={S.list_item}>{createItems()}</div>
      </div>
    </>
  );
}
