-- Add down migration script here
DROP INDEX IF EXISTS idx_applications_created_at;
DROP INDEX IF EXISTS idx_applications_archived;
DROP INDEX IF EXISTS idx_applications_priority;
DROP INDEX IF EXISTS idx_applications_company_name;
DROP INDEX IF EXISTS idx_applications_stage;
DROP INDEX IF EXISTS idx_applications_public_id;

DROP TABLE IF EXISTS applications;