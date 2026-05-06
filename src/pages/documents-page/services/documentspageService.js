import { invoke } from "@tauri-apps/api/core";

export const documentPageApi = {
  fetchAllDocumets() {
    return invoke("fetch_documents", {});
  },
};
