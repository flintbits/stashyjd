use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateTaskRequest {
    pub application_id: String,
    pub text: String,
    pub completed: bool,
    pub priority: String,
    pub due_at: String,
}

#[derive(Debug, FromRow, Serialize)]
pub struct TaskRecord {
    pub public_id: String,
    pub application_id: String,
    pub text: String,
    pub completed: bool,
    pub priority: String,
    pub due_at: String,
    pub created_at: String,
}
