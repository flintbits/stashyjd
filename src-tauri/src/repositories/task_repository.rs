use crate::models::task::CreateTaskRequest;
use sqlx::query;
use sqlx::query_as;

pub async fn create_task(
    db: &sqlx::SqlitePool,
    public_id: String,
    task_data: CreateTaskRequest,
) -> Result<String, sqlx::Error> {
    let result = sqlx::query(
        r#"
            INSERT INTO tasks (
                public_id,
                application_id,
                title,
                status,
                priority,
                due_at
            )
            VALUES (?, ?, ?, ?, ?, ?);
        "#,
    )
    .bind(public_id)
    .bind(task_data.application_id)
    .bind(task_data.title)
    .bind(task_data.status)
    .bind(task_data.priority)
    .bind(task_data.due_at)
    .execute(db)
    .await?;

    Ok(result.last_insert_rowid().to_string())
}
