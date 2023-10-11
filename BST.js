import { cleanArray, prettyPrint } from "./tools.js";
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
export class Tree {
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
      }
      if (node.right == null && node.left) {
        parent.left = node.left;
      }
      if (node.right && node.left == null) {
        parent.right = node.right;
      }
      if (node.right && node.left) {
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
  find(value, node = this.root) {
    if (node == null) {
      return false;
    }
    if (node.data == value) {
      return node;
    }
    let right = this.find(value, node.right);
    let left = this.find(value, node.left);
    if (right) {
      return right;
    } else if (left) {
      return left;
    } else {
      return null;
    }
  }
  iterativeLevelOrder(callback) {
    let queue = [this.root];
    let valueOutput = [];
    while (queue.length > 0) {
      let level = [];
      let queueCopy = [...queue];
      for (let i = 0; i < queueCopy.length; i++) {
        callback ? callback(queueCopy[i]) : valueOutput.push(queueCopy[i].data);
        if (queueCopy[i].left) {
          level.push(queueCopy[i].left);
        }
        if (queueCopy[i].right) {
          level.push(queueCopy[i].right);
        }
        queue.shift();
      }
      queue = queue.concat(level);
    }
    if (!callback) {
      console.log(valueOutput);
    }
  }
  recursionLevelOrder(callback) {
    let queue = [];
    let valueOutput = [];
    const buildQueue = (node = this.root, level = 0) => {
      if (!node) {
        return;
      }
      queue.push({ node: node, level: level });
      if (node.left) {
        let newLevel = level;
        buildQueue(node.left, ++newLevel);
      }
      if (node.right) {
        let newLevel = level;
        buildQueue(node.right, ++newLevel);
      }
    };
    buildQueue();
    queue = queue.sort((a, b) => {
      return a.level - b.level;
    });
    queue.forEach((item) =>
      callback ? callback(item.node) : valueOutput.push(item.node.data)
    );
    if (!callback) {
      console.log(valueOutput);
    }
  }
  inOrder(targetNode = this.root, callback) {
    let outputValue = [];
    function inOrderRecursion(node = targetNode) {
      if (node == null) {
        return;
      }
      if (!node.right && !node.left) {
        callback ? callback(node) : outputValue.push(node.data);
        return;
      }
      if (node.left) {
        inOrderRecursion(node.left);
      }
      callback ? callback(node) : outputValue.push(node.data);
      if (node.right) {
        inOrderRecursion(node.right);
      }
    }
    inOrderRecursion();
    return callback ? undefined : outputValue;
  }
  preOrder(node = this.root) {
    if (node == null) {
      return;
    } else {
      console.log(node.data);
    }
    if (node.left) {
      this.preOrder(node.left);
    }
    if (node.right) {
      this.preOrder(node.right);
    }
  }
  postOrder(node = this.root) {
    if (node == null) {
      return;
    }
    if (node.left) {
      this.postOrder(node.left);
    }
    if (node.right) {
      this.postOrder(node.right);
    }
    console.log(node.data);
  }
  height(node = this.root, level = 0) {
    if (!node.left && !node.right) {
      return level;
    }
    let leftLevel = level;
    let rightLevel = level;
    let left = node.left ? this.height(node.left, ++leftLevel) : 0;
    let right = node.right ? this.height(node.right, ++rightLevel) : 0;
    return Math.max(left, right);
  }
  depth(targetNode = this.root, node = this.root, depth = 0) {
    if (node == null) {
      return false;
    }
    if (node == targetNode) {
      return depth;
    }
    let leftDepth = depth;
    let rightDepth = depth;
    let right = this.depth(targetNode, node.right, ++leftDepth);
    let left = this.depth(targetNode, node.left, ++rightDepth);
    if (right) {
      return right;
    } else if (left) {
      return left;
    } else {
      return null;
    }
  }
  isBalanced(node = this.root) {
    return this.checkBalance(node) !== -1;
  }
  checkBalance(node) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.checkBalance(node.left);
    if (leftHeight === -1) {
      return -1;
    }
    const rightHeight = this.checkBalance(node.right);
    if (rightHeight === -1) {
      return -1;
    }
    const heightDifference = Math.abs(leftHeight - rightHeight);
    if (heightDifference > 1) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }
  rebalance() {
    this.root = this.buildTree(this.inOrder(this.root));
  }
}
