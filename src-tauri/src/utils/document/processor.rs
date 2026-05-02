use std::error::Error;

pub struct ProcessedDocument {
    pub raw_text: String,
    pub normalized_text: String,
    pub text_hash: String,
}

pub fn process_document(
    file_path: &str,
    mime_type: &str,
) -> Result<ProcessedDocument, Box<dyn Error>> {
    let raw_text = super::text::extract_text(file_path, mime_type);

    let normalized_text = super::text::normalize_text(&raw_text);

    let text_hash = super::text::compute_text_hash(&normalized_text);

    Ok(ProcessedDocument {
        raw_text,
        normalized_text,
        text_hash,
    })
}
