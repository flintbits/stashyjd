pub mod app_state;
pub mod commands;
pub mod db;
pub mod errors;
pub mod models;
pub mod repositories;
pub mod responses;
pub mod services;
pub mod utils;

use app_state::AppState;
use db::connections::create_pool;
use db::pragmas::apply;

use tauri::Manager;

use tauri_plugin_log::{RotationStrategy, Target, TargetKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    println!("Tauri V2 starting....");
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
        // .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .max_file_size(1_000_000)
                .rotation_strategy(RotationStrategy::KeepOne)
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir {
                        file_name: Some("app".into()),
                    }),
                ])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            greet,
            //applications
            commands::applications::create_application,
            commands::applications::fetch_applications,
            //documents
            commands::document::create_document,
            commands::document::fetch_documents
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

//sqlx migrate add create_users
//$env:DATABASE_URL="sqlite:///C:/Users/Victus/AppData/Roaming/StashyJD/app.db"
//sqlx migrate run
//sqlx migrate revert
