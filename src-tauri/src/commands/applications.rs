use tauri::State;

use crate::{app_state::AppState, services::application_service};

#[tauri::command]
pub async fn create_application(
    company_name: String,
    role_title: String,
    location: Option<String>,
    job_url: Option<String>,
    state: State<'_, AppState>,
) -> Result<(), String> {
    application_service::create_application(&state.db, company_name, role_title, location, job_url)
        .await
}

// #[tauri::command]
// pub async fn fetch_all_applications() -> Result<(), String> {}
