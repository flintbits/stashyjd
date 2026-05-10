use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Application {
    pub id: i64,
    pub public_id: String,

    pub company_name: String,
    pub role_title: String,

    pub department: Option<String>,
    pub location: Option<String>,

    pub work_type: Option<String>,
    pub employment_type: Option<String>,

    pub job_url: Option<String>,
    pub source: Option<String>,

    pub status: String,
    pub priority: String,

    pub salary_min: Option<i64>,
    pub salary_max: Option<i64>,
    pub bonus: Option<i64>,
    pub equity: Option<i64>,

    pub currency: String,

    pub applied_at: Option<String>,
    pub deadline_at: Option<String>,

    pub notes: Option<String>,
    pub job_description: Option<String>,

    pub resume_id: Option<i64>,
    pub cover_letter_id: Option<i64>,

    pub archived: bool,

    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateApplicationRequest {
    pub company_name: String,
    pub role_title: String,
    pub department: Option<String>,
    pub location: Option<String>,
    pub work_type: Option<String>,
    pub employment_type: Option<String>,
    pub job_url: Option<String>,
    pub source: Option<String>,
    pub status: Option<String>,
    pub priority: Option<String>,
    pub salary_min: Option<i64>,
    pub salary_max: Option<i64>,
    pub bonus: Option<i64>,
    pub equity: Option<i64>,
    pub currency: Option<String>,
    pub applied_at: Option<String>,
    pub deadline_at: Option<String>,
    pub notes: Option<String>,
    pub job_description: Option<String>,
    pub resume_id: Option<i64>,
    pub cover_letter_id: Option<i64>,
}

#[derive(Debug, FromRow, Serialize)]
pub struct ApplicationRecord {
    pub public_id: String,
    pub company_name: String,
    pub role_title: String,
    pub department: Option<String>,
    pub location: Option<String>,
    pub work_type: Option<String>,
    pub employment_type: Option<String>,
    pub job_url: Option<String>,
    pub source: Option<String>,
    pub status: Option<String>,
    pub priority: Option<String>,
    pub salary_min: Option<i64>,
    pub salary_max: Option<i64>,
    pub bonus: Option<i64>,
    pub equity: Option<i64>,
    pub currency: Option<String>,
    pub applied_at: Option<String>,
    pub deadline_at: Option<String>,
    pub notes: Option<String>,
    pub job_description: Option<String>,
    pub resume_id: Option<i64>,
    pub cover_letter_id: Option<i64>,
    pub created_at: String,
    pub updated_at: String,
}
