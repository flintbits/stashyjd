use sqlx::SqlitePool;

pub async fn apply(pool: &SqlitePool) {
    sqlx::query("PRAGMA journal_mode=WAL;")
        .execute(pool)
        .await
        .unwrap();

    sqlx::query("PRAGMA foreign_keys=ON;")
        .execute(pool)
        .await
        .unwrap();

    sqlx::query("PRAGMA synchronous = NORMAL;")
        .execute(pool)
        .await
        .unwrap();
}
