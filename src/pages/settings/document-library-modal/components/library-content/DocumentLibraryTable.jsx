import React from "react";
import "./DocumentLibraryTable.css";

const files = [
  {
    id: 1,
    name: "Senior_SWE_Resume_2024.pdf",
    version: "v3.2",
    tags: ["Frontend", "React"],
    status: "DEFAULT",
    usage: 42,
    rate: "18.5%",
    lastUsed: "2 days ago",
  },
  {
    id: 2,
    name: "Fullstack_General_Resume.pdf",
    version: "v2.0",
    tags: ["Node.js"],
    usage: 15,
    rate: "8.2%",
    lastUsed: "1 week ago",
  },
  {
    id: 3,
    name: "legacy-Resume-2022.pdf",
    version: "v1.1",
    status: "ARCHIVED",
    usage: 84,
    rate: "12.0%",
    lastUsed: "8 mos ago",
  },
];

export default function DocumentLibraryTable() {
  return (
    <section className="library-table-wrap">
      <div className="library-table-head">
        <span>File Name & Version</span>
        <span>Usage Count</span>
        <span>Response Rate</span>
        <span>Last Used</span>
      </div>

      <div className="library-table-body">
        {files.map((file) => (
          <div key={file.id} className="library-row">
            {/* LEFT SIDE */}
            <div className="file-col">
              <div className="file-icon">📄</div>

              <div className="file-info">
                <div className="file-title-row">
                  <h4>{file.name}</h4>

                  {file.status && (
                    <span className="status-tag">{file.status}</span>
                  )}
                </div>

                <div className="meta-row">
                  <span className="tag">{file.version}</span>

                  {file.tags?.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <span className="table-value">{file.usage}</span>

            <span className="table-value purple">{file.rate}</span>

            <span className="table-value">{file.lastUsed}</span>
          </div>
        ))}
      </div>

      <div className="library-footer-bar">
        <span>1 document selected</span>

        <div className="footer-actions">
          <button>Compare</button>
          <button>Archive</button>
          <button>Duplicate</button>
          <button className="primary-btn">Use Selected</button>
        </div>
      </div>
    </section>
  );
}
