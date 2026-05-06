import React from "react";
import "./PageHeader.css";

export default function PageHeader({ children, title, subtitle }) {
  return (
    <section className="page-header">
      <div className="page-header-content">
        <h1 className="page-header-title">{title}</h1>
        <p className="page-header-subtitle">{subtitle}</p>
      </div>

      <div className="page-header-actions">{children}</div>
    </section>
  );
}
