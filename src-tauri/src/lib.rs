pub mod app_state;
pub mod commands;
pub mod db;
pub mod models;
pub mod repositories;
pub mod services;

use app_state::AppState;
use db::connections::create_pool;
use db::pragmas::apply;

use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            tauri::async_runtime::block_on(async {
                let pool = create_pool(app.handle()).await;

                apply(&pool).await;

                let state = AppState { db: pool };

                app.manage(state);
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::applications::create_application
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

//sqlx migrate add create_users
//$env:DATABASE_URL="sqlite:app.db"
//sqlx migrate run
//sqlx migrate revert
