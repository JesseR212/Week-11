let currentPlayer = "X"; // Track the current player
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Game board array
let gameActive = true; // Flag to check if the game is still ongoing

const turnHeading = $("#turnHeading");
const gameCells = $(".cell");
const resetButton = $("#resetButton");
const alertBox = $("#alert");

// Handle cell clicks
gameCells.on("click", function () {
  const cellIndex = $(this).attr("id").replace("box", "");
  if (gameBoard[cellIndex] || !gameActive) return; // Ignore if cell already filled or game is over

  gameBoard[cellIndex] = currentPlayer;
  $(this).text(currentPlayer);
  $(this).addClass(currentPlayer.toLowerCase()); // Mark cell with X or O

  if (checkWinner()) {
    gameActive = false;
    alertBox.text(`${currentPlayer} Wins!`);
    alertBox.removeClass("alert-info").addClass("alert-success").show();
  } else if (!gameBoard.includes("")) {
    gameActive = false;
    alertBox.text("It's a Draw!");
    alertBox.removeClass("alert-info").addClass("alert-warning").show();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    turnHeading.text(`${currentPlayer}'s Turn`);
  }
});

// Handle reset button click
resetButton.on("click", resetGame);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontal Wins
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Vertical Wins
  [0, 4, 8],
  [2, 4, 6], // Diagonal Wins
];

// Check if there's a winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}

// Reset the game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  turnHeading.text(`${currentPlayer}'s Turn`);
  alertBox.hide();

  gameCells.each(function () {
    $(this).text("");
    $(this).removeClass("x o");
  });
}
