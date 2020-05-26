import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares: string[]; //for a NxN board
  xIsNext:boolean;  //which is next move
  oIsNext:boolean;  
  _winner:string;
  isGameOver:boolean;

  constructor() { }

  ngOnInit(): void {
    this.newGameStart();
    }

  set winner(val:string){
    this._winner = val;
    if(val){
    this.isGameOver = true;
    }
  }

  get winner(){
    return this._winner;
  }

  newGameStart():void{

this.squares = Array(9).fill(null);
this.winner = null;
this.xIsNext = true;
this.isGameOver = false;

  }

  get player(){
    return this.xIsNext? 'X':'O';
  }

  makeMove(indexOfBoard:number){
    if(!this.squares[indexOfBoard]&&!(this.isGameOver)){  
      this.squares.splice(indexOfBoard,1,this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    console.log(this.winner);
  }

  calculateWinner(){
    //making array of possible winning conditions
    const winningLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i=0;i<winningLines.length;i++){
      const[a,b,c] = winningLines[i];   //getting each win condition
      if(
        this.squares[a] && 
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]

      ){
        return this.squares[a];
      }
    }
    return null;
  }
}
