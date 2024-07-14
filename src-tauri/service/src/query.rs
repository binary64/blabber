use ::entities::{note, note::Entity as Note};
use sea_orm::*;

pub struct Query;

impl Query {
    pub async fn find_note_by_id(db: &DbConn, id: i32) -> Result<Option<note::Model>, DbErr> {
        Note::find_by_id(id).one(db).await
    }

    /// If ok, returns (post models, num pages).
    pub async fn find_notes_in_page(
        db: &DbConn,
        page: u64,
        posts_per_page: u64,
    ) -> Result<(Vec<note::Model>, u64), DbErr> {
        // Setup paginator
        let paginator = Note::find()
            .order_by_asc(note::Column::Id)
            .paginate(db, posts_per_page);
        let num_pages = paginator.num_pages().await?;

        // Fetch paginated posts
        paginator.fetch_page(page - 1).await.map(|p| (p, num_pages))
    }
}
