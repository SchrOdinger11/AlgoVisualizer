export function dfs(grid,startNode,endNode){
    startNode.d=1;
    let s = [];
    let visitedNodes = [];
  const  nodesInShortestPathOrder=[];

    s.push(startNode);
  
    visitedNodes.push(startNode);

    while(s.length !== 0)
    {
        let u = s.pop();
        


        let n = [];
            const {col, row} = u;
            if (row > 0) n.push(grid[row - 1][col]);
            if (row < grid.length - 1) n.push(grid[row + 1][col]);
            if (col > 0) n.push(grid[row][col - 1]);
            if (col < grid[0].length - 1) n.push(grid[row][col + 1]);

        if(u === endNode)
        {
            let currentNode = endNode;
            while (currentNode !== null) {
              nodesInShortestPathOrder.unshift(currentNode);
              currentNode = currentNode.previousNode;
            }
            return {nodesInShortestPathOrder,visitedNodes};
        }

        for(let i=0;i<n.length;i++)
        {
            if(!visitedNodes.includes(n[i]) && !n[i].isWall)
            {
                n[i].previousNode = u;
                visitedNodes.push(n[i]);
                s.push(n[i]);
            }
            

        }
    }


}
