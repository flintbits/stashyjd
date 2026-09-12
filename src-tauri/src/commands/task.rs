use tauri::State;

use crate::{
    app_state::AppState,
    models::task::{CreateTaskRequest, TaskRecord},
    responses::app_response::AppResponse,
    services::task_service,
};

#[tauri::command]
pub async fn create_task(
    state: State<'_, AppState>,
    request: CreateTaskRequest,
) -> Result<AppResponse<String>, AppResponse<String>> {
    match task_service::create_task(&state.db, request).await {
        Ok(res) => Ok(AppResponse::success(
            "TASK_CREATED",
            "Task created successfully",
            Some(res),
        )),

        Err(error) => Err(error.into()),
    }
}

#[tauri::command]
pub async fn get_tasks(
    state: State<'_, AppState>,
    application_id: Option<String>,
) -> Result<AppResponse<Vec<TaskRecord>>, String> {
    match task_service::get_tasks(&state.db, application_id).await {
        Ok(tasks) => Ok(AppResponse::success(
            "TASK_FETCHED",
            "Tasks fetched successfully",
            Some(tasks),
        )),

        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn set_task_completed(
    state: State<'_, AppState>,
    task_id: String,
    completed: bool,
) -> Result<AppResponse<Vec<TaskRecord>>, String> {
    match task_service::set_task_completed(&state.db, task_id, completed).await {
        Ok(task) => Ok(AppResponse::success(
            "TASK_UPDATED",
            "Task completion updated",
            Some(task),
        )),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
pub async fn delete_task(
    state: State<'_, AppState>,
    task_id: String,
) -> Result<AppResponse<()>, AppResponse<()>> {
    match task_service::delete_task(&state.db, task_id).await {
        Ok(()) => Ok(AppResponse::success(
            "TASK_DELETED",
            "Task deleted successfully",
            None,
        )),
        Err(error) => Err(error.into()),
    }
}
