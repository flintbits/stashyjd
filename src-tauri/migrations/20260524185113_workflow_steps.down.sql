-- Add down migration script here
DROP INDEX IF EXISTS idx_workflow_status;

DROP INDEX IF EXISTS idx_workflow_order_index;

DROP INDEX IF EXISTS idx_workflow_application_id;

DROP TABLE IF EXISTS workflow_steps;