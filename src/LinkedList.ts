type LinkedListNode<T> = {
  value: T,
  next: LinkedListNode<T> | null | undefined
}

class LinkedList<T> {
  private length: number;
  private tail: LinkedListNode<T> | null | undefined;
  private head: LinkedListNode<T> | null | undefined;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  getItemAt(idx: number): LinkedListNode<T> | null | undefined {
    let currentLinkedListNode = this.head;

    for (let i = 0; currentLinkedListNode && i < idx; ++i) {
      currentLinkedListNode = currentLinkedListNode.next;
    }

    return currentLinkedListNode;
  }


  getItem(item: T): LinkedListNode<T> | null | undefined {
    return this.getLinkedListNode(item);
  }

  append(item: T): void {
    this.length = this.length + 1;

    const node = this.generateLinkedListNode(item);

    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.initialize(item);
    }
  }

  prepend(item: T): void {
    this.length = this.length + 1;

    const node = this.generateLinkedListNode(item);
    if (this.head) {
      node.next = this.head;
      this.head = node;
    } else {
      this.initialize(item);
    }
  }

  insertAt(idx: number, item: T): void {
    if (idx > this.length) {
      throw new Error("We cannot insert past the length of the list. Current length: " + this.length);
    }

    if (idx === 0) {
      this.prepend(item);
      return;
    }

    if (idx === this.length) {
      this.append(item);
      return;
    }

    this.length = this.length + 1;

    const currentLinkedListNode = this.getPreviousLinkedListNodeAt(idx);
    const node = this.generateLinkedListNode(item);
    if (currentLinkedListNode) {
      node.next = currentLinkedListNode.next;
      currentLinkedListNode.next = node;
    }
  }

  remove(item: T): LinkedListNode<T> | null | undefined {
    let currentLinkedListNode = this.head;
    let previousLinkedListNode = undefined;

    if (this.length === 1) {
      this.length = 0;
      this.tail = undefined;
      this.head = undefined;
      return;
    }

    for (let idx = 0; currentLinkedListNode && idx < this.length; ++idx) {
      if (currentLinkedListNode.value === item) {
        break;
      }
      previousLinkedListNode = currentLinkedListNode;
      currentLinkedListNode = currentLinkedListNode.next;
    }

    if (!currentLinkedListNode) {
      return undefined;
    }

    if (previousLinkedListNode) {
      this.length = this.length - 1;
      previousLinkedListNode.next = currentLinkedListNode.next;
      if (!currentLinkedListNode.next) {
        this.tail = previousLinkedListNode;
      }
      return currentLinkedListNode;
    }
  }

  removeAt(idx: number): LinkedListNode<T> | null | undefined {
    if (idx >= this.length) {
      throw new Error("Cannot remove an item past the list's length. Current length: " + this.length);
    }

    if (this.length === 1) {
      this.length = 0;
      this.tail = undefined;
      this.head = undefined;
      return;
    }

    if (idx === 0) {
      this.length = this.length - 1;
      const tmp = this.head;
      this.head = this.head?.next;
      return tmp;
    }

    const previousLinkedListNode = this.getPreviousLinkedListNodeAt(idx);

    if (!previousLinkedListNode) {
      return undefined;
    }
    
    const tmp = previousLinkedListNode.next;
    previousLinkedListNode.next = previousLinkedListNode.next?.next;
    if (idx === this.length - 1) {
      this.tail = previousLinkedListNode;
    }
    this.length = this.length - 1;
    return tmp;
  }

  private initialize(item: T): void {
    const node = this.generateLinkedListNode(item);
    this.head = node;
    this.tail = node;
  }

  private getPreviousLinkedListNodeAt(idx: number): LinkedListNode<T> | null | undefined {
    let currentNode = this.head;

    for (let i = 0; currentNode && i < idx - 1; ++i) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  private generateLinkedListNode(item: T): LinkedListNode<T> {
    return {
      value: item,
      next: undefined
    };
  }

  private getLinkedListNode(item: T): LinkedListNode<T> | null | undefined {
    let currentLinkedListNode = this.head;

    for (let idx = 0; currentLinkedListNode && idx < this.length; ++idx) {
      if (currentLinkedListNode?.value === item) {
        break;
      }
      currentLinkedListNode = currentLinkedListNode?.next;
    }

    return currentLinkedListNode;
  }

}

const list = new LinkedList();

list.append(1);
list.removeAt(0);

console.log(list);
// list.append(2);
// list.append(3);
// list.append(4);
// list.append(5);

// // should remove 3 (2nd index);
// list.removeAt(2);

// console.log(list);
// console.log(" ");
// // Check this console.log (Indeed removed 3);
// console.log(list.getItemAt(0));
// console.log(" ");
// list.prepend(100);
// // 100 should be the new head
// console.log(list.getItemAt(0));