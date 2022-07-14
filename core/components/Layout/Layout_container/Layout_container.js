import React from "react";

export default function Layout_container({ children, style }) {
  console.log("!!!", style);
  return (
    <section className={style}>
      <div>{children}</div>
    </section>
  );
}
