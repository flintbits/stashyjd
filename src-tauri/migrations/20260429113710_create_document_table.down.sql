-- drop indexes
DROP INDEX IF EXISTS idx_documents_created_at;
DROP INDEX IF EXISTS idx_documents_file_name;
DROP INDEX IF EXISTS idx_documents_type_default;

-- drop table
DROP TABLE IF EXISTS documents;