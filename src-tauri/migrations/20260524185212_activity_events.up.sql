-- Add up migration script here
CREATE TABLE IF NOT EXISTS activity_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    public_id TEXT NOT NULL UNIQUE,

    application_id TEXT NOT NULL,

    event_type TEXT NOT NULL,

    entity_type TEXT,
    entity_id TEXT,

    message TEXT NOT NULL,

    metadata TEXT,
    -- JSON string in SQLite

    created_at DATETIME DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (application_id)
        REFERENCES applications(public_id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_activity_application_id
ON activity_events(application_id);

CREATE INDEX IF NOT EXISTS idx_activity_created_at
ON activity_events(created_at);

CREATE INDEX IF NOT EXISTS idx_activity_event_type
ON activity_events(event_type);