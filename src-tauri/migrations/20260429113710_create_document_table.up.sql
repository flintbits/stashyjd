CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    document_type TEXT NOT NULL CHECK (
        document_type IN ('resume', 'cover_letter', 'portfolio')
    ),
    stored_file_name TEXT NOT NULL,
    original_file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,

    version TEXT,
    is_default INTEGER NOT NULL DEFAULT 0,

    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,

    raw_text TEXT,

    file_hash TEXT NOT NULL UNIQUE,
    text_hash TEXT NOT NULL UNIQUE,

    created_at DATETIME DEFAULT (datetime('now','localtime')),
    updated_at DATETIME DEFAULT (datetime('now','localtime'))
);

-- indexes
CREATE INDEX IF NOT EXISTS idx_documents_type_default
ON documents(document_type, is_default);

CREATE INDEX IF NOT EXISTS idx_documents_file_name
ON documents(stored_file_name);

CREATE INDEX IF NOT EXISTS idx_documents_created_at
ON documents(created_at);