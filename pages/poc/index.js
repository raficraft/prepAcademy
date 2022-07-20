import Link from "next/link";
import React from "react";
import { API_KEY } from "../../config/request";

export default function poc({ movies }) {
  function listMovies() {
    return movies.results.map((el, idx) => {
      return (
        <Link href={`poc/media/${el.id}`}>
          <a
            style={{ display: "flex", flexDirection: "column", margin: "1rem" }}
          >
            {el.original_title}
          </a>
        </Link>
      );
    });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      {listMovies()}
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

// export async function getStaticPaths({ params }) {
//   const movies = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${API_KEY}&language=fr-FR&region=FR`
//   ).then((r) => r.json());

//   return {
//     props: {
//       movies,
//     },
//   };
// }
