import React from "react";
import S from "./Filter.module.scss";

export default function Filter({ request }) {
  function handleChange(e) {
    const radioBtn = e.target;
    const call_url = radioBtn.getAttribute("id");
    request(call_url);
  }

  return (
    <div className={S.filter_container}>
      <div className={S.bloc_input}>
        <label htmlFor="discoverDESC" tabIndex="1">
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
        <label htmlFor="discoverASC" tabIndex="2">
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
        <label htmlFor="discoverByNameASC" tabIndex="3">
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
        <label htmlFor="discoverByNameDESC" tabIndex="4">
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
