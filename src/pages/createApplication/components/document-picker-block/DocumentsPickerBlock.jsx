import React, { useState } from "react";
import SecondaryButton from "../../../../widgets/secondary-button/SecondaryButton";
import DropZone from "../../../../features/dropzone/DropZone";
import "./CustomBlocks.css";

export default function DocumentsPickerBlock({ values, onChange }) {
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLettes] = useState([]);

  return (
    <div className="custom-block docs-matching-block">
      <div className="docs-columns">
        <div className="doc-col">
          <label>Select Resume (choose one)</label>

          <div className="doc-options">
            <label className="doc-option active">
              <input type="radio" name="resume" defaultChecked />
              <div className="doc-info">
                <span className="doc-name">Senior_Designer_Resume.pdf</span>
                <span className="doc-date">Updated 2 days ago</span>
              </div>
              <span className="badge success">Best Match</span>
              <span className="score">82%</span>
            </label>

            <label className="doc-option">
              <input type="radio" name="resume" />
              <div className="doc-info">
                <span className="doc-name">Product_Designer_Resume.pdf</span>
                <span className="doc-date">Updated 1 week ago</span>
              </div>
              <span className="score">65%</span>
            </label>

            <label className="doc-option">
              <input type="radio" name="resume" />
              <div className="doc-info">
                <span className="doc-name">Design_Resume_2024.pdf</span>
                <span className="doc-date">Updated 3 weeks ago</span>
              </div>
              <span className="score">48%</span>
            </label>
          </div>
        </div>

        <div className="doc-col">
          <div className="doc-header-row">
            <label>Select Cover Letter (optional)</label>
            <div className="toggle-row">
              <span className="toggle-label">Include cover letter</span>
              <div className="toggle active"></div>
            </div>
          </div>

          <div className="doc-options">
            <label className="doc-option active">
              <input type="radio" name="cover_letter" defaultChecked />
              <div className="doc-info">
                <span className="doc-name">
                  Senior_Designer_Cover_Letter.pdf
                </span>
                <span className="doc-date">2 days ago</span>
              </div>
            </label>

            <label className="doc-option">
              <input type="radio" name="cover_letter" />
              <div className="doc-info">
                <span className="doc-name">General_Cover_Letter.pdf</span>
                <span className="doc-date">1 week ago</span>
              </div>
            </label>

            <label className="doc-option">
              <input type="radio" name="cover_letter" />
              <div className="doc-info">
                <span className="doc-name">No Cover Letter</span>
              </div>
            </label>
          </div>
        </div>

        <div className="doc-col matching-col">
          <label>Matching Analysis (local)</label>
          <div className="matching-analysis">
            {/* Empty graph for now per instructions */}
            <div className="circular-graph-placeholder">
              <span className="graph-value">82%</span>
              <span className="graph-label">Match Score</span>
            </div>

            <div className="matching-stats">
              <div className="stat">
                <span className="dot success"></span> Matched Keywords (18)
              </div>
              <div className="stat">
                <span className="dot error"></span> Missing Keywords (4)
              </div>
            </div>

            <SecondaryButton text="Recalculate Match" />
          </div>
        </div>
      </div>

      <div className="dropzone-section">
        <DropZone type="resume" />
      </div>
    </div>
  );
}
