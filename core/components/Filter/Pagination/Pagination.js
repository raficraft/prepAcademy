import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { debounce } from "../../../utils/debounce";
import S from "./Pagination.module.scss";

export default function Pagination({ callback, page }) {
  const router = useRouter();

  function incrementPage() {
    callback(page + 1);
  }

  function uncrementPage() {
    const newPage = page - 1 === 0 ? 1 : page - 1;
    callback(newPage);
  }

  function keyBoardNavigation(e) {
    console.log(page);
    if (e.key === "ArrowLeft") {
      uncrementPage();
    }

    if (e.key === "ArrowRight") {
      incrementPage();
    }
  }

  useEffect(() => {
    document.addEventListener(
      "keyup",
      debounce((e) => {
        keyBoardNavigation(e);
      }),
      300
    );

    return () => {
      document.removeEventListener("keyup", (e) => {
        keyBoardNavigation(e);
      });
    };
  }, [page, router.query.slug]);

  return (
    <div className={S.pagination_content}>
      <span className={`${S.button_container} ${S.button_containerPrev}`}>
        <button
          onClick={() => {
            uncrementPage();
          }}
          disabled={page < 1}
          data-hsprev
        >
          prev
        </button>
      </span>

      <div>
        <input type="number" defaultValue={page} />

        {/* <p>/ {Math.ceil(data.total_pages)}</p> */}
      </div>
      <span className={`${S.button_container} ${S.button_containerPrev}`}>
        <button
          onClick={() => {
            incrementPage();
          }}
          data-hsnext
        >
          Next
        </button>
      </span>
    </div>
  );
}
