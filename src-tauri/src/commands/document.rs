use tauri::State;

use crate::{
    app_state::AppState, models::api_response::ApiResponse, utils::document::paths::resolve_path,
};

#[tauri::command]
pub async fn create_document(
    app: tauri::AppHandle,
    state: State<'_, AppState>,
    file_path: String,
    document_type: String,
) -> Result<ApiResponse<()>, String> {
    let full_path = resolve_path(&app, &file_path).map_err(|_| "Invalid file path".to_string())?;

    crate::services::document_service::create_document(
        &state.db,
        full_path.to_string_lossy().replace("\\", "/"),
        document_type,
    )
    .await
    .map_err(|e| format!("Failed to create document: {}", e))
}
