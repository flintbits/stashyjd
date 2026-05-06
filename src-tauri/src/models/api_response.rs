use serde::Serialize;

#[derive(Serialize)]
pub struct ApiResponse<T> {
    pub status: String,
    pub message: String,
    pub data: Option<T>,
}

impl<T> ApiResponse<T> {
    pub fn success(message: &str, data: Option<T>) -> Self {
        Self {
            status: "success".into(),
            message: message.into(),
            data,
        }
    }

    pub fn duplicate(message: &str, data: Option<T>) -> Self {
        Self {
            status: "duplicate".into(),
            message: message.into(),
            data,
        }
    }

    pub fn warning(message: &str, data: Option<T>) -> Self {
        Self {
            status: "warning".into(),
            message: message.into(),
            data,
        }
    }
}
