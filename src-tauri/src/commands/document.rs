use tauri::State;

use crate::{
    app_state::AppState,
    models::{api_response::ApiResponse, document::DocumentWithResumeProfile},
    utils::document::paths::resolve_path,
};

#[tauri::command]
pub async fn create_document(
    app: tauri::AppHandle,
    state: State<'_, AppState>,
    file_path: String,
    document_type: String,
    original_file_name: String,
) -> Result<ApiResponse<()>, String> {
    println!("Triggered");
    // Resolve and normalize the file path
    let full_path = resolve_path(&app, &file_path)
        .map_err(|e| format!("Failed to resolve path: {}", e))?
        .canonicalize()
        .map_err(|e| format!("Failed to canonicalize path: {}", e))?;

    // Convert PathBuf to String (fail if invalid UTF-8)
    let full_path_str = full_path
        .to_str()
        .ok_or("Path contains invalid UTF-8".to_string())?
        .to_string();

    // Call service layer to process and store document
    crate::services::document_service::create_document(
        &state.db,
        full_path_str,
        document_type,
        original_file_name,
    )
    .await
    .map_err(|e| format!("Failed to create document: {}", e))
}

#[tauri::command]
pub async fn fetch_documents(
    state: State<'_, AppState>,
) -> Result<ApiResponse<Vec<DocumentWithResumeProfile>>, String> {
    let db = &state.db;

    let response = crate::services::document_service::fetch_documents(db).await?;

    Ok(response)
}
