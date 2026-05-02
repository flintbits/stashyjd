use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::Read;
use zip::ZipArchive;

pub fn extract_text(file_path: &str, mime_type: &str) -> String {
    match mime_type {
        "application/pdf" => pdf_extract::extract_text(file_path).unwrap_or_default(),
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => {
            extract_docx_text(file_path)
        }
        "text/plain" => std::fs::read_to_string(file_path).unwrap_or_default(),

        _ => "".to_string(),
    }
}

fn extract_docx_text(path: &str) -> String {
    let file = match File::open(path) {
        Ok(f) => f,
        Err(_) => return "".to_string(),
    };

    let mut archive = match ZipArchive::new(file) {
        Ok(a) => a,
        Err(_) => return "".to_string(),
    };

    let mut xml = String::new();

    if let Ok(mut doc) = archive.by_name("word/document.xml") {
        let _ = doc.read_to_string(&mut xml);
    }

    xml.replace("<w:t>", "").replace("</w:t>", " ")
}

pub fn normalize_text(text: &str) -> String {
    text.to_lowercase()
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
}

pub fn compute_text_hash(text: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(text.as_bytes());
    format!("{:x}", hasher.finalize())
}
