use sqlx::{
    sqlite::{SqliteConnectOptions, SqlitePoolOptions},
    SqlitePool,
};
use std::fs;
use tauri::Manager;

pub async fn create_pool(app: &tauri::AppHandle) -> SqlitePool {
    let app_dir = app
        .path()
        .app_data_dir()
        .expect("failed to get app data dir");

    fs::create_dir_all(&app_dir).unwrap();

    let db_path = app_dir.join("app.db");

    println!("DB PATH: {:?}", db_path);

    let options = SqliteConnectOptions::new()
        .filename(&db_path)
        .create_if_missing(true);

    let pool = SqlitePoolOptions::new()
        .connect_with(options)
        .await
        .unwrap();

    sqlx::migrate!("./migrations").run(&pool).await.unwrap();

    // for debuggging
    let tables = sqlx::query_scalar::<sqlx::Sqlite, String>(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
    )
    .fetch_all(&pool)
    .await
    .unwrap();

    println!("TABLES: {:?}", tables);

    pool
}
