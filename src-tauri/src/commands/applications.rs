use tauri::State;

use crate::{
    app_state::AppState,
    models::application::{ApplicationRecord, CreateApplicationRequest},
    responses::api_response::ApiResponse,
    services::application_service,
};
#[tauri::command]
pub async fn create_application(
    application_data: CreateApplicationRequest,
    state: State<'_, AppState>,
) -> Result<ApiResponse<()>, ApiResponse<()>> {
    application_service::create_application(&state.db, application_data)
        .await
        .map_err(ApiResponse::from)?;

    Ok(ApiResponse::success(
        "Application created successfully",
        None,
    ))
}

#[tauri::command]
pub async fn fetch_applications(
    state: State<'_, AppState>,
) -> Result<ApiResponse<Vec<ApplicationRecord>>, ApiResponse<Vec<ApplicationRecord>>> {
    let db = &state.db;

    crate::services::application_service::fetch_applications(db)
        .await
        .map_err(ApiResponse::from)
}
