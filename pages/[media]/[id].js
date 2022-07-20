import React from "react";
import { API_KEY } from "../../config/request";

export default function media_details({ media, id }) {
  console.log(arguments);
  function test() {
    console.log(media);
    return media.title ? media.title : media.name;
  }
  return <div>media_details of {test()}</div>;
}

function showInTerminal(p) {
  console.log("pages [media][pagination][id]" + p);
}

export async function getStaticProps({ params, locale }) {
  const media = await fetch(
    `https://api.themoviedb.org/3/${params.media}/${params.id}?${API_KEY}&language=${locale}`
  ).then((r) => r.json());

  return {
    props: {
      media,
    },
  };
}

const createAllPaths = (collection, locales, media) => {
  const paths = [];

  collection.results.forEach((el) => {
    for (const locale of locales) {
      paths.push({
        params: {
          id: el.id.toString(),
          media,
        },
        locale,
      });
    }
  });

  return paths;
};

export async function getStaticPaths({ params, locale, locales }) {
  showInTerminal(locale);
  showInTerminal(params);

  const mediaMovies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}&language=${locale}`
  ).then((r) => r.json());

  const mediaTV = await fetch(
    `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&${API_KEY}&language=${locale}`
  ).then((r) => r.json());

  const pathsMovie = createAllPaths(mediaMovies, locales, "movie");
  const pathsTV = createAllPaths(mediaTV, locales, "tv");

  const mergeMedia = [...pathsMovie, ...pathsTV];

  return {
    paths: mergeMedia,

    fallback: false,
  };
}
