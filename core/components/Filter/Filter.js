import React from "react";
import S from "./Filter.module.scss";

export default function Filter({ CALL_URL }) {
  function handleChange(e) {
    console.log(e);
    const radioBtn = e.target;
    const call_url = radioBtn.getAttribute("id");
    CALL_URL(call_url);
  }
  return (
    <div className={S.filter_container}>
      <div className={S.bloc_input}>
        <label htmlFor="discoverDESC">
          Popularité +/-
          <input
            type="radio"
            id="discoverDESC"
            name="call_url"
            onChange={(e) => {
              handleChange(e);
            }}
            defaultChecked
          />
        </label>
      </div>

      <div className={S.bloc_input}>
        <label htmlFor="discoverASC">
          Popularité - /+
          <input
            type="radio"
            id="discoverASC"
            name="call_url"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
      </div>
      <div className={S.bloc_input}>
        <label htmlFor="discoverByNameASC">
          {" "}
          Titres (de A-Z)
          <input
            type="radio"
            id="discoverByNameASC"
            name="call_url"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
      </div>
      <div className={S.bloc_input}>
        <label htmlFor="discoverByNameDESC">
          {" "}
          Titres (de Z-A)
          <input
            type="radio"
            id="discoverByNameDESC"
            name="call_url"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
      </div>
    </div>
  );
}
