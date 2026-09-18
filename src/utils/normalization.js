export function normalizeApplicationPayload(values) {
  return {
    companyName: values.company_name,
    roleTitle: values.role_title,

    location: values.location || undefined,

    workType: values.work_type || undefined,
    employmentType: values.employment_type || undefined,

    jobUrl: values.job_url || undefined,
    status: values.status?.toLowerCase(),

    appliedAt: values.applied_date || undefined,
    deadlineAt: values.deadline_date || undefined,

    jobDescription: values.job_description || undefined,

    resumeDocumentId: values.resume_document_id,
    coverLetterDocumentId: values.cover_letter_document_id,
  };
}

// Normalizing file path for pdf thumbnails / document preview
export const normalizeFilePath = (path) => {
  if (!path) return '';

  return path
    .replace(/^\\\\\?\\/, '') // remove Windows long-path prefix
    .replace(/\\/g, '/'); // normalize slashes
};

export const toFileUrl = (path) => {
  const normalized = normalizeFilePath(path);

  // macOS/Linux
  if (normalized.startsWith('/')) {
    return `file://${normalized}`;
  }

  // Windows
  return `file:///${normalized}`;
};
