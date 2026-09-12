import { invoke } from '@tauri-apps/api/core';

export const documentService = {
  fetchAllDocuments(docType = null) {
    return invoke('fetch_documents', { docType });
  },

  uploadDocument({ filePath, documentType, originalFileName }) {
    return invoke('create_document', {
      filePath,
      documentType,
      originalFileName,
    });
  },
};