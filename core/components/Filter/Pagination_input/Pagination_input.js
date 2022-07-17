import React, { useState, useRef } from "react";
import { useURL_TMDB } from "../../../hooks/URL_TMDB/useURL_TMDB";
import S from "./Pagination_input.module.scss";

export let Pagination_input = ({ request, currentPage, ref, callback }) => {
  const [params, paramsURL] = useURL_TMDB(request);
  const [error, setError] = useState(false);
  const error_message = useRef(null);

  function controlCapture(e) {
    const pattern = e.target.getAttribute("pattern");
    const regex = new RegExp(pattern);
    const isValid = regex.test(e.target.value);

    if (!isValid) {
      setError("Format invalid, number only");
      e.target.value = 1;
      setTimeout(() => {
        setError(false);
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
      <div className={S.pagination_content}>
        <label forHtml="changePage">Swipe to scroll pages</label>
        <span className={S.bloc_input}>
          <label forHtml="changePage" className="bold">
            Pages :{" "}
          </label>
          <input
            type="text"
            id="changePage"
            name="changePage"
            defaultValue={params.pagination}
            value={currentPage}
            onChange={controlCapture}
            pattern="^[0-9]*$"
          />
          <p class="bold">/ {params.maxPage}</p>
        </span>
      </div>
      {error && (
        <span className="error_container">
          <p className="error_text" ref={error_message}>
            {error}
          </p>
        </span>
      )}
    </div>
  );
};
