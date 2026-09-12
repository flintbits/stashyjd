CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    application_id TEXT NOT NULL,

    text TEXT NOT NULL,

    completed INTEGER NOT NULL DEFAULT 0,
    priority TEXT NOT NULL DEFAULT 'low',

    due_at DATETIME,
    completed_at DATETIME,

    created_at DATETIME DEFAULT (datetime('now','localtime')),
    updated_at DATETIME DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (application_id)
        REFERENCES applications(public_id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tasks_public_id
ON tasks(public_id);

CREATE INDEX IF NOT EXISTS idx_tasks_application_id
ON tasks(application_id);

CREATE INDEX IF NOT EXISTS idx_tasks_completed
ON tasks(completed);

CREATE INDEX IF NOT EXISTS idx_tasks_priority
ON tasks(priority);

CREATE INDEX IF NOT EXISTS idx_tasks_due_at
ON tasks(due_at);

CREATE INDEX IF NOT EXISTS idx_tasks_created_at
ON tasks(created_at);