use crate::models::document::NewDocument;

pub async fn create_document(db: &sqlx::SqlitePool, doc: NewDocument) -> Result<(), sqlx::Error> {
    let result = sqlx::query(
        r#"
        INSERT INTO documents (
            public_id, document_type, file_name, file_path,
            version, is_default, file_size, mime_type,
            raw_text, file_hash, text_hash
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        "#,
    )
    .bind(doc.public_id)
    .bind(doc.document_type)
    .bind(doc.file_name)
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

    if result.rows_affected() == 0 {
        return Err(sqlx::Error::RowNotFound);
    }

    Ok(())
}

pub async fn exists_by_text_hash(
    db: &sqlx::SqlitePool,
    text_hash: &str,
) -> Result<bool, sqlx::Error> {
    let rec = sqlx::query_scalar::<_, i64>("SELECT COUNT(1) FROM documents WHERE text_hash = ?")
        .bind(text_hash)
        .fetch_one(db)
        .await?;

    Ok(rec > 0)
}
