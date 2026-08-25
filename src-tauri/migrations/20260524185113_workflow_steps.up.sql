-- Add up migration script here
CREATE TABLE IF NOT EXISTS workflow_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    public_id TEXT NOT NULL UNIQUE,

    application_id TEXT NOT NULL,

    title TEXT NOT NULL,

    type TEXT NOT NULL DEFAULT 'custom', -- custom | default

    status TEXT NOT NULL DEFAULT 'pending', -- pending | current | completed | skipped

    order_index INTEGER NOT NULL,

    scheduled_at DATETIME

    started_at DATETIME,
    completed_at DATETIME,

    created_at DATETIME DEFAULT (datetime('now','localtime')),
    updated_at DATETIME DEFAULT (datetime('now','localtime')),

    FOREIGN KEY (application_id)
        REFERENCES applications(public_id)
        ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_workflow_application_id
ON workflow_steps(application_id);

CREATE INDEX IF NOT EXISTS idx_workflow_order_index
ON workflow_steps(order_index);

CREATE INDEX IF NOT EXISTS idx_workflow_status
ON workflow_steps(status);