-- Add down migration script here
DROP INDEX IF EXISTS idx_activity_event_type;

DROP INDEX IF EXISTS idx_activity_created_at;

DROP INDEX IF EXISTS idx_activity_application_id;

DROP TABLE IF EXISTS activity_events;