use crate::models::application::ApplicationRecord;
use crate::models::application::CreateApplicationRequest;
use sqlx::query;
use sqlx::query_as;

pub async fn create_application(
    db: &sqlx::SqlitePool,
    public_id: String,
    application_data: CreateApplicationRequest,
) -> Result<(), sqlx::Error> {
    query(
        r#"
        INSERT INTO applications
        (
            public_id,
            company_name,
            role_title,
            location,
            work_type,
            employment_type,
            job_url,
            status,
            applied_at,
            deadline_at,
            job_description,
            resume_document_id,
            cover_letter_document_id
        )
        VALUES
        (
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?
        );
        "#,
    )
    .bind(public_id)
    .bind(application_data.company_name)
    .bind(application_data.role_title)
    .bind(application_data.location)
    .bind(application_data.work_type)
    .bind(application_data.employment_type)
    .bind(application_data.job_url)
    .bind(application_data.status)
    .bind(application_data.applied_at)
    .bind(application_data.deadline_at)
    .bind(application_data.job_description)
    .bind(application_data.resume_document_id)
    .bind(application_data.cover_letter_document_id)
    .execute(db)
    .await?;

    Ok(())
}

pub async fn fetch_all_applications(
    pool: &sqlx::SqlitePool,
) -> Result<Vec<ApplicationRecord>, sqlx::Error> {
    let applications = query_as::<_, ApplicationRecord>(
        r#"
        SELECT
            public_id,
            company_name,
            role_title,
            location,
            work_type,
            employment_type,
            job_url,
            status,
            applied_at,
            deadline_at,
            job_description,
            resume_document_id,
            cover_letter_document_id,
            created_at,
            updated_at
        FROM applications
        WHERE archived = 0
        ORDER BY created_at DESC
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(applications)
}

pub async fn find_by_id(
    db: &sqlx::SqlitePool,
    public_id: &str,
) -> Result<Option<String>, sqlx::Error> {
    sqlx::query_scalar(
        r#"
        SELECT public_id
        FROM applications
        WHERE public_id = ?
        "#,
    )
    .bind(public_id)
    .fetch_optional(db)
    .await
}
