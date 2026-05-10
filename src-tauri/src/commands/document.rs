use tauri::State;

use crate::{
    app_state::AppState, errors::app_error::AppError, models::document::DocumentWithResumeProfile,
    responses::api_response::ApiResponse, utils::document::paths::resolve_path,
};

#[tauri::command]
pub async fn create_document(
    app: tauri::AppHandle,
    state: State<'_, AppState>,
    file_path: String,
    document_type: String,
    original_file_name: String,
) -> Result<ApiResponse<()>, ApiResponse<()>> {
    // Resolve and normalize the file path
    let full_path = match resolve_path(&app, &file_path) {
        Ok(path) => match path.canonicalize() {
            Ok(canonicalized) => canonicalized,

            Err(_) => {
                return Err(ApiResponse::from(AppError::Validation(
                    "Failed to canonicalize path".into(),
                )));
            }
        },

        Err(_) => {
            return Err(ApiResponse::from(AppError::Validation(
                "Failed to resolve path".into(),
            )));
        }
    };

    // Convert PathBuf to String (fail if invalid UTF-8)
    let full_path_str = match full_path.to_str() {
        Some(path) => path.to_string(),

        None => {
            return Err(ApiResponse::from(AppError::Validation(
                "Path contains invalid UTF-8".into(),
            )));
        }
    };

    return crate::services::document_service::create_document(
        &state.db,
        full_path_str,
        document_type,
        original_file_name,
    )
    .await
    .map_err(ApiResponse::from);
}

#[tauri::command]
pub async fn fetch_documents(
    state: State<'_, AppState>,
    doc_type: Option<String>,
) -> Result<ApiResponse<Vec<DocumentWithResumeProfile>>, ApiResponse<Vec<DocumentWithResumeProfile>>>
{
    let db = &state.db;

    crate::services::document_service::fetch_documents(db, doc_type)
        .await
        .map_err(ApiResponse::from)
}
