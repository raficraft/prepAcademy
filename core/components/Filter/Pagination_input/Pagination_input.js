import React, { useState, useRef } from "react";
import { useURL_TMDB } from "../../../hooks/URL_TMDB/useURL_TMDB";
import S from "./Pagination_input.module.scss";

export let Pagination_input = ({ request, currentPage, ref, callback }) => {
  const [params, paramsURL] = useURL_TMDB(request);
  const error_message = useRef(null);

  function controlCapture(e) {
    const pattern = e.target.getAttribute("pattern");
    const regex = new RegExp(pattern);
    const isValid = regex.test(e.target.value);

    if (!isValid) {
      error_message.current.textContent = "format invalid number only";
      e.target.value = 1;
      setTimeout(() => {
        error_message.current.textContent = null;
      }, 5000);
      return false;
    }

    if (e.target.value > params.maxPage) {
      e.target.value = params.maxPage;
    }

    if (e.target.value < 1) {
      e.target.value = 1;
    }

    callback(e.target.value);
  }

  return (
    <div className={S.pagination_input}>
      <label>Swipe to scroll pages</label>
      <span>
        <input
          type="text"
          id="changePage"
          name="changePage"
          defaultValue={params.pagination}
          onChange={controlCapture}
          pattern="^[0-9]*$"
        />
        <p>/{params.maxPage}</p>
      </span>
      <p className="error_message" ref={error_message}></p>
    </div>
  );
};
