use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateApplicationRequest {
    pub company_name: String,
    pub role_title: String,
    pub location: Option<String>,
    pub work_type: Option<String>,
    pub employment_type: Option<String>,
    pub job_url: Option<String>,
    pub status: Option<String>,
    pub applied_at: Option<String>,
    pub deadline_at: Option<String>,
    pub job_description: Option<String>,
    pub resume_document_id: String,
    pub cover_letter_document_id: Option<String>,
}

#[derive(Debug, FromRow, Serialize)]
pub struct ApplicationRecord {
    pub public_id: String,
    pub company_name: String,
    pub role_title: String,
    pub location: Option<String>,
    pub work_type: Option<String>,
    pub employment_type: Option<String>,
    pub job_url: Option<String>,
    pub status: Option<String>,
    pub applied_at: Option<String>,
    pub deadline_at: Option<String>,
    pub job_description: Option<String>,
    pub resume_document_id: String,
    pub cover_letter_document_id: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}
