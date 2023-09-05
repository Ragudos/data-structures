
const object = {
  value: 0,
  prev: {} || undefined,
  next: {} || undefined,
};

class LinkedList {
  constructor() {
    this.length = 0;

    this.head = undefined;
    this.tail = undefined;
  }

  getItemAt(idx) {
    let currentNode = this.head;

    for (let i = 0; currentNode && i < idx; ++i) {
      currentNode = currentNode.next;
    }

    return currentNode.value;
  }

  get(item) {
    return this.getNode(item);
  }

  append(item) {
    this.length = this.length + 1;

    const node = { value: item };
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.initialize(item);
    }
  }

  prepend(item) {
    this.length = this.length + 1;

    const node = { value: item };
    if (this.head) {
      node.next = this.head;
      this.head = node;
    } else {
      this.initialize(item);
    }
  }

  insertAt(idx, item) {
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

    const currentNode = this.getPreviousNodeAt(idx);

    const node = { value: item };
    node.next = currentNode.next;
    currentNode.next = node;
  }

  remove(item) {
    let currentNode = this.head;
    let previousNode = undefined;

    for (let idx = 0; currentNode && idx < this.length; ++idx) {
      if (currentNode.value === item) {
        break;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    if (!currentNode) {
      return undefined;
    }

    this.length = this.length - 1;
    previousNode.next = currentNode.next;
    this.tail = previousNode;
    return currentNode;
  }

  removeAt(idx) {
    if (idx > this.length) {
      throw new Error("Cannot remove an item past the list's length. Current length: " + this.length);
    }

    const currentNode = this.getPreviousNodeAt(idx);

    if (!currentNode) {
      return undefined;
    }

    this.length = this.length - 1;
    currentNode.next = currentNode.next.next;
  }

  reverseList() {
    let currentNode = this.head;
    let previousNode = undefined;
    let nextNode = undefined;

    for (let i = 0; i < this.length; ++i) {
      if (!currentNode) {
        break;
      }
      // temporarily store the value of the node the our current node
      // is pointing towards
      nextNode = currentNode.next;
      // point the current node's next noed to the previous node
      currentNode.next = previousNode;
      // previous node is now equal to the current nod
      previousNode = currentNode;
      // now we just change the current node equal to the node
      // that our current node was pointing towards previously
      currentNode = nextNode;
    }

    // now we just swap the tail and the head
    const temp = this.head;
    this.head = previousNode;
    this.tail = temp;
  }

  initialize(item) {
    const node = { value: item };
    this.head = node;
    this.tail = node;
  }

  getPreviousNodeAt(idx) {
    let currentNode = this.head;

    for (let i = 0; currentNode && i < idx - 1; ++i) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  getNode(item) {
    let currentNode = this.head;

    for (let idx = 0; currentNode && idx < this.length; ++idx) {
      if (currentNode.value === item) {
        break;
      }
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}

const list = new LinkedList();

list.append(1);
list.append(2);
list.prepend(3);
list.remove(2);
list.insertAt(1, 10);
list.insertAt(1, 12);
list.removeAt(1);

/** Logs:
 * LinkedList {
    length: 3,
    head: { value: 3, next: { value: 10, next: [Object] } },
    tail: { value: 1, next: undefined }
}
 */
console.log(list);

// returns 3
console.log(list.getItemAt(0));
// returns { value: 1, next: undefined }
console.log(list.get(1));

/** Logs:
 * LinkedList {
  length: 3,
  head: { value: 1, next: { value: 10, next: [Object] } },
  tail: { value: 3, next: undefined }
}
 */
list.reverseList();
console.log(list);

// list = { head: undefined, tail: undefined }