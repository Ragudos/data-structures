mod data_structures;

use data_structures::queue::{new_queue, Queue};
use std::io;

const ESCAPE_TEXT: &str = "Esc";

fn main() {
    let available_data_structures = ["queue"];

    println!("Please enter the name of the data structure you'd like to test out. Type Esc to cancel this program.");

    let mut chosen_data_structure: String = String::new();

    io::stdin()
        .read_line(&mut chosen_data_structure)
        .expect("Failed to read line.");

    chosen_data_structure = chosen_data_structure.trim().to_lowercase();

    for d in available_data_structures {
        if chosen_data_structure == *d {
            run_queue();
            break;
        } else if chosen_data_structure.trim().to_lowercase() != ESCAPE_TEXT.trim().to_lowercase() {
            panic!(
                "Invalid name. Names can only consist of: {:#?}",
                available_data_structures
            );
        } else {
            break;
        }
    }

    println!("Successfully Exited Program.");
}

fn run_queue() {
    let methods: [&str; 4] = ["enqueue", "dequeue", "get_length", "peek"];

    println!("\nWelcome to the Queue data structure tester!");
    println!(
        "What would you like to do? You have these options: {:#?}.\n",
        ..methods
    );

    let mut input: String = get_input().trim().to_lowercase();
    let mut queue: Queue<String> = new_queue();

    while input != ESCAPE_TEXT.trim().to_lowercase() {
        if input == "enqueue" {
            println!("What would you like to input?");
            let data = get_input().trim().to_string();

            if data == ESCAPE_TEXT.trim().to_lowercase() {
                break;
            }

            queue.enqueue(data);

            println!("\n Your new data: {:#?}\n", queue);
            println!(
                "What would you like to do next? You have these options: {:#?}.",
                ..methods
            );
        } else if input == "dequeue" {
            queue.dequeue();

            println!("\n Your new data: {:#?}\n", queue);
            println!(
                "What would you like to do next? You have these options: {:#?}.\n",
                ..methods
            );
        } else if input == "get_length" {
            println!("Data length: {:#?}", queue.length);

            println!(
                "What would you like to do next? You have these options: {:#?}.\n",
                ..methods
            );
        } else if input == "peek" {
            let peek = queue.peek();

            println!("Data at front: {:#?}", peek);
            println!(
                "What would you like to do next? You have these options: {:#?}.\n",
               ..methods
            );
        } else if input != ESCAPE_TEXT.trim().to_lowercase() {
            println!("Invalid method. Try again");
        } else {
            break;
        }

        input = get_input().trim().to_lowercase();
    }
}

fn get_input() -> String {
    let mut input: String = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line.");

    input
}
