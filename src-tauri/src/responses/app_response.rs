use crate::errors::app_error::AppError;
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum AppStatus {
    Success,
    Warning,
    Error,
}

#[derive(Debug, Serialize)]
pub struct AppResponse<T> {
    pub status: AppStatus,
    pub code: String,
    pub message: String,
    pub data: Option<T>,
}

impl<T> AppResponse<T> {
    pub fn success(code: impl Into<String>, message: impl Into<String>, data: Option<T>) -> Self {
        Self {
            status: AppStatus::Success,
            code: code.into(),
            message: message.into(),
            data,
        }
    }

    pub fn warning(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            status: AppStatus::Warning,
            code: code.into(),
            message: message.into(),
            data: None,
        }
    }

    pub fn error(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            status: AppStatus::Error,
            code: code.into(),
            message: message.into(),
            data: None,
        }
    }
}

impl<T> From<AppError> for AppResponse<T> {
    fn from(error: AppError) -> Self {
        match error {
            AppError::Validation(message) => AppResponse::warning("VALIDATION_ERROR", message),

            AppError::NotFound(resource) => {
                AppResponse::warning("RESOURCE_NOT_FOUND", format!("{} not found", resource))
            }

            AppError::Unauthorized => AppResponse::warning("UNAUTHORIZED", "Unauthorized"),

            AppError::Forbidden => AppResponse::warning(
                "FORBIDDEN",
                "You do not have permission to perform this operation",
            ),

            AppError::Conflict(message) => AppResponse::warning("CONFLICT", message),

            AppError::Database(error) => {
                tracing::error!(
                    error = ?error,
                    "Database operation failed"
                );

                AppResponse::error("DATABASE_ERROR", "Database operation failed")
            }

            AppError::Internal => AppResponse::error("INTERNAL_ERROR", "Internal server error"),
        }
    }
}
