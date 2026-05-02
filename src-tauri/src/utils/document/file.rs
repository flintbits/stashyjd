use sha2::{Digest, Sha256};
use tokio::fs;

pub async fn compute_file_data(path: &std::path::Path) -> Result<(String, u64), std::io::Error> {
    let bytes = fs::read(path).await?;

    println!("File size read: {}", bytes.len());

    let mut hasher = Sha256::new();
    hasher.update(&bytes);

    let hash = format!("{:x}", hasher.finalize());
    let size = bytes.len() as u64;

    Ok((hash, size))
}

pub fn extract_file_name(path: &str) -> String {
    std::path::Path::new(path)
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("")
        .to_string()
}
