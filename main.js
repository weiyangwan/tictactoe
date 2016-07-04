// ----- INITIALISE -----
// 1. prompt("Welcome to Tic-Tac-Toe. Player 1, please enter your name")
//   -> store player1 name as var player1
// 2. prompt("Player 2, please enter your name")
//   -> store player2 name as var player2
// 3. allow player to choose number of games
// 4. append player1 name, player2 name and score on gameboard
// 5. allow user to reset game
var player1 = prompt("Welcome to Tic-Tac-Toe. Player 1, please enter your name").toUpperCase();
var player2 = prompt("Player 2, please enter your name.").toUpperCase();
var player1Score = 0;
var player2Score = 0;

var instruction = document.getElementsByClassName("instruction")[0];//find out about this
instruction.innerHTML = player1 + ", <span>you are up first!</span>";
var player1Name = document.getElementsByClassName("player1")[0];
player1Name.innerHTML = player1 + " [X]: " + player1Score;
var player2Name = document.getElementsByClassName("player2")[0];
player2Name.innerHTML = player2 + " [O]: " + player2Score;

var getCell = document.getElementsByTagName('li');
var turn = 0;

// ---------GAME PLAY -------
// 1. player1 starts the game, onclick, change to player's 2 turn
// 2. Update the board with the players choice. This will append an id (x/o) to the div which will change the CSS
// 3. Update board to see whether any player wins
// 4. When a player wins each game, update the player score
document.addEventListener('click', function(event) {
  var clickedDiv = event.target;
  if (clickedDiv.className == "cell") {
    if (turn % 2 === 0) {
      clickedDiv.id = "x";
      clickedDiv.className = "clicked";
      clickedDiv.innerHTML = "<h4>X</h4>";
      turn++;
      updateBoard();
    } else {
      clickedDiv.id = "o";
      clickedDiv.className = "clicked";
      clickedDiv.innerHTML = "<h4>O</h4>";
      turn++;
      updateBoard();
    }
  } else if(clickedDiv.id == "newBtn") {
    instruction.innerHTML = player1 + ", <span>you are up first!</span>";
    resetBoard();
    turn = 0;
  }
});

function updateBoard() {
  var boardArray = [];
  for (var i = 0; i < getCell.length; i++) {
    var getId = getCell[i].id;
    boardArray.push(getId);
  }
  var winner = checkWin(boardArray);
  if(winner == 'x')  {
    instruction.innerHTML = "<span>Congrats! </span>" + player1 + ", <span>you win!</span><br><h6>Click on 'New Game' to play again!</h6>";
    lockCells();
    player1Score ++;
    player1Name.innerHTML = player1 + " [X]: " + player1Score;//unable to auto update score without this statement
  } else if (winner == 'o') {
    instruction.innerHTML = "<span>Congrats! </span>" + player2 + ", <span>you win!</span><br><h6>Click on 'New Game' to play again!</h6>";
    lockCells();
    player2Score ++;
    player2Name.innerHTML = player2 + " [O]: " + player2Score;
  } else if (turn % 2 === 0 && turn < 9)  {
    instruction.innerHTML = player1 + ", <span>it's your turn!</span>";
  } else if (turn % 2 === 1 && turn < 9){
    instruction.innerHTML = player2 + ", <span>it's your turn!</span>";
  } else if(turn == 9 && (winner != 'x' || winner != 'o')) {
    instruction.innerHTML = "<span>It's a tie!</span>";
    lockCells();
  }
}

function lockCells()  {
  for (var i = 0; i < getCell.length; i++) {
    getCell[i].className = "clicked";
  }
}

function resetBoard() {
  for (var i = 0; i < getCell.length; i++) {
    getCell[i].id = i + 1;
    getCell[i].className = "cell";
    getCell[i].innerHTML = "";
  }
}

// ----- GAME WIN LOGIC -----
// 1. Determine when a player will win the game:
//   a. 03 rows
//   b. 03 columns
//   c. 02 diagonals
function checkWin(array) {
  if ((array[0] === array[1]) && (array[1] === array[2])) {
    return array[0];
  } else if ((array[3] === array[4]) && (array[4] === array[5]))  {
    return array[3];
  } else if ((array[6] === array[7]) && (array[7]=== array[8]))  {
    return array[6];
  } else if ((array[0] === array[3]) && (array[3] === array[6]))  {
    return array[0];
  } else if ((array[1] === array[4]) && (array[4] === array[7]))  {
    return array[1];
  } else if ((array[2] === array[5]) && (array[5] === array[8]))  {
    return array[2];
  } else if ((array[0] === array[4]) && (array[4] === array[8]))  {
    return array[0];
  } else if ((array[2] === array[4]) && (array[4] === array[6]))  {
    return array[2];
  }
}
