// the game flow for a cell click:
// needs to track any clicks happening on our cells
// check if a valid move has been made
// update game state
// validate the game state: check if a player has won, or if the game ended in a draw
// either stop the game or change the active player, depending on the above checks
// reflect the updates made on the UI
// rinse and repeat




$(".game")

const statusDisplay = document.querySelector(".game-status"); //this variable refers to the .game-status class
let gameActive = true;
let currPlayer = "X";  //player X goes first
let gameState = ["", "", "", "", "", "", "", "", ""]; //9 cells, track cells by an array of string



//declare messages to display. Since we have dynamic factors in those message, we have to declare them as functions
const winningMessage = () => `Player ${currPlayer} has won!`;  //backtick symbol " ` "
const drawMessage = () => `Game ended in a draw!`
const currPlayerTurn = () => `It's ${currPlayer}'s turn`;

//set initial message
statusDisplay.innerHTML = currPlayerTurn();  //html == innerHTML

function handleCellClick(event){ 
    const clickedCell = event.target; //save the clicked element in a variable for easier use
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index")); //grab the index (.attr will weturn a string value)

    //check if cell has already been marked or if the game is paused
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;    

    //if everything is in order, we will proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleCellPlayed(clickedCell, clickedCellIndex){
    //update internal game state and the UI to reflect the played move
    gameState[clickedCellIndex] = currPlayer; //mark the cell with player x or o
    clickedCell.innerHTML = currPlayer;
}
function handleResultValidation(){
    const winningCondition = [ //8 conditions
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i=0; i<8; i++){
        const winCondition = winningCondition[i];
        let a= gameState[winCondition[0]];
        let b= gameState[winCondition[1]];
        let c= gameState[winCondition[2]];
        if (a==="" || b==="" || c==="") continue; //if a,b,c are not all marked, then continue with next value of i
        if (a===b && b===c){  //if a,b,c are marked by the same player
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return; //stop checking result
        }
    }

    //check if draw (draw is when all cells are marked but no one wins)
    let roundDraw = !gameState.includes("");
    if (roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //if no one won yet, change the player and continue the game
    handlePlayerChange();
}

function handlePlayerChange(){
    currPlayer = currPlayer === "X"? "O": "X";
    statusDisplay.innerHTML = currPlayerTurn();
}

function handleRestartGame(){
    gameActive = true;
    currPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""]; //clear tracking array
    statusDisplay.innerHTML = currPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = ""); //clear the cell 
}

//add event listeners
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector(".game-restart").addEventListener('click', handleRestartGame);

