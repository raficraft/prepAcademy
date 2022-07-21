import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { debounce } from "../../../utils/debounce";
import S from "./Pagination.module.scss";

export default function Pagination({ callback, page }) {
  const [pagination, setPagination] = useState(page);

  function incrementPage() {
    console.log(typeof page);
    callback(parseInt(page) + 1);
    setPagination(parseInt(page) + 1);
  }

  function uncrementPage() {
    console.log(typeof page);
    const newPage = parseInt(page) - 1 === 0 ? 1 : parseInt(page) - 1;
    callback(newPage);
    setPagination(newPage);
  }

  useEffect(() => {
    const restoreScrollBar = () => {
      let bodyElt = document.body;
      bodyElt.style.overflow = "";
    };

    restoreScrollBar();
  }, [page]);
  return (
    <div className={S.pagination_content}>
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
    </div>
  );
}
