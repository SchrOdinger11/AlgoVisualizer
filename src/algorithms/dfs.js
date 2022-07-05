import { shortestPathOrder,unvisitedNeighbors } from "./dijkstra";
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
        

        let n=[];
        n=unvisitedNeighbors(currentNode,grid);
       

        if(currentNode === finish)
        {
            
            nodesInShortestPathOrder=shortestPathOrder(finish);
            return {nodesInShortestPathOrder,visitedArray};
        }

        for(let i=0;i<n.length;i++)
        {
            if(currentNode !== finish){
            if(!visitedArray.includes(n[i]) && !n[i].wall)
            {
                n[i].previousNode = currentNode;
                visitedArray.push(n[i]);
                stack.push(n[i]);
            }
            
        }else{
            break;
        }
        }
    }


}
