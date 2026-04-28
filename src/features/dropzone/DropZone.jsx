import { UploadCloud } from "lucide-react";
import React from "react";
import "./DropZone.css";

export default function DropZone() {
  return (
    <div className="file-upload-box">
      <label htmlFor="resume-upload" className="upload-dropzone">
        <span className="upload-icon-wrapper">
          <UploadCloud size={12} strokeWidth={1.8} className="upload-icon" />
        </span>

        <p className="upload-title">Drag & drop a new resume here</p>
        <p className="upload-subtitle">PDF, DOCX up to 5MB</p>

        <input
          id="resume-upload"
          type="file"
          className="upload-input"
          accept=".pdf,.docx"
        />
      </label>
    </div>
  );
}
