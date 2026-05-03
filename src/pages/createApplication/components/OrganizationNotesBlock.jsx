import React from "react";
import "./CustomBlocks.css";

export default function OrganizationNotesBlock({ values, onChange }) {
  return (
    <div className="custom-block org-notes-block">
      <div className="org-cols">
        <div className="org-col">
          <label>Tags</label>
          <div className="tags-container">
            <span className="tag">Product Design <span className="close">×</span></span>
            <span className="tag">Senior Level <span className="close">×</span></span>
            <span className="tag">Remote OK <span className="close">×</span></span>
            <span className="add-tag">+ Add Tag</span>
          </div>
        </div>
        
        <div className="org-col">
          <label>Notes</label>
          <textarea 
            placeholder="Add your notes here..."
            value={values.notes || ""}
            onChange={(e) => onChange({ target: { id: 'notes', value: e.target.value }})}
          />
        </div>
      </div>
    </div>
  );
}
