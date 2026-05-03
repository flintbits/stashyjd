import React from "react";
import "./RightSidebar.css";
import {
  LuCheck,
  LuFileText,
  LuMoon,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu";

export default function RightSidebar({ setShowRight }) {
  return (
    <div className="create-app-right-sidebar">
      <div className="window-controls">
        <div className="window-actions">
          <LuX
            size={16}
            color="var(--text-tertiary)"
            onClick={() => setShowRight(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="match-summary-header">
        <h3>Match Summary</h3>
        <h2 className="match-score">82%</h2>
      </div>

      <div className="sidebar-section">
        <h4 className="section-title">Selected Resume</h4>
        <div className="selected-doc">
          <LuFileText size={16} color="var(--text-secondary)" />
          <div className="doc-info">
            <span className="doc-name">Senior_Designer_Resume.pdf</span>
            <span className="doc-date">Updated 2 days ago</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h4 className="section-title">Top Matched Keywords</h4>
        <ul className="keyword-list matched">
          <li>
            <LuCheck size={14} color="var(--success)" /> Product Design
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> User Experience
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> Figma
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> Design Systems
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> Prototyping
          </li>
        </ul>
        <button className="more-keywords-btn">+ 13 more</button>
      </div>

      <div className="sidebar-section">
        <h4 className="section-title">Missing Keywords</h4>
        <ul className="keyword-list missing">
          <li>
            <span className="dot error"></span> Motion Design
          </li>
          <li>
            <span className="dot error"></span> A/B Testing
          </li>
          <li>
            <span className="dot error"></span> Analytics
          </li>
          <li>
            <span className="dot error"></span> Front-end Development
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h4 className="section-title">
          All Resumes <span className="subtitle">(sorted by match)</span>
        </h4>
        <div className="all-resumes-list">
          <div className="resume-card active">
            <LuFileText size={16} color="var(--brand-primary)" />
            <div className="doc-info">
              <span className="doc-name">Senior_Designer_Resume.pdf</span>
              <span className="doc-date">2 days ago</span>
            </div>
            <span className="match-badge">82%</span>
          </div>
          <div className="resume-card">
            <LuFileText size={16} color="var(--text-secondary)" />
            <div className="doc-info">
              <span className="doc-name">Product_Designer_Resume.pdf</span>
              <span className="doc-date">1 week ago</span>
            </div>
            <span className="match-badge gray">65%</span>
          </div>
          <div className="resume-card">
            <LuFileText size={16} color="var(--text-secondary)" />
            <div className="doc-info">
              <span className="doc-name">Design_Resume_2024.pdf</span>
              <span className="doc-date">3 weeks ago</span>
            </div>
            <span className="match-badge gray">48%</span>
          </div>
        </div>
        <button className="view-all-btn">View all documents</button>
      </div>

      <div className="sidebar-section border-top">
        <h4 className="section-title">Cover Letter</h4>
        <div className="cover-letter-option active">
          <LuFileText size={16} color="var(--text-primary)" />
          <div className="doc-info">
            <span className="doc-name">Senior_Designer_Cover_Letter.pdf</span>
            <span className="doc-date">2 days ago</span>
          </div>
          <div className="toggle active"></div>
        </div>
        <div className="cover-letter-option">
          <div className="circle-placeholder"></div>
          <span className="doc-name">No Cover Letter</span>
          <div className="toggle"></div>
        </div>
      </div>
    </div>
  );
}
