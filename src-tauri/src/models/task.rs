use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateTaskRequest {
    pub application_id: String,
    pub title: String,
    pub status: String,
    pub priority: String,
    pub due_at: String,
}

pub struct TaskRecord {
    pub application_id: String,
    pub title: String,
    pub status: String,
    pub priority: String,
    pub due_at: String,
}
