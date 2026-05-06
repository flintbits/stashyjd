use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Document {
    pub id: i64,
    pub public_id: String,

    pub document_type: String,

    pub stored_file_name: String,
    pub original_file_name: String,
    pub file_path: String,

    pub version: Option<String>,
    pub is_default: bool,

    pub file_size: i64,
    pub mime_type: String,

    pub raw_text: Option<String>,

    pub file_hash: String,
    pub text_hash: String,

    pub created_at: String,
    pub updated_at: String,
}

//for document insert
#[derive(Debug)]
pub struct NewDocument {
    pub public_id: String,
    pub document_type: String,
    pub stored_file_name: String,
    pub original_file_name: String,
    pub file_path: String,
    pub version: Option<String>,
    pub is_default: bool,
    pub file_size: i64,
    pub mime_type: String,
    pub raw_text: Option<String>,
    pub file_hash: String,
    pub text_hash: String,
}

#[derive(Serialize)]
pub struct DocumentResponse {
    pub file_name: String,
}

//TODO: add resume profile fields
#[derive(Debug, FromRow, Serialize)]
pub struct DocumentWithResumeProfile {
    pub public_id: String,
    pub document_type: String,
    pub stored_file_name: String,
    pub original_file_name: String,
    pub file_path: String,
    pub version: Option<String>,
    pub file_size: i64,
    pub mime_type: String,
    pub updated_at: String,
}
