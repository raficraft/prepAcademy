import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../../config/request";
import useSWR from "swr";
import { useRouter } from "next/router";
import { UIContext } from "../../context/UIProvider/UIProvider";

export function useURL_TMDB(request = "discoverDESC") {
  const router = useRouter();
  const { UI } = useContext(UIContext);

  const [params, setParams] = useState({
    slug: "movie", // tv or movie
    pagination: 1,
    language: UI.language, // fr or en
    maxPage: 500,
    id: 0,
    query: "",
    searchPagination: 1,
  });

  const paramsURL = {
    getLanguage() {
      let lang = "";
      if (UI.language === "EN") {
        lang = "en-US";
      } else {
        lang = UI.language.toLowerCase();
      }

      return `language=${lang}-${UI.language}&region=${params.language}`;
    },

    getSortBy() {
      return params.slug === "movie"
        ? "sort_by=original_title"
        : "sort_by=name";
    },

    discoverASC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=popularity.asc&${API_KEY}&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    discoverDESC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?${API_KEY}&sort_by=popularity.desc&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    voteASC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?sort_by=vote_average.asc&${API_KEY}&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    voteDESC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?${API_KEY}&sort_by=vote_average.desc&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    discoverByNameASC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?${API_KEY}&${this.getSortBy()}.asc&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    discoverByNameDESC(slug = params.slug, pagination = params.pagination) {
      return `https://api.themoviedb.org/3/discover/${slug}?${API_KEY}&${this.getSortBy()}.desc&${this.getLanguage()}&page=${pagination}&include_adult=false`;
    },

    media(slug = params.slug, id = params.id) {
      return `https://api.themoviedb.org/3/${slug}/${
        params.id
      }?${API_KEY}&language=${UI.language.toLowerCase()}&append_to_response=videos,release_dates`;
    },

    credits(slug = params.slug, id = params.id) {
      return `
      https://api.themoviedb.org/3/${slug}/${
        params.id
      }/credits?${API_KEY}&language=${UI.language.toLowerCase()}`;
    },

    search(slug = params.slug, query = params.query) {
      return `   https://api.themoviedb.org/3/search/${
        params.slug
      }?${API_KEY}&${params.query}&${this.getLanguage()}&page=${
        params.pagination
      }&include_adult=false`;
    },

    setPagination(page) {
      setParams((S) => ({ ...S, pagination: page }));
    },
  };

  const defineParams = {
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

    search() {
      const params = window.location.search.split("&");
      console.error(params[0]);
      const query = params[0].replaceAll("%", "+").substring(1);

      console.log("slug", params[1]);
      console.log("requete", query);
      setParams((S) => ({
        ...S,
        slug: params[1],
        query: query,
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
    if (
      request === "discoverDESC" ||
      request === "discoverASC" ||
      request === "discoverByNameASC" ||
      request === "discoverByNameDESC" ||
      request === "voteASC" ||
      request === "voteDESC"
    ) {
      request = "discoverDESC";
    }
    defineParams[request]();
  }, [router.query.slug]);

  return [params, paramsURL];
}
