-- Add down migration script here
DROP INDEX IF EXISTS idx_tasks_application_id;
DROP INDEX IF EXISTS idx_tasks_status;
DROP INDEX IF EXISTS idx_tasks_due_at;

DROP TABLE IF EXISTS tasks;