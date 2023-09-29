class Queue<T> {
  public data: T[];
  public length: number;

  constructor() {
    this.data = [];
    this.length = 0;
  }

  add(item: T) {
    this.length += 1;
    this.data.push(item);
  }

  remove() {
    if (this.length === 0) {
      return undefined;
    }
    this.length -= 1;
    return this.data.shift();
  }

  peek() {
    return this.data[0];
  }

  last() {
    return this.data[this.length - 1];
  }
}