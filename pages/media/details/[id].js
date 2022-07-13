import React, { useEffect, useState } from "react";
import { API_KEY, IMG_URL } from "../../../config/request";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Media_info() {
  const [info, setInfo] = useState({
    targetMedia: "movie",
    targetId: 0,
  });

  function getUrl(media, id) {
    console.log(media, id);
    return `
    https://api.themoviedb.org/3/movie/438148?api_key=2f1cd320d0c73ed97571384b3a32396d&language=fr-FR`;
  }

  const { data, error } = useSWR(
    getUrl(info.targetMedia, info.targetId),
    fetcher
  );

  //api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

  useEffect(() => {
    function getUrlInfo() {
      console.log(window.location);
      const pathArray = window.location.pathname.split("/");
      const slug = pathArray[pathArray.length - 1].split("_");
      const targetMedia = slug[0];
      const targetId = slug[1];

      console.log("path ", slug);

      return [targetMedia, targetId];
    }
    const parseUrl = getUrlInfo();

    setInfo((S) => ({
      ...S,
      targetMedia: parseUrl[0],
      targetId: parseUrl[1],
    }));

    console.log(data);
  }, []);

  function toto() {
    console.log(data);
  }

  return (
    <>
      {info.targetId > 0 && data ? (
        <>
          <div>
            <div>
              <img src={`${IMG_URL}${data.backdrop_path}`} />
            </div>
          </div>
        </>
      ) : (
        <p>Error</p>
      )}
    </>
  );
}
