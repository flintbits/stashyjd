import { invoke } from "@tauri-apps/api/core";

export const documentPageApi = {
  fetchAllDocumets(data) {
    return invoke("fetch_documents", { docType: data.docType });
  },
};
