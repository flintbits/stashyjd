use serde::Serialize;

use crate::errors::app_error::AppError;

#[derive(Serialize)]
#[serde(rename_all = "lowercase")]
pub enum ApiStatus {
    Success,
    Duplicate,
    Warning,
    Error,
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    pub status: ApiStatus,
    pub message: String,
    pub data: Option<T>,
}

impl<T> ApiResponse<T> {
    pub fn success(message: &str, data: Option<T>) -> Self {
        Self {
            status: ApiStatus::Success,
            message: message.into(),
            data,
        }
    }

    pub fn duplicate(message: &str, data: Option<T>) -> Self {
        Self {
            status: ApiStatus::Duplicate,
            message: message.into(),
            data,
        }
    }

    pub fn warning(message: &str, data: Option<T>) -> Self {
        Self {
            status: ApiStatus::Warning,
            message: message.into(),
            data,
        }
    }

    pub fn error(message: &str, data: Option<T>) -> Self {
        Self {
            status: ApiStatus::Error,
            message: message.into(),
            data,
        }
    }
}

impl<T> From<AppError> for ApiResponse<T> {
    fn from(error: AppError) -> Self {
        match error {
            AppError::DuplicateApplication => {
                ApiResponse::duplicate("Application already exists", None)
            }

            AppError::Validation(message) => ApiResponse::warning(&message, None),

            AppError::NotFound => ApiResponse::warning("Resource not found", None),

            AppError::Unauthorized => ApiResponse::warning("Unauthorized", None),

            AppError::Database(err) => {
                eprintln!("Database error: {:?}", err);

                ApiResponse::error("Database operation failed", None)
            }

            AppError::Internal => ApiResponse::error("Internal server error", None),
        }
    }
}
