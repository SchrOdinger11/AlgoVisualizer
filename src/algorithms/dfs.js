import { shortestPathOrder } from "./dijkstra";
export function dfs(grid,start,finish){


    
    start.d=1;
    let stack = [];
    let visitedArray = [];
  let  nodesInShortestPathOrder=[];

  stack.push(start);
  
    visitedArray.push(start);

    while(stack.length !== 0)
    {
        let currentNode = stack.pop();
        


        let n = [];
            const {col, row} = currentNode;
            if (row > 0) n.push(grid[row - 1][col]);
            if (row < grid.length - 1) n.push(grid[row + 1][col]);
            if (col > 0) n.push(grid[row][col - 1]);
            if (col < grid[0].length - 1) n.push(grid[row][col + 1]);

        if(currentNode === finish)
        {
            
            nodesInShortestPathOrder=shortestPathOrder(finish);
            return {nodesInShortestPathOrder,visitedArray};
        }

        for(let i=0;i<n.length;i++)
        {
            if(!visitedArray.includes(n[i]) && !n[i].wall)
            {
                n[i].previousNode = currentNode;
                visitedArray.push(n[i]);
                stack.push(n[i]);
            }
            

        }
    }


}
