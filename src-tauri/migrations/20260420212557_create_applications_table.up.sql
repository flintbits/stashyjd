-- Add up migration script here
-- migrations/20260420182358_create_applications_table.sql

CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    job_url TEXT,

    stage TEXT NOT NULL DEFAULT 'wishlist',
    priority INTEGER NOT NULL DEFAULT 0,

    source TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    currency TEXT NOT NULL DEFAULT 'USD',

    applied_at TEXT,
    deadline_at TEXT,

    notes TEXT,

    resume_id INTEGER,
    cover_letter_id INTEGER,

    archived INTEGER NOT NULL DEFAULT 0,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP

    -- FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE SET NULL,
    -- FOREIGN KEY (cover_letter_id) REFERENCES cover_letters(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_applications_public_id
ON applications(public_id);

CREATE INDEX IF NOT EXISTS idx_applications_stage
ON applications(stage);

CREATE INDEX IF NOT EXISTS idx_applications_company_name
ON applications(company_name);

CREATE INDEX IF NOT EXISTS idx_applications_priority
ON applications(priority);

CREATE INDEX IF NOT EXISTS idx_applications_archived
ON applications(archived);

CREATE INDEX IF NOT EXISTS idx_applications_created_at
ON applications(created_at);