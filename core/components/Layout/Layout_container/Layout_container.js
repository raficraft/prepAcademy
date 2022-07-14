import React from "react";

export default function Layout_container({ children, style, id = null }) {
  return (
    <section className={`${style} layout_wrapper`} id={id}>
      <div className="layout_width">{children}</div>
    </section>
  );
}
