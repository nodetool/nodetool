#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Arc;

use nodetool_sdk::{node::NodeDescriptor, node_graph::NodeGraph};
use parking_lot::Mutex;

struct NodetoolState(NodeGraph);

#[tauri::command]
fn query_nodes(state: tauri::State<Arc<Mutex<NodetoolState>>>) -> Vec<NodeDescriptor> {
    vec![NodeDescriptor {
        name: "add".to_string(),
        categories: vec!["math".to_string()],
    }]
}

fn main() {
    tauri::Builder::default()
        .manage(Arc::new(Mutex::new(NodetoolState(NodeGraph::new()))))
        .invoke_handler(tauri::generate_handler![query_nodes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
