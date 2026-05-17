use crate::models::document::{Document, DocumentWithResumeProfile, NewDocument};

pub async fn insert_document(db: &sqlx::SqlitePool, doc: NewDocument) -> Result<(), sqlx::Error> {
    println!("Instering new document");
    let result = sqlx::query(
        r#"
        INSERT INTO documents (
            public_id, document_type, stored_file_name, original_file_name, file_path,
            version, is_default, file_size, mime_type,
            raw_text, file_hash, text_hash
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        "#,
    )
    .bind(doc.public_id)
    .bind(doc.document_type)
    .bind(doc.stored_file_name)
    .bind(doc.original_file_name)
    .bind(doc.file_path)
    .bind(doc.version)
    .bind(if doc.is_default { 1 } else { 0 })
    .bind(doc.file_size)
    .bind(doc.mime_type)
    .bind(doc.raw_text)
    .bind(doc.file_hash)
    .bind(doc.text_hash)
    .execute(db)
    .await?;

    //TODO: poternatially redudant
    if result.rows_affected() == 0 {
        return Err(sqlx::Error::RowNotFound);
    }

    Ok(())
}

// pub async fn exists_by_text_hash(
//     db: &sqlx::SqlitePool,
//     text_hash: &str,
// ) -> Result<bool, sqlx::Error> {
//     let exists =
//         sqlx::query_scalar::<_, i64>("SELECT EXISTS(SELECT 1 FROM documents WHERE text_hash = ?)")
//             .bind(text_hash)
//             .fetch_one(db)
//             .await?;

//     Ok(exists == 1)
// }

pub async fn find_exact_duplicate(
    db: &sqlx::SqlitePool,
    file_hash: &str,
    text_hash: &str,
) -> Result<Option<Document>, sqlx::Error> {
    println!("Searching...");
    println!("file_hash: {}", file_hash);
    println!("text_hash: {}", text_hash);

    sqlx::query_as::<_, Document>(
        r#"
        SELECT *
        FROM documents
        WHERE file_hash = ?
          AND text_hash = ?
        LIMIT 1
        "#,
    )
    .bind(file_hash)
    .bind(text_hash)
    .fetch_optional(db)
    .await
}

pub async fn touch_document(db: &sqlx::SqlitePool, public_id: &str) -> Result<(), sqlx::Error> {
    println!("Toucing document");
    sqlx::query(
        r#"
        UPDATE documents
        SET updated_at = datetime('now','localtime')
        WHERE public_id = ?
        "#,
    )
    .bind(public_id)
    .execute(db)
    .await?;

    Ok(())
}

pub async fn fetch_all_document_with_resume_profile(
    db: &sqlx::SqlitePool,
    doc_type: Option<String>,
) -> Result<Vec<DocumentWithResumeProfile>, sqlx::Error> {
    let documents = sqlx::query_as::<_, DocumentWithResumeProfile>(
        r#"
        SELECT 
            public_id,
            document_type,
            stored_file_name,
            original_file_name,
            file_path,
            version,
            file_size,
            mime_type,
            updated_at
        FROM documents
        WHERE (?1 IS NULL OR ?1 = '' OR document_type = ?1)
        ORDER BY updated_at DESC, id DESC
        "#,
    )
    .bind(doc_type)
    .fetch_all(db)
    .await?;

    Ok(documents)
}
