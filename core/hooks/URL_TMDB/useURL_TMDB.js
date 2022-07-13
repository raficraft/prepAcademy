import { useEffect, useState } from "react";
import { API_KEY } from "../../../config/request";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useURL_TMDB(request) {
  const router = useRouter();

  const [params, setParams] = useState({
    slug: "tv",
    pagination: 1,
    language: "FR",
    id: 0,
  });

  const getURL = {
    getLanguage() {
      return `&language=${params.language.toLowerCase()}-${params.language}`;
    },
    discover() {
      return `https://api.themoviedb.org/3/discover/${
        params.slug
      }?sort_by=popularity.desc&${API_KEY}${this.getLanguage()}&region=FR&page=${
        params.pagination
      }`;
    },

    media() {
      return `https://api.themoviedb.org/3/${params.slug}/${
        params.id
      }?${API_KEY}${this.getLanguage()}`;
    },
  };

  const defineParams = {
    discover() {
      const pathArray = window.location.pathname.split("/");
      setParams((S) => ({
        ...S,
        slug: pathArray[pathArray.length - 1],
        pagination: 1,
      }));
    },

    media() {
      const pathArray = window.location.pathname.split("/");
      const params = pathArray[pathArray.length - 1].split("_");
      setParams((S) => ({
        ...S,
        slug: params[0],
        id: params[1],
      }));
    },
  };

  useEffect(() => {
    defineParams[request]();
  }, [router.query.slug]);

  const SWR = useSWR(getURL[request](), fetcher);

  return [SWR, params, setParams];
}
