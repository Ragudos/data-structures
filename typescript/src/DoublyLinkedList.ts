interface DoublyLinkedListNode<T> {
  value: T;
  prev: DoublyLinkedListNode<T> | null | undefined;
  next: DoublyLinkedListNode<T> | null | undefined;
}

class DoublyLinkedList<T> {
  public length: number;
  private head: DoublyLinkedListNode<T> | null | undefined;
  private tail: DoublyLinkedListNode<T> | null | undefined;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  append(item: T): void {
    this.length = this.length + 1;

    const node = this.generateDoublyLinkedListNode(item);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  prepend(item: T): void {
    this.length = this.length + 1;

    const node = this.generateDoublyLinkedListNode(item);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }

  insertAt(idx: number, item: T): void {
    if (idx > this.length) {
      throw new Error(
        "Cannot insert an item on index: " +
          idx +
          ", that is past the list's length - 1. Current length: " +
          this.length,
      );
    }

    const INSERTING_ITEM_BEFORE_HEAD = idx === 0;
    if (INSERTING_ITEM_BEFORE_HEAD) {
      this.prepend(item);
      return;
    }

    const INSERTING_ITEM_AFTER_TAIL = idx === this.length;
    if (INSERTING_ITEM_AFTER_TAIL) {
      this.append(item);
      return;
    }

    this.length = this.length + 1;
    const currentNode = this.generateDoublyLinkedListNode(item);
    const nodeAtIndexToInsertCurrentNode = this.getItemNodeAt(idx);

    if (nodeAtIndexToInsertCurrentNode && nodeAtIndexToInsertCurrentNode.prev) {
      nodeAtIndexToInsertCurrentNode.prev.next = currentNode;
      currentNode.prev = nodeAtIndexToInsertCurrentNode.prev;
      nodeAtIndexToInsertCurrentNode.prev = currentNode;
      currentNode.next = currentNode;
    }
  }

  getItem(item: T, key?: keyof T): DoublyLinkedListNode<T> | null | undefined {
    return this.getItemNode(item, key);
  }

  getItemAt(idx: number): DoublyLinkedListNode<T> | null | undefined {
    if (idx > this.length) {
      throw new Error(
        "Cannot look for an item on index: " +
          idx +
          ", that is past the list's length - 1. Current length: " +
          this.length,
      );
    }
    return this.getItemNodeAt(idx);
  }

  remove(item: T, key?: keyof T): DoublyLinkedListNode<T> | null | undefined {
    const currentNode = this.getItemNode(item, key);

    if (!currentNode) {
      return undefined;
    }

    return this.removeNode(currentNode);
  }

  removeAt(idx: number): DoublyLinkedListNode<T> | null | undefined {
    if (idx > this.length) {
      throw new Error(
        "Cannot look for an item on index: " +
          idx +
          ", that is past the list's length - 1. Current length: " +
          this.length,
      );
    }

    const currentNode = this.getItemNodeAt(idx);

    if (!currentNode) {
      return undefined;
    }

    this.removeNode(currentNode);
  }

  private removeNode(
    currentNode: DoublyLinkedListNode<T>,
  ): DoublyLinkedListNode<T> | null | undefined {
    this.length = this.length - 1;
    const LIST_HAS_A_SINGLE_ITEM = !this.head?.next || !this.tail?.prev;
    if (LIST_HAS_A_SINGLE_ITEM) {
      const tmp = this.head;
      this.head = undefined;
      this.tail = undefined;
      return tmp;
    }

    const ITEM_IS_LIST_HEAD = this.head === currentNode || !currentNode.prev;
    if (ITEM_IS_LIST_HEAD) {
      if (this.head && this.head.next) {
        this.head.next.prev = undefined;
        this.head = this.head.next;
        return;
      }
    }

    const ITEM_IS_LIST_TAIL = this.tail === currentNode || !currentNode.next;
    if (ITEM_IS_LIST_TAIL) {
      if (this.tail && this.tail.prev) {
        this.tail.prev.next = undefined;
        this.tail = this.tail.prev;
        return;
      }
    }

    if (currentNode.prev) {
      currentNode.prev.next = currentNode.next;
      return currentNode;
    }
  }

  private generateDoublyLinkedListNode(item: T): DoublyLinkedListNode<T> {
    return {
      value: item,
      next: undefined,
      prev: undefined,
    };
  }

  private getItemNodeAt(
    idx: number,
  ): DoublyLinkedListNode<T> | null | undefined {
    let currentNode = this.head;

    for (let i = 0; currentNode && i < idx; ++i) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  private getItemNode(item: T, key?: keyof T): DoublyLinkedListNode<T> | null | undefined {
    let currentNode = this.head;
    if (key && typeof item !== "object") {
      throw new Error(
        "Cannot use a key to look for an item that is not an object",
      );
    }
    for (let idx = 0; currentNode && idx < this.length; ++idx) {
      if (key) {
        if (currentNode.value[key] === item[key]) {
          break;
        }
      } else {
        if (currentNode.value === item) {
          break;
        }
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

const doublyList = new DoublyLinkedList();

doublyList.append(1);
doublyList.append(2);
doublyList.append(3);
doublyList.prepend(100);

console.log(doublyList);
console.log("--- REMOVED ITEM WITH VALUE OF 100 ---");
doublyList.remove(100);
console.log(doublyList);

doublyList.removeAt(doublyList.length - 1);
console.log("--- REMOVED LAST ITEM ---")
console.log(doublyList);

doublyList.append(3);
doublyList.removeAt(0);
console.log("--- APPENDED 3 and REMOVED FIRST ITEM ---")
console.log(doublyList);

doublyList.removeAt(0);
doublyList.removeAt(0);
console.log("--- EMPTIED THE LIST ---")
console.log(doublyList);

doublyList.append("hello");
doublyList.append("world");
// insert in between "hello" & "world";
doublyList.insertAt(1, "there");
console.log("");
console.log("--- ADDED THREE ITEMS && STRING 'there' SHOULD BE IN THE MIDDLE ---");
console.log(doublyList);