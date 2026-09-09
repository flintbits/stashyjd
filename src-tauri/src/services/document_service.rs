use crate::errors::app_error::AppError;
use crate::models::document::{DocumentWithResumeProfile, NewDocument};
use crate::repositories::document_repository;
use crate::utils;
use crate::utils::common::generate_public_id;
use crate::utils::document::file::extract_file_name;
use crate::utils::document::processor::process_document;
use sqlx::SqlitePool;
use std::path::Path;

pub async fn create_document(
    db: &SqlitePool,
    file_path: String,
    document_type: String,
    original_file_name: String,
) -> Result<(), AppError> {
    // Compute file hash and size
    let (file_hash, file_size_u64) =
        utils::document::file::compute_file_data(Path::new(&file_path))
            .await
            .map_err(|_| AppError::Validation("Failed to compute metadata".into()))?;

    //convert file size from u64 to i64
    let file_size = i64::try_from(file_size_u64)
        .map_err(|_| AppError::Validation("File size exceeds supported range".into()))?;

    // Detect MIME type from file path
    let mime_type = mime_guess::from_path(&file_path)
        .first_or_octet_stream()
        .to_string();

    // Process document (extract text, compute text hash, etc.)
    let file_path_clone = file_path.clone();
    let mime_type_clone = mime_type.clone();

    let processed =
        tokio::task::spawn_blocking(move || process_document(&file_path_clone, &mime_type_clone))
            .await
            .map_err(|_| AppError::Validation("Processing task failed".into()))?
            .map_err(|_| AppError::Validation("Failed to process document".into()))?;

    // Check for duplicate document using text hash
    // Check for exact duplicate document
    if let Some(existing_doc) =
        document_repository::find_exact_duplicate(db, &file_hash, &processed.text_hash).await?
    {
        println!("DUPLICATE FOUND");

        document_repository::touch_document(db, &existing_doc.public_id).await?;

        return Ok(());
    }

    // Build document model for insertion
    let doc = NewDocument {
        public_id: generate_public_id(),
        document_type,
        stored_file_name: extract_file_name(&file_path),
        original_file_name,
        file_path,
        version: None,
        is_default: false,
        file_size,
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

        Err(sqlx::Error::Database(db_err))
            if db_err.message().contains("UNIQUE constraint failed") =>
        {
            return Err(AppError::Conflict("Document already exists".into()));
        }

        Err(error) => {
            return Err(AppError::Database(error));
        }
    }

    // Return success response
    Ok(())
}

pub async fn fetch_documents(
    db: &SqlitePool,
    doc_type: Option<String>,
) -> Result<Vec<DocumentWithResumeProfile>, AppError> {
    let documents =
        document_repository::fetch_all_document_with_resume_profile(db, doc_type).await?;

    Ok(documents)
}
