use sqlx::SqlitePool;

use crate::{
    errors::app_error::AppError,
    models::task::{CreateTaskRequest, TaskRecord},
    repositories::{application_repository, task_repository},
    utils::common::generate_public_id,
};

pub async fn create_task(
    db: &sqlx::SqlitePool,
    request: CreateTaskRequest,
) -> Result<String, AppError> {
    // Validate request
    if request.text.trim().is_empty() {
        return Err(AppError::Validation("Task cannot be empty".into()));
    }

    // Verify application exists
    application_repository::find_by_id(db, &request.application_id)
        .await?
        .ok_or_else(|| AppError::NotFound("Application".into()))?;

    let public_id = generate_public_id();

    let task_id = task_repository::create_task(db, public_id, request).await?;

    Ok(task_id.to_string())
}

pub async fn get_tasks(
    db: &SqlitePool,
    application_id: Option<String>,
) -> Result<Vec<TaskRecord>, AppError> {
    match application_id {
        Some(public_id) => Ok(task_repository::find_by_application_id(db, public_id).await?),
        None => Ok(task_repository::find_all(db).await?),
    }
}

pub async fn set_task_completed(
    db: &SqlitePool,
    task_id: String,
    completed: bool,
) -> Result<Vec<TaskRecord>, AppError> {
    Ok(task_repository::update_task_completed(db, task_id, completed).await?)
}

pub async fn delete_task(db: &SqlitePool, task_id: String) -> Result<(), AppError> {
    if !task_repository::delete_task(db, task_id).await? {
        return Err(AppError::NotFound("Task".into()));
    }

    Ok(())
}
