import React, { useId } from "react";
import styles from "./DropZone.module.css";
import { appDataDir, join } from "@tauri-apps/api/path";
import { mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { invoke } from "@tauri-apps/api/core";
import { useProgress } from "../../app/context/ProgressProvider";
import { api } from "./services/dropboxService";
import { useToast } from "../../app/context/ToastProvider";
import { UploadIcon } from "../../assets/icons/icon";

export default function DropZone({ label = "Upload", type, successCallback }) {
  const inputId = useId();
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

    try {
      const response = await api.uploadDocument({
        filePath: `documents/${fileName}`,
        documentType: type,
        originalFileName: file.name,
      });

      console.log("Backend response:", response);

      addToast({
        title: response.status,
        message: response.message,
        type:
          response.status === "error"
            ? "error"
            : response.status === "success"
              ? "success"
              : "warning",
      });

      if (response.status === "success") {
        await successCallback();
      }
    } catch (err) {
      addToast({
        title: "Error",
        message: String(err),
        type: "error",
      });
    }

    return `documents/${fileName}`;
  };

  const handleFileUpload = async (e) => {
    const input = e.target;
    const file = input.files?.[0];
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
    } finally {
      //Important to upload the file again without reloading the screen
      input.value = "";
    }
  };

  return (
    <div className={styles["resume-upload-container"]}>
      <label htmlFor={inputId} className={styles["upload-btn"]}>
        <UploadIcon size={12} />
        {label}
      </label>

      <input
        id={inputId}
        type="file"
        className={styles["upload-input"]}
        accept=".pdf,.docx"
        onChange={handleFileUpload}
      />
    </div>
  );
}
