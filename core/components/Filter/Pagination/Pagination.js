import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { debounce } from "../../../utils/debounce";
import S from "./Pagination.module.scss";

export default function Pagination({ callback, page, style }) {
  const [pagination, setPagination] = useState(page);

  function incrementPage() {
    callback(page + 1);
    setPagination(page + 1);
  }

  function uncrementPage() {
    const newPage = page - 1 === 0 ? 1 : page - 1;
    callback(newPage);
    setPagination(newPage);
  }

  function circleBtn() {
    return (
      <>
        <span className={`${S.button_container} ${S.button_containerPrev}`}>
          <button
            onClick={() => {
              uncrementPage();
            }}
            disabled={page < 1}
            data-prev
          ></button>
        </span>

        <span className={`${S.button_container} ${S.button_containerPrev}`}>
          <button
            onClick={() => {
              incrementPage();
            }}
            data-next
          ></button>
        </span>
      </>
    );
  }

  function stdBtn() {
    return (
      <>
        <button
          onClick={() => {
            uncrementPage();
          }}
          disabled={page < 1}
        >
          Prev
        </button>

        <button
          onClick={() => {
            incrementPage();
          }}
        >
          Next
        </button>
      </>
    );
  }

  useEffect(() => {
    const restoreScrollBar = () => {
      let bodyElt = document.body;
      bodyElt.style.overflow = "";
    };

    restoreScrollBar();
  }, [page]);
  return (
    <div className={S[style]}>
      {style === "pagination_desktop" ? circleBtn() : stdBtn()}
    </div>
  );
}
