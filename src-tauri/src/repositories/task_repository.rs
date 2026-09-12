use crate::models::task::{CreateTaskRequest, TaskRecord};

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
                text,
                completed,
                priority,
                due_at
            )
            VALUES (?, ?, ?, ?, ?, ?);
        "#,
    )
    .bind(public_id)
    .bind(task_data.application_id)
    .bind(task_data.text)
    .bind(task_data.completed)
    .bind(task_data.priority)
    .bind(task_data.due_at)
    .execute(db)
    .await?;

    Ok(result.last_insert_rowid().to_string())
}

pub async fn find_by_application_id(
    pool: &sqlx::SqlitePool,
    application_id: String,
) -> Result<Vec<TaskRecord>, sqlx::Error> {
    let tasks = query_as::<_, TaskRecord>(
        r#"
        SELECT
            public_id,
            application_id,
            text,
            completed,
            priority,
            due_at,
            created_at
        FROM tasks
        WHERE application_id = ?
        ORDER BY created_at DESC
        "#,
    )
    .bind(application_id)
    .fetch_all(pool)
    .await?;

    Ok(tasks)
}

pub async fn find_all(pool: &sqlx::SqlitePool) -> Result<Vec<TaskRecord>, sqlx::Error> {
    let tasks = query_as::<_, TaskRecord>(
        r#"
        SELECT *
        FROM tasks
        ORDER BY created_at DESC
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(tasks)
}

pub async fn update_task_completed(
    pool: &sqlx::SqlitePool,
    task_id: String,
    completed: bool,
) -> Result<Vec<TaskRecord>, sqlx::Error> {
    let tasks = query_as::<_, TaskRecord>(
        r#"
        UPDATE tasks
        SET completed = ?
        WHERE public_id = ?
        RETURNING
            public_id,
            application_id,
            text,
            completed,
            priority,
            due_at,
            created_at
        "#,
    )
    .bind(completed)
    .bind(task_id)
    .fetch_all(pool)
    .await?;

    Ok(tasks)
}

pub async fn delete_task(pool: &sqlx::SqlitePool, task_id: String) -> Result<bool, sqlx::Error> {
    let result = sqlx::query(
        r#"
        DELETE FROM tasks
        WHERE public_id = ?
        "#,
    )
    .bind(task_id)
    .execute(pool)
    .await?;

    Ok(result.rows_affected() > 0)
}
