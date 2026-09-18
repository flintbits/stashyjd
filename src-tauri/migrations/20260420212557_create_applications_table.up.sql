CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,

    location TEXT,

    work_type TEXT,
    employment_type TEXT,

    job_url TEXT,

    status TEXT NOT NULL DEFAULT 'applied',

    applied_at TEXT,
    deadline_at TEXT,

    job_description TEXT,

    resume_document_id TEXT,
    cover_letter_document_id TEXT,

    archived INTEGER NOT NULL DEFAULT 0,

    last_activity_at DATETIME,

    created_at DATETIME DEFAULT (datetime('now','localtime')),
    updated_at DATETIME DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (resume_document_id) REFERENCES documents(public_id) ON DELETE SET NULL,
    FOREIGN KEY (cover_letter_document_id) REFERENCES documents(public_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_applications_public_id
ON applications(public_id);

CREATE INDEX IF NOT EXISTS idx_applications_status
ON applications(status);

CREATE INDEX IF NOT EXISTS idx_applications_company_name
ON applications(company_name);

CREATE INDEX IF NOT EXISTS idx_applications_archived
ON applications(archived);

CREATE INDEX IF NOT EXISTS idx_applications_created_at
ON applications(created_at);