import { invokeSafe } from '../lib/invokeSafe';

export const documentService = {
  fetchAllDocuments(docType = null) {
    return invokeSafe('fetch_documents', { docType });
  },

  uploadDocument({ filePath, documentType, originalFileName }) {
    return invokeSafe('create_document', {
      filePath,
      documentType,
      originalFileName,
    });
  },
};
