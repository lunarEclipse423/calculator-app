export default class Stack {
  constructor() {
    this.stack = new Array(0);
  }

  push(element) {
    this.stack.push(element);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  clear() {
    this.stack = [];
  }

  length() {
    return this.stack.length;
  }
}
