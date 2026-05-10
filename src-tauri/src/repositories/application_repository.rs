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
            department,
            location,
            work_type,
            employment_type,
            job_url,
            source,
            status,
            priority,
            salary_max,
            salary_min,
            bonus,
            equity,
            currency,
            applied_at,
            deadline_at,
            notes,
            job_description,
            resume_id,
            cover_letter_id
        )
        VALUES
        (
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?
        );
        "#,
    )
    .bind(public_id)
    .bind(application_data.company_name)
    .bind(application_data.role_title)
    .bind(application_data.department)
    .bind(application_data.location)
    .bind(application_data.work_type)
    .bind(application_data.employment_type)
    .bind(application_data.job_url)
    .bind(application_data.source)
    .bind(application_data.status)
    .bind(application_data.priority)
    .bind(application_data.salary_max)
    .bind(application_data.salary_min)
    .bind(application_data.bonus)
    .bind(application_data.equity)
    .bind(application_data.currency)
    .bind(application_data.applied_at)
    .bind(application_data.deadline_at)
    .bind(application_data.notes)
    .bind(application_data.job_description)
    .bind(application_data.resume_id)
    .bind(application_data.cover_letter_id)
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
            department,
            location,
            work_type,
            employment_type,
            job_url,
            source,
            status,
            priority,
            salary_max,
            salary_min,
            bonus,
            equity,
            currency,
            applied_at,
            deadline_at,
            notes,
            job_description,
            resume_id,
            cover_letter_id,
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
