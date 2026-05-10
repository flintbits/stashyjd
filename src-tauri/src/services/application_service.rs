use sqlx::SqlitePool;

use crate::{
    errors::app_error::AppError,
    models::application::{ApplicationRecord, CreateApplicationRequest},
    repositories::application_repository,
    responses::api_response::ApiResponse,
};

pub async fn create_application(
    db: &SqlitePool,
    application_data: CreateApplicationRequest,
) -> Result<(), AppError> {
    // Validation
    if application_data.company_name.trim().is_empty() {
        return Err(AppError::Validation("Company name is required".into()));
    }

    if application_data.role_title.trim().is_empty() {
        return Err(AppError::Validation("Role title is required".into()));
    }

    let public_id = uuid::Uuid::new_v4().to_string();

    let result = application_repository::create_application(db, public_id, application_data).await;

    match result {
        Ok(_) => Ok(()),

        Err(sqlx::Error::Database(db_err)) => {
            // SQLite UNIQUE constraint
            if db_err.message().contains("UNIQUE constraint failed") {
                return Err(AppError::DuplicateApplication);
            }

            Err(AppError::Database(sqlx::Error::Database(db_err)))
        }

        Err(e) => Err(AppError::Database(e)),
    }
}

pub async fn fetch_applications(
    db: &SqlitePool,
) -> Result<ApiResponse<Vec<ApplicationRecord>>, AppError> {
    let applications = application_repository::fetch_all_applications(db).await?;

    if applications.is_empty() {
        return Ok(ApiResponse::warning("No documents found", None));
    }

    Ok(ApiResponse::success(
        "Applications fetched successfully",
        Some(applications),
    ))
}
