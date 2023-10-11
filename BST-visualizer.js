const canvas = document.querySelector("canvas");
const height = 700;
const width = 1200;
let circleWidth = 20;
const ctx = canvas.getContext("2d");
function makeNode(value, position) {
  ctx.beginPath();
  ctx.arc(position.x, position.y, circleWidth, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = "16px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${value}`, position.x, position.y);
}
function makeline(from, to) {
  ctx.moveTo(from.x, from.y + circleWidth);
  ctx.lineTo(to.x, to.y - circleWidth);
  ctx.stroke();
}
let startPosition = { x: width / 2, y: 100 };
function getChildPosition(parentPosition, isRight, level) {
  let padding = 40 + 800 / (level * (2 + level));
  console.log(padding);
  let shift = isRight ? padding : -padding;
  return {
    x: parentPosition.x + shift,
    y: parentPosition.y + 100,
  };
}
export function drawTree(node, position = startPosition, level = 1) {
  if (node == null) {
    return;
  }
  if (level == 1) {
    makeNode(node.data, position);
  }
  if (node.right) {
    let targetPosition = getChildPosition(position, true, level);
    makeline(position, targetPosition);
    makeNode(node.right.data, targetPosition);
    let rightLevel = level;
    drawTree(node.right, targetPosition, ++rightLevel);
  }
  if (node.left) {
    let targetPosition = getChildPosition(position, false, level);
    makeline(position, targetPosition);
    makeNode(node.left.data, targetPosition);
    let leftLevel = level;
    drawTree(node.left, targetPosition, ++leftLevel);
  }
}
