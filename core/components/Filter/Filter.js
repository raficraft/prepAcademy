import React, { useContext } from "react";
import { UIContext } from "../../context/UIProvider/UIProvider";
import { UI_I18n_media_filter } from "../../Data/UI_I8n";
import S from "./Filter.module.scss";

export default function Filter({ request }) {
  const { UI, callback } = useContext(UIContext);

  function handleChange(e) {
    const radioBtn = e.target;
    const call_url = radioBtn.getAttribute("id");
    request(call_url);
  }

  return (
    <div className={S.filter_container}>
      <div className={S.bloc_input}>
        <label htmlFor="discoverDESC" tabIndex="1">
          {UI_I18n_media_filter.popularityDESC[UI.language]}
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
          {UI_I18n_media_filter.popularityASC[UI.language]}
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
          {UI_I18n_media_filter.titleASC[UI.language]}
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
        <label htmlFor="voteDESC" tabIndex="4">
          {" "}
          {UI_I18n_media_filter.voteDESC[UI.language]}
          <input
            type="radio"
            id="voteDESC"
            name="call_url"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
      </div>

      <div className={S.bloc_input}>
        <label htmlFor="voteASC" tabIndex="3">
          {" "}
          {UI_I18n_media_filter.voteASC[UI.language]}
          <input
            type="radio"
            id="voteASC"
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
