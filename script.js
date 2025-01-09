const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            return board[a];
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        return "Draw";
    }
    return null;
}

function updateStatus() {
    const winner = checkWinner();
    if (winner) {
        statusDisplay.textContent = winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`;
        if (winner !== "Draw") {
            statusDisplay.classList.add("winner");
        }
    } else {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        statusDisplay.classList.remove("winner");
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

function resetGame() {
    board.fill("");
    currentPlayer = "X";
    gameActive = true;
    gameBoard.innerHTML = "";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    statusDisplay.classList.remove("winner");
    initializeGame();
}

function initializeGame() {
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    });
    updateStatus();
}

resetButton.addEventListener("click", resetGame);

initializeGame();