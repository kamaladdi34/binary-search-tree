import { cleanArray } from "./tools.js";
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
  buildTree(array) {
    if (array.length == 1) {
      return new Node(array[0], null, null);
    }
    if (array.length == 0) {
      return null;
    }
    let middle = Math.floor(array.length / 2);
    let leftArray = array.slice(0, middle);
    let rightArray = array.slice(middle + 1);
    let root = new Node(
      array[middle],
      this.buildTree(leftArray),
      this.buildTree(rightArray)
    );
    return root;
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
let testTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
prettyPrint(testTree.root);
