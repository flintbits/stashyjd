import React, { useState } from "react";
import "./CustomBlocks.css";
import InputField from "../../../widgets/Input/input-field/InputField";

export default function OrganizationNotesBlock({ values, onChange }) {
  const [tags, setTags] = useState([]);
  const [isAddTag, setIsAddTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  console.log(tags);
  return (
    <div className="custom-block org-notes-block">
      <div className="org-cols">
        <div className="org-col">
          <label>Tags</label>
          <div className="tags-container">
            {tags?.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
                <span
                  className="close"
                  onClick={() => {
                    let index = tags.indexOf(tag);

                    if (index === -1) return;

                    setTags((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  ×
                </span>
              </span>
            ))}
            {!isAddTag ? (
              <button
                type="button"
                className="add-tag"
                onClick={() => setIsAddTag(true)}
              >
                + Add Tag
              </button>
            ) : (
              <input
                autoFocus
                className="tag-input"
                placeholder="New tag"
                onBlur={() => setIsAddTag(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTag.trim()) {
                    setTags((prev) => [...prev, e.target.value]);
                    setIsAddTag(false);
                  }

                  if (e.key === "Escape") {
                    setIsAddTag(false);
                  }
                }}
              />
            )}
          </div>
        </div>

        <div className="org-col">
          <label>Notes</label>
          <textarea
            placeholder="Add your notes here..."
            value={values.notes || ""}
            onChange={(e) =>
              onChange({ target: { id: "notes", value: e.target.value } })
            }
          />
        </div>
      </div>
    </div>
  );
}
