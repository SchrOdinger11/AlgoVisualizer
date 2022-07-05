import { shortestPathOrder,unvisitedNeighbors } from "./dijkstra";
export function bfs(grid, start, finish) {
    //console.log(start.d)
    start.d=1;
    //console.log(start.d)

    let nodesInShortestPathOrder = [];
       
        let temp = [];
        let visitedArray  = [];
        let queue=[];
        queue.push(start);
        
        while(queue.length !== 0)
        {
            let currentNode =queue[0];
            for(let i=0;i<queue.length;i++)
            {
                if(queue[i].d<currentNode.d)
                {
                    currentNode = queue[i];
                }
            }
            visitedArray .push(currentNode);
            temp.push(currentNode);
            queue= queue.filter((node)=> node!== currentNode);




        let n=[];
        n=unvisitedNeighbors(currentNode,grid);

            // let neighbors = [];
            // const {col, row} = currentNode;
            // if (row > 0) neighbors.push(grid[row - 1][col]);
            // if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
            // if (col > 0) neighbors.push(grid[row][col - 1]);
            // if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);


            for(let i=0;i< n.length;i++)
            {
               
                let neighbour =  n[i];
                if(!temp.includes(neighbour) && !neighbour.wall)
                {
                    
                    let tempD = currentNode.d + 1;
                    if(tempD<neighbour.d)
                    {
                        neighbour.d = tempD;
                        neighbour.previousNode = currentNode;
                        queue.push(neighbour);
                    }      
                }

       
            }
            if(currentNode === finish)
            {
            
                    
                    nodesInShortestPathOrder=shortestPathOrder(finish)
                   // console.log(nodesInShortestPathOrder)
                    return {nodesInShortestPathOrder,visitedArray };
                  
                
            }
    
        }
    
    return { nodesInShortestPathOrder,visitedArray  ,error:"No path found"};
    
        
    
    }
    
   




































