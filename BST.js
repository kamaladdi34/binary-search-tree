class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
}
