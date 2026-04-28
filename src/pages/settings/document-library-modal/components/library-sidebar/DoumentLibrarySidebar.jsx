import React, { useState } from "react";
import "./DoumentLibrarySidebar.css";
import { UploadIcon } from "../../../../../assets/icons/icon";
import GradientButton from "../../../../../widgets/gradient-button/GradientButton";
import DropZone from "../../../../../features/dropzone/DropZone";

export default function DocumentLibrarySidebar() {
  return (
    <aside className="library-sidebar">
      <p className="library-label">LIBRARY</p>

      <button className="library-nav active">
        <span>Resumes</span>
        <span>12</span>
      </button>

      <button className="library-nav">
        <span>Cover Letters</span>
        <span>4</span>
      </button>

      <div className="library-upload-box">
        <p>Drop files here or click to upload new documents</p>

        <DropZone />

        {/* <GradientButton text="Upload New" leftIcon={UploadIcon} /> */}
      </div>
    </aside>
  );
}
