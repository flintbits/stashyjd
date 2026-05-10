export function normalizeApplicationPayload(values) {
  return {
    companyName: values.company_name,
    roleTitle: values.role_title,

    department: values.department || undefined,
    location: values.location || undefined,

    workType: values.work_type || undefined,
    employmentType: values.employment_type || undefined,

    jobUrl: values.job_url || undefined,
    source: values.source || undefined,

    status: values.status?.toLowerCase(),
    priority: values.priority?.toLowerCase(),

    salaryMin: values.minsalary ? Number(values.minsalary) : undefined,

    salaryMax: values.maxsalary ? Number(values.maxsalary) : undefined,

    bonus: values.bonus ? Number(values.bonus) : undefined,

    equity: values.equity ? Number(values.equity) : undefined,

    currency: values.currency || "USD",

    appliedAt: values.applied_date || undefined,
    deadlineAt: values.deadline_date || undefined,

    notes: values.notes || undefined,
    jobDescription: values.job_description || undefined,
  };
}
