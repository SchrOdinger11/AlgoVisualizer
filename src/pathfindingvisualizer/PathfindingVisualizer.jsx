import React, {Component} from 'react';

import Node from '../Node/Node';
import {dijkstra, shortestPathOrder} from '../algorithms/dijkstra';
import {bfs} from '../algorithms/bfs'
import {dfs} from '../algorithms/dfs'
import './PathfindingVisualizer.css';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
const starting_row = 10;
const starting_col = 10;
const ending_row = 10;  //19
const ending_col = 45;//45



   

export default class PathfindingVisualizer extends Component {





  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }







  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }
  
  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[starting_row][starting_col];
    const finishNode = grid[ending_row][ending_col];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPathOrder(finishNode);
    console.log(visitedNodesInOrder)
   this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizebfs() {
    
    const {grid} = this.state;
    const startNode = grid[starting_row][starting_col];
    const finishNode = grid[ending_row][ending_col];
    const x=bfs(grid, startNode, finishNode);
    const visitedNodesInOrder = x.visitedArray ;
    const nodesInShortestPathOrder = x.nodesInShortestPathOrder;
   //console.log(x.nodesInShortestPathOrder)
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }


  visualizedfs() {
    
    const {grid} = this.state;
    const startNode = grid[starting_row][starting_col];
    const finishNode = grid[ending_row][ending_col];
    const x=dfs(grid, startNode, finishNode);
    const visitedNodesInOrder = x.visitedArray;
    const nodesInShortestPathOrder = x.nodesInShortestPathOrder;
   //console.log(x.nodesInShortestPathOrder)
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

   reset  (){
    window.location.reload();
}



  render() {
    const {grid, mouseIsPressed} = this.state;
   
    return (
      <>


<div>
<header className="Navbar">
        <div className="Toolbar">
         
          <div className="Title" > Algorithm Visualizer </div>
          
          <button  className="clearbutton" onClick={()=>this.reset()}>Clear</button>
        
        </div>
      </header>
       

      </div>




      <div >
        <button className='button1' onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>&nbsp;&nbsp;&nbsp;
        <button className='button2' onClick={() => this.visualizebfs()}>
          Breadth First Search
        </button>&nbsp;&nbsp;&nbsp;

        <button className='button3' onClick={() => this.visualizedfs()}>
          Depth First Search
        </button>




    


        </div>

       
        
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, wall} = node;
                  return (

                    
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      wall={wall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                      
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {





  return {
    col,
    row,
    isStart: row === starting_row && col === starting_col,
    isFinish: row === ending_row && col === ending_col,
    d: Infinity,

    visited: false,
    wall: false,
    previousNode: null,


  



  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    wall: !node.wall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};