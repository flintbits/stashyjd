use sqlx::{
    sqlite::{SqliteConnectOptions, SqlitePoolOptions},
    SqlitePool,
};
use std::fs;
use tauri::Manager;

use crate::db::pragmas::apply;

pub async fn initialize(app: &tauri::AppHandle) -> SqlitePool {
    let app_dir = app
        .path()
        .app_data_dir()
        .expect("failed to get app data dir");

    fs::create_dir_all(&app_dir).expect("failed to create app data directory");

    //TODO: Support custom path
    let db_path = app_dir.join("app.db");

    println!("DB PATH: {:?}", db_path);

    let options = SqliteConnectOptions::new()
        .filename(&db_path)
        .create_if_missing(true);

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await
        .expect("failed to connect to database");

    apply(&pool).await;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("failed to run migrations");

    pool
}
