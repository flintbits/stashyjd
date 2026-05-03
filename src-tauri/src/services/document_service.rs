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
    // Compute file hash and size
    let (file_hash, file_size) = utils::document::file::compute_file_data(Path::new(&file_path))
        .await
        .map_err(|e| format!("Failed to compute metadata: {}", e))?;

    // Detect MIME type from file path
    let mime_type = mime_guess::from_path(&file_path)
        .first_or_octet_stream()
        .to_string();

    // Process document (extract text, compute text hash, etc.)
    // TODO: move to spawn_blocking if CPU-intensive
    let processed = process_document(&file_path, &mime_type).map_err(|e| e.to_string())?;

    // let processed = tokio::task::spawn_blocking(move || process_document(&file_path, &mime_type))
    //     .await
    //     .map_err(|_| "Processing failed")??;

    // // Check for duplicate document using text hash
    if document_repository::exists_by_text_hash(db, &processed.text_hash)
        .await
        .map_err(|e| e.to_string())?
    {
        println!("Duplicate document detected");
        return Ok(ApiResponse::duplicate("Duplicate document detected", None));
    }

    // Build document model for insertion
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

    // Insert document into database
    let insert_result = document_repository::insert_document(db, doc).await;

    // Handle insert result and unique constraint
    match insert_result {
        Ok(_) => {}
        Err(sqlx::Error::Database(e)) if e.is_unique_violation() => {
            return Ok(ApiResponse::duplicate("Duplicate document detected", None));
        }
        Err(e) => {
            return Err(format!("Database error while saving document: {}", e));
        }
    }

    // Return success response
    Ok(ApiResponse::success(
        "Document uploaded and stored successfully",
        None,
    ))
}
