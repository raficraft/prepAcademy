import React, { useEffect } from "react";
import S from "./Pagination.module.scss";

export default function Pagination({ callback, page }) {
  function keyBoardNavigation(e) {
    console.log(e);

    if (e.key === "ArrowRight") {
      console.log(page);
      callback(page + 1);
    }

    if (e.key === "ArrowLeft") {
      console.log(page);
      callback(page - 1);
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      keyBoardNavigation(e);
    });

    return () => {
      document.removeEventListener("keyup", (e) => {
        keyBoardNavigation(e);
      });
    };
  }, []);

  return (
    <header className={S.pagination}>
      <div className={S.pagination_content}>
        {page > 1 && (
          <button
            onClick={() => {
              callback(page - 1);
            }}
          >
            prev
          </button>
        )}

        <div>
          <input type="number" value={page} />

          {/* <p>/ {Math.ceil(data.total_pages)}</p> */}
        </div>

        <button
          onClick={() => {
            callback(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </header>
  );
}
