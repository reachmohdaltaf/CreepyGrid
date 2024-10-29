const selector = document.querySelector('#selector');
const board = document.querySelector('.minesweeper-board');


// creating the box acording to normal hard 
const createBox = () =>{
    selector.addEventListener('change', ()=>{
        let boxCount = 0;
        board.innerHTML = "";
        if(selector.value === 'normal'){
            boxCount = 80;
        }else if(selector.value === 'medium'){
            boxCount =90;
        }else if(selector.value === 'hard'){
            boxCount = 100;
            
        }
    
        for(let i = 0; i < boxCount; i++){
            const box = document.createElement('div');
            box.classList.add('box');
            board.appendChild(box);

            box.addEventListener("click", ()=>{
                revealbox(box)
            })
        }
        console.log(board)

    
    })
    
}

// onreavealing the box show the number written

const revealbox = (box) =>{
   box.classList.add("revealed");
   box.textContent = "";
   console.log(box)
}


const startGame = ()=>{
    createBox()
    console.log("Game started");
 }

 
 startGame()




