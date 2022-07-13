import React, { useEffect } from "react";
import S from "./Pagination.module.scss";

export default function Pagination({ callback, page }) {
  console.log("page in component", page);
  function keyBoardNavigation(e) {
    if (e.key === "ArrowLeft") {
      const newPage = page - 1 === 0 ? 1 : page - 1;
      callback((S) => ({ ...S, pagination: newPage }));
    }

    if (e.key === "ArrowRight") {
      console.log(page);
      callback((S) => ({ ...S, pagination: page + 1 }));
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
  }, [page]);

  return (
    <header className={S.pagination}>
      <div className={S.pagination_content}>
        {page > 1 && (
          <button
            onClick={() => {
              callback((S) => ({ ...S, pagination: page - 1 }));
            }}
          >
            prev
          </button>
        )}

        <div>
          <input type="number" defaultValue={page} />

          {/* <p>/ {Math.ceil(data.total_pages)}</p> */}
        </div>

        <button
          onClick={() => {
            callback((S) => ({ ...S, pagination: page + 1 }));
          }}
        >
          Next
        </button>
      </div>
    </header>
  );
}
