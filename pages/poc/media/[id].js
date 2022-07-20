import React from "react";
import { API_KEY } from "../../../config/request";

export default function media_details({ movies }) {
  function test() {
    return movies.original_title;
  }
  return <div>media_details of {test()}</div>;
}

function toto(p) {
  console.log(p);
}

export async function getStaticProps({ params }) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?${API_KEY}`
  ).then((r) => r.json());

  toto(params);

  return {
    props: {
      movies,
    },
  };
}

export async function getStaticPaths() {
  const movies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}`
  ).then((r) => r.json());

  return {
    paths: movies.results.map((el) => ({
      params: { id: el.id.toString() },
    })),
    fallback: false,
  };
}
