import { LuCloudUpload } from "react-icons/lu";
import React from "react";
import "./DropZone.css";
import { appDataDir, join } from "@tauri-apps/api/path";
import { mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { invoke } from "@tauri-apps/api/core";
import { useProgress } from "../../app/context/ProgressProvider";
import { api } from "./service/dropboxService";
import { useToast } from "../../app/context/ToastProvider";

export default function DropZone({
  label = "Upload",
  type = "resume",
  successCallback,
}) {
  const { start, setProgress, finish } = useProgress();
  const { addToast } = useToast();

  const saveFile = async (file) => {
    const baseDir = await appDataDir();

    const docsDir = await join(baseDir, "documents");
    await mkdir(docsDir, { recursive: true });

    const fileName = `${crypto.randomUUID()}_${file.name}`;
    const fullPath = await join(docsDir, fileName);

    const bytes = new Uint8Array(await file.arrayBuffer());

    await writeFile(fullPath, bytes);

    console.log(`relativePath: documents/${fileName}`);
    console.log(fullPath);

    try {
      const res = await api.uploadDocument({
        filePath: `documents/${fileName}`,
        documentType: type,
        originalFileName: file.name,
      });

      console.log("Backend response:", res);

      if (res.status === "success") {
        addToast({
          title: "Success",
          message: res.message,
          type: "success",
        });
        await successCallback();
      } else if (res.status === "duplicate") {
        addToast({
          title: "Duplicate",
          message: res.message,
          type: "warning",
        });
      }
    } catch (err) {
      addToast({
        title: "Failed",
        message: JSON.stringify(err),
        type: "error",
      });
    }

    return `documents/${fileName}`;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const extOk = /\.(pdf|docx)$/i.test(file.name);
    const mimeOk = allowed.includes(file.type);

    if (!extOk && !mimeOk) {
      addToast({
        title: "Invalid file",
        message: "Only PDF or DOCX allowed",
        type: "warning",
      });
      return;
    }

    try {
      const relativePath = await saveFile(file);
      console.log("Saved:", relativePath);
    } catch (err) {
      console.error(err);

      addToast({
        title: "Error",
        message: "Failed to save file",
        type: "error",
      });
    }
  };

  return (
    <div className="resume-upload-container">
      <label htmlFor="resume-upload" className="upload-btn">
        <LuCloudUpload size={16} />
        {label}
      </label>

      <input
        id="resume-upload"
        type="file"
        className="upload-input"
        accept=".pdf,.docx"
        onChange={handleFileUpload}
      />
    </div>
  );
}
