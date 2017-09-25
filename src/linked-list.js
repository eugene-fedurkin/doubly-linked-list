const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);

        if (!this.length) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        if (index < this.length && index >= 0) {
            return this.search(index).data;
        }
        throw new Error("index is out of range");
    }

    insertAt(index, data) {
        if (index >= 0 && index <= this.length) {
            let currentNode = this.search(index);
            let node = new Node(data);
            if (index === this.length) {
                this.append(data);
                return this;
            }
            let nextNode = this.search(index);
            let prevNode = nextNode.prev;
            prevNode.next = node;
            nextNode.prev = node;
            node.prev = prevNode;
            node.next = nextNode;
            this.length++;
            return this;
        }
    }

    isEmpty() {
        return !this.length ? true : false;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index < 0 || index >= this.length) {
            return this;
        }
        if (index === 0) {
            this._head = this._head.next;
            if (this._head) this._head.prev = null;
            else this._tail = null;
            this.length--;
            return this;
        }
        if (index === this.length - 1) {
            this._tail = this._tail.prev;
            this._tail.next = null;
            this.length--;
            return this;
        }
        let node = this.search(index);
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.length--;

        return this;
    }

    reverse() {
        if (this.length <= 1) return this;

        let currentNode = this._tail;
        while (currentNode.prev) {
            currentNode.next = currentNode.prev;
            currentNode = currentNode.prev;
        }
        currentNode.next = null;
        currentNode = this._tail;
        currentNode.prev = null;

        while (currentNode.next) {
            currentNode.next.prev = currentNode;
            currentNode = currentNode.next;
        }

        this._head = this._tail;
        this._tail = currentNode;
        return this;
    }

    indexOf(data) {
        if (this.length) {
            let currentNode = this._head;
            for (let i = 0; i < this.length; i++) {
                if (currentNode.data === data) return i;
                currentNode = currentNode.next;
            }
            return -1;
        }
    }

    search(index) {
        let currentNode = this._head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}

module.exports = LinkedList;
