use crate::models::application::Application;
use sqlx::query;
use sqlx::query_as;

pub async fn create_application(
    db: &sqlx::SqlitePool,
    public_id: String,
    company_name: String,
    role_title: String,
    location: Option<String>,
    job_url: Option<String>,
) -> Result<(), sqlx::Error> {
    query(
        r#"
        INSERT INTO applications
        (public_id, company_name, role_title, location, job_url)
        VALUES (?, ?, ?, ?, ?)
        "#,
    )
    .bind(public_id)
    .bind(company_name)
    .bind(role_title)
    .bind(location)
    .bind(job_url)
    .execute(db)
    .await?;

    Ok(())
}

pub async fn fetch_all_applications(
    pool: &sqlx::SqlitePool,
) -> Result<Vec<Application>, sqlx::Error> {
    let applications = query_as::<_, Application>(
        r#"
        SELECT
            id,
            public_id,

            company_name,
            role_title,
            department,
            location,
            job_url,

            stage,
            priority,

            source,
            salary_min,
            salary_max,
            currency,

            applied_at,
            deadline_at,

            notes,

            resume_id,
            cover_letter_id,

            archived,

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
