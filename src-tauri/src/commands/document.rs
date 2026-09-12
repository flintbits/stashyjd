use tauri::State;

use crate::{
    app_state::AppState, models::document::DocumentWithResumeProfile,
    responses::app_response::AppResponse, services::document_service,
    utils::document::paths::resolve_path,
};

#[tauri::command]
pub async fn create_document(
    app: tauri::AppHandle,
    state: State<'_, AppState>,
    file_path: String,
    document_type: String,
    original_file_name: String,
) -> Result<AppResponse<()>, AppResponse<()>> {
    // Resolve and normalize the file path
    let full_path = match resolve_path(&app, &file_path) {
        Ok(path) => match path.canonicalize() {
            Ok(canonicalized) => canonicalized,

            Err(_) => {
                return Ok(AppResponse::from(
                    crate::errors::app_error::AppError::Validation(
                        "Failed to canonicalize path".into(),
                    ),
                ));
            }
        },

        Err(_) => {
            return Ok(AppResponse::from(
                crate::errors::app_error::AppError::Validation("Failed to resolve path".into()),
            ));
        }
    };

    // Convert PathBuf to String (fail if invalid UTF-8)
    let full_path_str = match full_path.to_str() {
        Some(path) => path.to_string(),

        None => {
            return Ok(AppResponse::from(
                crate::errors::app_error::AppError::Validation(
                    "Path contains invalid UTF-8".into(),
                ),
            ));
        }
    };

    match document_service::create_document(
        &state.db,
        full_path_str,
        document_type,
        original_file_name,
    )
    .await
    {
        Ok(_) => Ok(AppResponse::success(
            "DOCUMENT_CREATED",
            "Document uploaded and stored successfully",
            None,
        )),

        Err(error) => Ok(error.into()),
    }
}

#[tauri::command]
pub async fn fetch_documents(
    doc_type: Option<String>,
    state: State<'_, AppState>,
) -> Result<AppResponse<Vec<DocumentWithResumeProfile>>, AppResponse<Vec<DocumentWithResumeProfile>>>
{
    match document_service::fetch_documents(&state.db, doc_type).await {
        Ok(documents) => Ok(AppResponse::success(
            "DOCUMENTS_FETCHED",
            "Documents fetched successfully",
            Some(documents),
        )),

        Err(error) => Err(error.into()),
    }
}
