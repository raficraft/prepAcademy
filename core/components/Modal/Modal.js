import React, { useEffect, useContext } from "react";
import S from "./Modal.module.scss";
import Portal from "../../utils/Portal";
import { UIContext } from "../../context/UIProvider/UIProvider";

export default function Modal({ children }) {
  const { UI, callback } = useContext(UIContext);

  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      console.log(event.code);
      if (event.code === "Escape") {
        callback.closeModal();
      }
    });

    return () => {
      document.removeEventListener("keyup", (event) => {
        console.log(event.code);
        if (event.code === "Escape") {
          callback.closeModal();
        }
      });
    };
  }, []);

  return (
    <Portal selector="#__body">
      <div
        className={S.modal}
        onClick={() => {
          callback.closeModal();
        }}
        data-show={UI.modal}
      >
        {children}
      </div>
    </Portal>
  );
}
