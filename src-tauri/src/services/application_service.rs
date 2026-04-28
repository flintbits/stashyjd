use crate::repositories::application_repository;

pub async fn create_application(
    db: &sqlx::SqlitePool,
    company_name: String,
    role_title: String,
    location: Option<String>,
    job_url: Option<String>,
) -> Result<(), String> {
    if company_name.trim().is_empty() {
        return Err("Company name required".into());
    }

    let public_id = uuid::Uuid::new_v4().to_string();

    application_repository::create_application(
        db,
        public_id,
        company_name,
        role_title,
        location,
        job_url,
    )
    .await
    .map_err(|e| e.to_string())
}
