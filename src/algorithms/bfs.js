
export function bfs(grid, start, finish) {
    console.log(start.d)
    start.d=1;
    console.log(start.d)

    
    let nodesInShortestPathOrder = [];
       
        let closedSet = [];
        let visitedNodes = [];
        let queue=[];
        queue.push(start);
        
        while(queue.length !== 0)
        {
            let u =queue[0];
            for(let i=0;i<queue.length;i++)
            {
                if(queue[i].d<u.d)
                {
                    u = queue[i];
                }
            }
            visitedNodes.push(u);
            closedSet.push(u);
            queue= queue.filter((el)=> el!== u);
    
          
           




            let neighbors = [];
            const {col, row} = u;
            if (row > 0) neighbors.push(grid[row - 1][col]);
            if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
            if (col > 0) neighbors.push(grid[row][col - 1]);
            if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

























            for(let i=0;i< neighbors.length;i++)
            {
               
                let neighbour =  neighbors[i];
                if(!closedSet.includes(neighbour) && !neighbour.isWall)
                {
                    
                    let alt = u.d + 1;
                    if(alt<neighbour.d)
                    {
                        neighbour.d = alt;
                        neighbour.previousNode = u;
                        queue.push(neighbour);
                    }      
                }

       
            }
            if(u === finish)
            {
            
                    
                    let currentNode = finish;
                    while (currentNode !== null) {
                      nodesInShortestPathOrder.unshift(currentNode);
                      currentNode = currentNode.previousNode;
                    }
                   // console.log(nodesInShortestPathOrder)
                    return {nodesInShortestPathOrder,visitedNodes};
                  
                
            }
    
        }
    
    return { nodesInShortestPathOrder,visitedNodes ,error:"No path found"};
    
        
    
    }
    
   




































