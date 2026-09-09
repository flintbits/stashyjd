CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    application_id INTEGER NOT NULL,

    title TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'pending',
    priority TEXT NOT NULL DEFAULT 'low',

    due_at DATETIME,
    completed_at DATETIME,

    created_at DATETIME DEFAULT (datetime('now','localtime')),
    updated_at DATETIME DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (application_id)
        REFERENCES applications(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tasks_public_id
ON tasks(public_id);

CREATE INDEX IF NOT EXISTS idx_tasks_application_id
ON tasks(application_id);

CREATE INDEX IF NOT EXISTS idx_tasks_status
ON tasks(status);

CREATE INDEX IF NOT EXISTS idx_tasks_priority
ON tasks(priority);

CREATE INDEX IF NOT EXISTS idx_tasks_due_at
ON tasks(due_at);

CREATE INDEX IF NOT EXISTS idx_tasks_created_at
ON tasks(created_at);