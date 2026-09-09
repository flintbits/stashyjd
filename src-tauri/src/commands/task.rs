use sqlx::SqlitePool;
use tauri::State;

use crate::{
    models::task::CreateTaskRequest, responses::app_response::AppResponse, services::task_service,
};

#[tauri::command]
pub async fn create_task(
    db: State<'_, SqlitePool>,
    request: CreateTaskRequest,
) -> Result<AppResponse<String>, AppResponse<String>> {
    match task_service::create_task(&db, request).await {
        Ok(res) => Ok(AppResponse::success(
            "TASK_CREATED",
            "Task created successfully",
            Some(res),
        )),

        Err(error) => Ok(error.into()),
    }
}
