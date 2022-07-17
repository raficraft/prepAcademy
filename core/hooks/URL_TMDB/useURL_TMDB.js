import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../../config/request";
import useSWR from "swr";
import { useRouter } from "next/router";
import { UIContext } from "../../context/UIProvider/UIProvider";

export function useURL_TMDB(request) {
  const router = useRouter();
  const { UI } = useContext(UIContext);

  const [params, setParams] = useState({
    slug: "tv", // tv or movie
    pagination: 1,
    language: UI.language, // fr or en
    maxPage: 500,
    id: 0,
  });

  const paramsURL = {
    getLanguage() {
      return `language=${UI.language.toLowerCase()}-${UI.language}&region=${
        UI.language
      }`;
    },
    discoverASC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=popularity.asc&${API_KEY}&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    discoverDESC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?${API_KEY}&sort_by=popularity.desc&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    discoverByNameASC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=original_title.asc&${API_KEY}&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    discoverByNameDESC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=original_title.desc&${API_KEY}&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    media(slug = params.slug, id = params.id) {
      return `https://api.themoviedb.org/3/${slug}/438148-minions-the-rise-of-gru?${API_KEY}&language=${UI.language.toLowerCase()}&append_to_response=videos,release_dates`;
    },

    credits(slug = params.slug, id = params.id) {
      return `
      https://api.themoviedb.org/3/${slug}/${
        params.id
      }/credits?${API_KEY}&language=${UI.language.toLowerCase()}`;
    },

    setPagination(page) {
      console.log(page);
      setParams((S) => ({ ...S, pagination: page }));
    },
  };

  const defineParams = {
    discoverASC() {
      const pathArray = window.location.pathname.split("/");
      setParams((S) => ({
        ...S,
        slug: pathArray[pathArray.length - 1],
        pagination: 1,
      }));
    },

    discoverDESC() {
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

    credits() {
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

  return [params, paramsURL];
}
