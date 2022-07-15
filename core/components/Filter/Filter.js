import React from "react";

export default function Filter({ CALL_URL }) {
  return (
    <div>
      <button
        onClick={() => {
          CALL_URL("discover");
        }}
      >
        populaire
      </button>
      <button
        onClick={() => {
          CALL_URL("discoverByName");
        }}
      >
        TEST A-Z
      </button>
    </div>
  );
}
