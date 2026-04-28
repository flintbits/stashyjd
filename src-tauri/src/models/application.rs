use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Application {
    pub id: i64,
    pub public_id: String,

    pub company_name: String,
    pub role_title: String,
    pub department: Option<String>,
    pub location: Option<String>,
    pub job_url: Option<String>,

    pub stage: String,
    pub priority: i32,

    pub source: Option<String>,
    pub salary_min: Option<i64>,
    pub salary_max: Option<i64>,
    pub currency: String,

    pub applied_at: Option<String>,
    pub deadline_at: Option<String>,

    pub notes: Option<String>,

    pub resume_id: Option<i64>,
    pub cover_letter_id: Option<i64>,

    pub archived: i32,

    pub created_at: String,
    pub updated_at: String,
}
