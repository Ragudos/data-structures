#[cfg(test)]
mod tests {
    mod data_structures;
    use data_structures::queue::{ Queue, new_queue };

    #[test]
    fn queue() {
        let mut queue: Queue<String> = new_queue();

        assert_eq!(queue.peek(), None);

        queue.enqueue(String::from("Hello, World!"));

        assert_eq!(queue.peek(), Some(String::from("Hello, World!")).as_ref());
        assert_eq!(queue.dequeue(), Some(String::from("Hello, World!")));

        assert_eq!(queue.peek(), None);

        queue.enqueue(String::from("a"));
        queue.enqueue(String::from("b"));
        queue.enqueue(String::from("c"));

        assert_eq!(queue.length, 3);
        assert_eq!(queue.data, Vec::from([
            String::from("a"),
            String::from("b"),
            String::from("c")
        ]));
    }
}
