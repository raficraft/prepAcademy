import React from "react";

export default function Layout_container({ children, style }) {
  return (
    <section className={style}>
      <div>{children}</div>
    </section>
  );
}
