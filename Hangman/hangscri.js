// Game Variables
const words = ['javascript', 'hangman', 'programming', 'developer', 'web', 'coding', 'computer', 'function'];
let chosenWord = '';
let displayWord = '';
let wrongGuesses = 0;
let lives = 6;
let guessedLetters = [];
let gameOver = false;

// DOM Elements
const wordContainer = document.getElementById('word-container');
const livesContainer = document.getElementById('lives');
const keyboard = document.getElementById('keyboard');
const statusMessage = document.getElementById('status-message');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('reset-button'); // Reset Button

// Hangman Drawing Functions
function drawHangman(stage) {
    // Clear previous hangman drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Base structure of the hangman scaffold
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(50, 250); // Base
    ctx.lineTo(150, 250);
    ctx.moveTo(100, 250);
    ctx.lineTo(100, 50); // Pole
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50); // Top horizontal
    ctx.lineTo(200, 75); // Vertical line
    ctx.stroke();

    // Hangman Parts (based on wrong guesses)
    if (stage >= 1) {
        // Head
        ctx.beginPath();
        ctx.arc(200, 125, 25, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (stage >= 2) {
        // Body
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(200, 200);
        ctx.stroke();
    }
    if (stage >= 3) {
        // Left Arm
        ctx.beginPath();
        ctx.moveTo(200, 170);
        ctx.lineTo(170, 180);
        ctx.stroke();
    }
    if (stage >= 4) {
        // Right Arm
        ctx.beginPath();
        ctx.moveTo(200, 170);
        ctx.lineTo(230, 180);
        ctx.stroke();
    }
    if (stage >= 5) {
        // Left Leg
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(170, 230);
        ctx.stroke();
    }
    if (stage >= 6) {
        // Right Leg
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(230, 230);
        ctx.stroke();
    }
}

// Game Functions
function initGame() {
    // Select a random word
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord = chosenWord.split('').map(letter => '_').join(' ');
    guessedLetters = [];
    wrongGuesses = 0;
    gameOver = false;
    statusMessage.textContent = '';

    // Reset canvas and draw the initial hangman scaffold
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHangman(wrongGuesses);

    // Update the lives remaining
    lives = 6;
    livesContainer.textContent = `Lives Remaining: ${lives}`;
    wordContainer.textContent = displayWord;

    // Create keyboard buttons dynamically
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    keyboard.innerHTML = ''; // Clear any previous keyboard
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter, button) {
    if (gameOver || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    button.disabled = true;

    if (chosenWord.includes(letter)) {
        updateDisplayWord(letter);
        checkGameStatus();
    } else {
        wrongGuesses++;
        drawHangman(wrongGuesses);
        lives--; // Decrease lives on wrong guess
        livesContainer.textContent = `Lives Remaining: ${lives}`;
        if (wrongGuesses >= 6) {
            gameOver = true;
            statusMessage.textContent = `You Lose! The word was: ${chosenWord}`;
        }
    }
}

function updateDisplayWord(letter) {
    displayWord = chosenWord.split('').map(letterInWord => {
        return guessedLetters.includes(letterInWord) ? letterInWord : '_';
    }).join(' ');
    wordContainer.textContent = displayWord;
}

function checkGameStatus() {
    if (displayWord === chosenWord) {
        gameOver = true;
        statusMessage.textContent = 'You Win!';
    }
}

// Reset Button Logic
resetButton.addEventListener('click', () => {
    if (gameOver) {
        initGame();
    }
});

// Start a new game
initGame();
