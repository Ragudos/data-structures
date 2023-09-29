use std::default::Default;

#[derive(Default)]
#[derive(Debug)]

pub struct Queue<T> {
    pub length: usize,
    pub data: Vec<T>
}

impl<T> Queue<T> {

    pub fn enqueue(&mut self, item: T) {
        self.length += 1;
        self.data.push(item)
    }

    pub fn dequeue(&mut self) -> Option<T> {
        if self.length != 0 {  
            self.length -= 1;
            let item: Option<T> = Some(self.data.remove(0));

            return item;
        }

        None
    }

    pub fn peek(&self) -> Option<&T> {
        return self.data.get(0);
    }
}

pub fn new_queue<T: Default>() -> Queue<T> {
    let queue: Queue<T> = Queue { ..Default::default() };

    queue
}