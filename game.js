const boardSize = 5; // 5x5 grid
const numMines = 5; // Number of mines on the board
let revealedCells = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board");

let grid = [];

function createBoard() {
    grid = [];
    revealedCells = 0;
    gameOver = false;

    // Create the grid (empty cells)
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push({ revealed: false, mine: false });
        }
        grid.push(row);
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        let x = Math.floor(Math.random() * boardSize);
        let y = Math.floor(Math.random() * boardSize);
        if (!grid[x][y].mine) {
            grid[x][y].mine = true;
            minesPlaced++;
        }
    }

    // Build the game board HTML
    gameBoard.innerHTML = "";
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-x", i);
            cell.setAttribute("data-y", j);
            cell.addEventListener("click", revealCell);
            gameBoard.appendChild(cell);
        }
    }
}

function revealCell(event) {
    if (gameOver) return;

    const x = event.target.getAttribute("data-x");
    const y = event.target.getAttribute("data-y");
    const cell = grid[x][y];

    if (cell.revealed) return; // Don't reveal the same cell twice

    cell.revealed = true;
    event.target.classList.add("revealed");

    if (cell.mine) {
        event.target.classList.add("mine");
        alert("Game Over! You hit a mine!");
        gameOver = true;
    } else {
        revealedCells++;
        if (revealedCells === (boardSize * boardSize - numMines)) {
            alert("You win!");
        }
    }
}

createBoard();
