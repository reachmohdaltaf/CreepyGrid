const selector = document.querySelector("#selector");
const board = document.querySelector(".minesweeper-board");

let bombCount = 12;
let bombPosition = [];


selector.value = "normal"
let gameboard = [];

// creating difficulty of the game
const difficulty = () =>{
    let boardRow = 8;
        let boardColumn = 10;
        generateBombs(boardRow, boardColumn);
        createBox(boardRow, boardColumn)
    selector.addEventListener("change", () => {
        if (selector.value === "normal") {
          boardRow = 8;
          boardColumn = 10;
        } else if (selector.value === "medium") {
          boardRow = 9;
          boardColumn = 10;
        } else if (selector.value === "hard") {
          boardRow = 10;
          boardColumn = 10;
        }
        createBox(boardRow, boardColumn)
        generateBombs(boardRow, boardColumn);

    });
}



// genrating a bomb 
const generateBombs = (boardRow, boardColumn ) =>{
    bombPosition = [];
    while(bombPosition.length < bombCount){
        let position = Math.floor(Math.random() * boardRow * boardColumn);
        if(!bombPosition.includes(position)){
            bombPosition.push(position);
            
        }
    }
    console.log("Bombs at:", bombPosition);

}


const revealAllBombs = (box) => {
    const boxes = document.querySelectorAll(".box");
    bombPosition.forEach((position) => {
        boxes[position].classList.add("bomb", "revealed");

       
    });
};

const bombnear = (position, boardRow, boardColumn)=>{

    const near = [-1, 1, -boardColumn, -boardColumn  -1, -boardColumn +1, boardColumn -1,boardColumn + 1 ]
    let count = 0;
      neighbors.forEach((offset) => {
        const neighborPosition = position + offset;
        // Ensure we are not out of bounds and the position is valid
        if (neighborPosition >= 0 && neighborPosition < boardRow * boardColumn) {
            if (bombPosition.includes(neighborPosition)) {
                count++;
            }
        }
    });
    return count;
} 





// creating the box roww and column loop
const createBox = (boardRow, boardColumn) => {
    board.innerHTML = "";
    for (let i = 0; i < boardRow; i++) {
      for (let j = 0; j < boardColumn; j++) {
        const box = document.createElement("div");
        let position = i * boardColumn + j;
        
        box.addEventListener('click', ()=>{
            
            if (bombPosition.includes(position)) {
                box.classList.add("bomb");
                alert("Chalo Beta ghar Jao")
                revealAllBombs(box)
                revealBox(box)
            } else {
                
                revealBox(box); 
            }
        });
      
        box.classList.add("box");
        board.appendChild(box);
      }
    }
    console.log(board);
};






// onreavealing the box show the number written

const revealBox = (box) => {
  box.classList.add("revealed");
  box.textContent = "";
};

const startGame = () => {
  difficulty();
  console.log("Game started");
};

startGame();
