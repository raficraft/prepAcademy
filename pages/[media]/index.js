import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../config/request";
import { UIContext } from "../../core/context/UIProvider/UIProvider";

export default function poc({ movies, media }) {
  const { UI, callback } = useContext(UIContext);
  function listMovies() {
    const [pagination, setPagination] = useState(1);
    return movies.results.map((el, idx) => {
      return (
        <>
          <Link
            href={{
              pathname: "/[media]/[id]",
              query: {
                media: media,
                id: el.id.toString(),
              },
            }}
          >
            <a
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem",
                color: "red",
              }}
            >
              {el.title ? el.title : el.name}
            </a>
          </Link>
          <p>{el.overview}</p>
        </>
      );
    });
  }

  useEffect(() => {}, [UI.language]);
  return (
    <>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "3rem",
          gap: "5rem",
        }}
      >
        <Link
          href={{
            pathname: "/[media]",
            query: {
              media: media,
            },
          }}
        >
          <a>Prev</a>
        </Link>

        <Link
          href={{
            pathname: "/[media]",
            query: {
              media: media,
            },
          }}
        >
          <a>Next</a>
        </Link>
      </header>
      <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
        {listMovies()}
      </div>
    </>
  );
}
function showInTerminal(p) {
  console.log("pages [media]", p);
}

export async function getStaticProps({ params, locale }) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/discover/${params.media}?sort_by=popularity.desc&${API_KEY}&language=${locale}`
  ).then((r) => r.json());

  showInTerminal(params);
  showInTerminal(params.query);
  showInTerminal(locale);

  return {
    props: {
      movies,
      media: params.media,
    },
  };
}

const createAllPaths = (locales, media) => {
  const paths = [];

  for (const locale of locales) {
    paths.push({
      params: {
        media,
      },
      locale,
    });
  }

  return paths;
};

export async function getStaticPaths({ locales }) {
  const pathsMovie = createAllPaths(locales, "movie");
  const pathsTV = createAllPaths(locales, "tv");

  const mergeMedia = [...pathsMovie, ...pathsTV];

  return {
    paths: mergeMedia,
    fallback: false,
  };
}
