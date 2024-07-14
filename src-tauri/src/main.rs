use entities::note;
use migration::{Migrator, MigratorTrait};
use serde::{Deserialize, Serialize};
use service::{
    sea_orm::{Database, DatabaseConnection},
    Mutation as MutationCore, Query as QueryCore,
};
use std::env;
use std::fs;
use tauri::generate_handler;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let home_dir = match tauri::api::path::home_dir() {
        Some(val) => val,
        None => panic!("Could not get home directory"),
    };
    let data_dir = home_dir.join(".blabber/data");
    if let Err(_) = fs::metadata(&data_dir) {
        fs::create_dir_all(&data_dir).expect("Could not create data directory");
    }

    let db_url = "sqlite://".to_string() + data_dir.to_str().unwrap() + "/db.sqlite?mode=rwc";

    let conn = Database::connect(db_url)
        .await
        .expect("Database connection failed");
    Migrator::up(&conn, None).await.unwrap();

    let state = AppState { conn };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(generate_handler![graphql_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn create_note(
    state: tauri::State<'_, AppState>,
    form: note::Model,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MutationCore::create_note(&state.conn, form)
        .await
        .expect("could not insert note");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "Post succcessfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn graphql_request(state: tauri::State<'_, AppState>, query: String) -> Result<String, ()> {
    //print debug message
    println!("GraphQL query: {:?}", query);
    Ok(
        "{ \"data\": { \"notes\": [ { \"id\": \"123\", \"text\": \"Hello from Rust\" } ] } }"
            .to_string(),
    )
}

#[tauri::command]
async fn list_notes(
    state: tauri::State<'_, AppState>,
    params: Params,
) -> Result<Vec<note::Model>, ()> {
    let page = params.page.unwrap_or(1);
    let posts_per_page = params.posts_per_page.unwrap_or(500000);

    {
        let (posts, num_pages) = QueryCore::find_notes_in_page(&state.conn, page, posts_per_page)
            .await
            .expect("Cannot find notes in page");
    }

    // time function - start
    let start = std::time::Instant::now();

    let (posts, num_pages) = QueryCore::find_notes_in_page(&state.conn, page, posts_per_page)
        .await
        .expect("Cannot find notes in page");

    // time function - end
    let elapsed = start.elapsed();
    println!(
        "Time elapsed: {:?} {:?} {:?}",
        elapsed, page, posts_per_page
    );

    Ok(posts)
}

#[derive(Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct FlashData {
    kind: String,
    message: String,
}

#[derive(Deserialize)]
struct Params {
    page: Option<u64>,
    posts_per_page: Option<u64>,
}
