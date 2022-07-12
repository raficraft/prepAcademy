import React from "react";
import { API_KEY } from "../../config/request";
import MediaCard from "../../core/components/MediaCard/MediaCard";
import S from "./movies.module.scss";

export default function Media({ movies }) {
  function createItems() {
    console.log("in card", movies);

    return movies.results.map((el, key) => {
      return <MediaCard info={el} key={key} />;
    });
  }
  return (
    <div className={S.movies_pages}>
      <h1>Movies pages</h1>
      <div className={S.list_item}>{createItems()}</div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}&language=fr-FR&region=FR`
  ).then((r) => r.json());

  return {
    props: {
      movies,
    },
  };
}
