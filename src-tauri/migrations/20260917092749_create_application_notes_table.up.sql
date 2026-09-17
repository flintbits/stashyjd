CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    application_id TEXT NOT NULL,

    text TEXT NOT NULL,

    created_at DATETIME DEFAULT (datetime('now','localtime')),
    updated_at DATETIME DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (application_id)
        REFERENCES applications(public_id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notes_public_id
ON notes(public_id);

CREATE INDEX IF NOT EXISTS idx_notes_application_id
ON notes(application_id);

CREATE INDEX IF NOT EXISTS idx_notes_created_at
ON notes(created_at);
