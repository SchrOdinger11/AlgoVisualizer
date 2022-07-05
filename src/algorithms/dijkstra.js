
export function dijkstra(grid, start, finish) {
  start.d = 0;
  const visitedArray = [];

  const unvisitedNodes = nodesFromgrid(grid);
  while (!!unvisitedNodes.length) {
    sort_by_distance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    
    if (closestNode.wall) continue;
  
    if (closestNode.d === Infinity) return visitedArray;
    closestNode.isVisited = true;
    visitedArray.push(closestNode);
    if (closestNode === finish) return visitedArray;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}
export function unvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sort_by_distance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.d - nodeB.d);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighborss = unvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighborss) {
    neighbor.d = node.d + 1;
    neighbor.previousNode = node;
  }
}



function nodesFromgrid(grid) {
  const n = [];
  for (const row of grid) {
    for (const node of row) {
      n.push(node);
    }
  }


  
  return n;
}

export function shortestPathOrder(finish) {
  const nodesInShortestPathOrder = [];
  let currentNode = finish;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}