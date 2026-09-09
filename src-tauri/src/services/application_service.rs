use sqlx::SqlitePool;

use crate::{
    errors::app_error::AppError,
    models::application::{ApplicationRecord, CreateApplicationRequest},
    repositories::application_repository,
    utils::common::generate_public_id,
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

    let public_id = generate_public_id();

    match application_repository::create_application(db, public_id, application_data).await {
        Ok(_) => Ok(()),

        Err(sqlx::Error::Database(db_err))
            if db_err.message().contains("UNIQUE constraint failed") =>
        {
            Err(AppError::Conflict("Application already exists".into()))
        }

        Err(error) => Err(AppError::Database(error)),
    }
}

pub async fn fetch_applications(db: &SqlitePool) -> Result<Vec<ApplicationRecord>, AppError> {
    let applications = application_repository::fetch_all_applications(db).await?;

    Ok(applications)
}
