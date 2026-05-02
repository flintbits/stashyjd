use crate::models::api_response::ApiResponse;
use crate::models::document::NewDocument;
use crate::repositories::document_repository;
use crate::utils;
use crate::utils::document::file::extract_file_name;
use crate::utils::document::processor::process_document;
use sqlx::SqlitePool;
use std::path::Path;
use uuid::Uuid;

pub async fn create_document(
    db: &SqlitePool,
    file_path: String,
    document_type: String,
) -> Result<ApiResponse<()>, String> {
    // Compute file data
    let (file_hash, file_size) = utils::document::file::compute_file_data(Path::new(&file_path))
        .await
        .map_err(|_| "Failed to read file or compute metadata".to_string())?;

    // Detect mime
    let mime_type = mime_guess::from_path(&file_path)
        .first_or_octet_stream()
        .to_string();

    //TODO: Async processing
    let processed = process_document(&file_path, &mime_type).map_err(|e| e.to_string())?;

    // dedup check before insert
    if document_repository::exists_by_text_hash(db, &processed.text_hash)
        .await
        .map_err(|e| e.to_string())?
    {
        println!("Duplicate document detected");
        return Ok(ApiResponse::duplicate("Duplicate document detected", None));
    }

    // Build domain model
    let doc = NewDocument {
        public_id: Uuid::new_v4().to_string(),
        document_type,
        file_name: extract_file_name(&file_path),
        file_path,
        version: None,
        is_default: false,
        file_size: file_size.to_string(),
        mime_type,
        raw_text: Some(processed.raw_text),
        file_hash,
        text_hash: processed.text_hash,
    };

    // Call repository
    document_repository::create_document(db, doc)
        .await
        .map_err(|e| format!("Database error while saving document: {}", e))?;

    Ok(ApiResponse::success(
        "Document uploaded and stored successfully",
        None,
    ))
}
