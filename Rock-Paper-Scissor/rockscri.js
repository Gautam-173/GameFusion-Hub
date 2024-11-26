// Selecting elements from the DOM
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const userChoiceText = document.getElementById('userChoice').querySelector('span');
const computerChoiceText = document.getElementById('computerChoice').querySelector('span');
const outcomeText = document.getElementById('outcome').querySelector('span');
const userScoreText = document.getElementById('userScore');
const computerScoreText = document.getElementById('computerScore');
const resetButton = document.querySelector('.reset-button');

// Variables for storing scores
let userScore = 0;
let computerScore = 0;

// Function to get the computer's random choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
}

// Function to play the game
function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    // Display user and computer choices
    userChoiceText.textContent = userChoice;
    computerChoiceText.textContent = computerChoice;

    // Determine the outcome
    if (userChoice === computerChoice) {
        result = 'It\'s a tie!';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
        userScore++;
    } else {
        result = 'You lose!';
        computerScore++;
    }

    // Update the outcome and scores
    outcomeText.textContent = result;
    userScoreText.textContent = `Your Score: ${userScore}`;
    computerScoreText.textContent = `Computer's Score: ${computerScore}`;
}

// Add event listeners for user choices
rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));

// Reset game function
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userChoiceText.textContent = '';
    computerChoiceText.textContent = '';
    outcomeText.textContent = '';
    userScoreText.textContent = `Your Score: ${userScore}`;
    computerScoreText.textContent = `Computer's Score: ${computerScore}`;
}

// Reset button event listener
resetButton.addEventListener('click', resetGame);
