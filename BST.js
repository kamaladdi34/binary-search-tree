import { cleanArray, prettyPrint } from "./tools.js";
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class Tree {
  constructor(array) {
    this.root = this.buildTree(cleanArray(array));
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
  insert(data, node = this.root) {
    if (data > node.data && !node.right) {
      node.right = new Node(data, null, null);
      return;
    }
    if (data < node.data && !node.left) {
      node.left = new Node(data, null, null);
      return;
    }
    if (data > node.data) {
      this.insert(data, node.right);
    } else if (data < node.data) {
      this.insert(data, node.left);
    }
  }
  remove(data, node = this.root, parent = null, fromRight) {
    if (node == null) {
      return false;
    }
    if (node.data == data) {
      if (node.right == null && node.left == null) {
        if (fromRight) {
          parent.right = null;
        } else {
          parent.left = null;
        }
        console.log("removing leaf");
      }
      if (node.right == null && node.left) {
        parent.left = node.left;
        console.log("removing node with left child");
      }
      if (node.right && node.left == null) {
        parent.right = node.right;
        console.log("removing node with right child");
      }
      if (node.right && node.left) {
        console.log("removing node with both childs");
        let lowestOnRight = this.findLowestOnLeft(node.right, node);
        lowestOnRight.lowestNode.right = node.right;
        lowestOnRight.lowestNode.left = node.left;
        if (fromRight) {
          parent.right = lowestOnRight.lowestNode;
        } else {
          parent.left = lowestOnRight.lowestNode;
        }
        if (lowestOnRight.parent == node) {
          lowestOnRight.lowestNode.right = null;
        } else {
          lowestOnRight.parent.left = null;
        }
      }
      return true;
    }
    if (this.remove(data, node.right, node, true)) {
    } else {
      this.remove(data, node.left, node, false);
    }
  }
  findLowestOnLeft(node, parent) {
    if (node.left == null) {
      return { parent: parent, lowestNode: node };
    } else {
      return this.findLowestOnLeft(node.left, node);
    }
  }
}
let testTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
prettyPrint(testTree.root);
testTree.remove(9);
prettyPrint(testTree.root);
