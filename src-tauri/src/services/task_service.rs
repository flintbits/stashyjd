use crate::{
    errors::app_error::AppError,
    models::task::CreateTaskRequest,
    repositories::{application_repository, task_repository},
    utils::common::generate_public_id,
};

pub async fn create_task(
    db: &sqlx::SqlitePool,
    request: CreateTaskRequest,
) -> Result<String, AppError> {
    // Validate request
    if request.title.trim().is_empty() {
        return Err(AppError::Validation("Task title cannot be empty".into()));
    }

    // Verify application exists
    application_repository::find_by_id(db, &request.application_id)
        .await?
        .ok_or_else(|| AppError::NotFound("Application".into()))?;

    // Generate public ID
    let public_id = generate_public_id();

    // Create task
    let task_id = task_repository::create_task(db, public_id, request).await?;

    Ok(task_id.to_string())
}
