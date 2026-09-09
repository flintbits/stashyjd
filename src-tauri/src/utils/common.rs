pub fn generate_public_id() -> String {
    uuid::Uuid::new_v4().to_string()
}
