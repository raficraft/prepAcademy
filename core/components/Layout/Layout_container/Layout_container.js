import React from "react";

export default function Layout_container({ children, style }) {
  return (
    <section className={`${style} layout_wrapper`}>
      <div className="layout_width">{children}</div>
    </section>
  );
}
