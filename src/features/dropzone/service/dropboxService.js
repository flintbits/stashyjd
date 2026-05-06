import { invoke } from "@tauri-apps/api/core";

export const api = {
  uploadDocument(data) {
    return invoke("create_document", {
      filePath: data.filePath,
      documentType: data.documentType,
      originalFileName: data.originalFileName,
    });
  },
};
