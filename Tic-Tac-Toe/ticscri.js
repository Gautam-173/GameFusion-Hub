const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Add sound effects for actions
const moveSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
const winSound = new Audio('https://www.soundjay.com/button/beep-08b.wav');
const drawSound = new Audio('https://www.soundjay.com/button/beep-09.wav');

// Handle a cell click
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Handle click event in a cell
function handleCellClick(index) {
    if (gameBoard[index] !== '' || isGameOver) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase()); // Add class for 'X' or 'O'

    moveSound.play(); // Play sound for move
    checkForWinner();

    if (!isGameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check for winner
function checkForWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            winSound.play(); // Play win sound
            isGameOver = true;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        status.textContent = "It's a Draw!";
        drawSound.play(); // Play draw sound
        isGameOver = true;
    }
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    status.textContent = `Player ${currentPlayer}'s Turn`;
}
