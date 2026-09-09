use tauri::State;

use crate::{
    app_state::AppState,
    models::application::{ApplicationRecord, CreateApplicationRequest},
    responses::app_response::AppResponse,
    services::application_service,
};

#[tauri::command]
pub async fn create_application(
    application_data: CreateApplicationRequest,
    state: State<'_, AppState>,
) -> Result<AppResponse<()>, AppResponse<()>> {
    match application_service::create_application(&state.db, application_data).await {
        Ok(_) => Ok(AppResponse::success(
            "APPLICATION_CREATED",
            "Application created successfully",
            None,
        )),

        Err(error) => Ok(error.into()),
    }
}

#[tauri::command]
pub async fn fetch_applications(
    state: State<'_, AppState>,
) -> Result<AppResponse<Vec<ApplicationRecord>>, AppResponse<Vec<ApplicationRecord>>> {
    match application_service::fetch_applications(&state.db).await {
        Ok(applications) => Ok(AppResponse::success(
            "APPLICATIONS_FETCHED",
            "Applications fetched successfully",
            Some(applications),
        )),

        Err(error) => Ok(error.into()),
    }
}
