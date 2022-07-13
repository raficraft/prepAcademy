import React, { useEffect, useState } from "react";
import { API_KEY, IMG_URL } from "../../config/request";
import Head from "next/head";
import { useRouter } from "next/router";
import MediaCard from "../../core/components/MediaCard/MediaCard";
import S from "./movies.module.scss";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Media() {
  const router = useRouter();
  const [pagination, setPagination] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/discover/${router.query.slug}?sort_by=popularity.desc&${API_KEY}&language=fr-FR&region=FR&page=${pagination}`,
    fetcher
  );

  function createItems() {
    return data.results.map((el, key) => {
      return (
        <div className={S.container}>
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

  // async function infiniteScroll(slug) {
  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/discover/${slug}?sort_by=popularity.desc&${API_KEY}&language=fr-FR&region=FR&page=${newPage}`
  //   );
  //   const data = await res.json();
  //   const newData = [...currentData, ...data.results];
  //   setCurrentData(newData);
  // }

  // function infiniteCheck() {
  //   console.log("scroll");
  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   if (scrollHeight - scrollTop === clientHeight) {
  //     console.log("bottom", pagination + 1);
  //     setPagination(pagination + 1);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("scroll", infiniteCheck);

  //   return () => {
  //     document.removeEventListener("scroll", infiniteCheck);
  //   };
  // }, []);

  // useEffect(() => {
  //   data && setCurrentData(data.results);
  //   // if (router.isReady) {
  //   //   infiniteScroll(router.query.slug);
  //   // }
  // }, [data]);

  // useEffect(() => {
  //   if (router.isReady) {
  //     console.log("before infinite", pagination);
  //     infiniteScroll(router.query.slug);
  //   }
  // }, [pagination]);

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
        {pagination > 1 && (
          <button
            onClick={() => {
              setPagination(pagination - 1);
            }}
          >
            prev
          </button>
        )}
        <h1>{router.query.slug} pages</h1>
        <p>
          pages : {pagination} / {Math.ceil(data.total_pages / 20)}
        </p>

        <button
          onClick={() => {
            setPagination(pagination + 1);
          }}
        >
          Next
        </button>
        <div className={S.list_item}>{createItems()}</div>
      </div>
    </>
  );
}
