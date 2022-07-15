import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../../config/request";
import useSWR from "swr";
import { useRouter } from "next/router";
import { UIContext } from "../../context/UIProvider/UIProvider";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useURL_TMDB(request) {
  const router = useRouter();
  const { UI } = useContext(UIContext);

  const [params, setParams] = useState({
    slug: "tv",
    pagination: 1,
    language: "FR",
    id: 0,
    router: {},
    SWR: {},
  });

  const paramsURL = {
    getLanguage() {
      return `&language=${UI.language.toLowerCase()}-${UI.language}`;
    },
    discover(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=popularity.desc&${API_KEY}${this.getLanguage()}&region=FR&page=${pagination}`;
    },

    discoverByName(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=original_title.asc&${API_KEY}${this.getLanguage()}&region=FR&page=${pagination}`;
    },

    media(slug = params.slug, id = params.id) {
      return `https://api.themoviedb.org/3/${slug}/${id}?${API_KEY}${this.getLanguage()}`;
    },

    setPagination(page) {
      setParams((S) => ({ ...S, pagination: page }));
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
    setParams((S) => ({ ...S, router: router }));
  }, [router.query.slug]);

  const SWR = useSWR(paramsURL[request](), fetcher);

  return [SWR, params, paramsURL];
}
