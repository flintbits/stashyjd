use tauri::{AppHandle, Manager};

pub fn resolve_path(app: &AppHandle, relative_path: &str) -> Result<std::path::PathBuf, String> {
    let base_dir = app
        .path()
        .app_data_dir()
        .map_err(|_| "Failed to get app data dir")?;

    //Prevent path traversal
    if (relative_path).contains("..") {
        return Err("Invalid path".into());
    }

    Ok(base_dir.join(relative_path))
}
