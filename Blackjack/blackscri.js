// Selecting DOM elements
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const resetButton = document.getElementById('reset-button');
const playerScoreText = document.getElementById('player-score');
const dealerScoreText = document.getElementById('dealer-score');
const messageText = document.getElementById('message');
const playerHand = document.querySelector('.player-hand');
const dealerHand = document.querySelector('.dealer-hand');

let playerScore = 0;
let dealerScore = 0;
let playerCards = [];
let dealerCards = [];
let deck = [];

const suits = ['♠', '♦', '♣', '♥'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Initialize the deck and shuffle it
function createDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
    shuffleDeck();
}

// Shuffle the deck randomly
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal a card from the deck
function dealCard() {
    return deck.pop();
}

// Calculate the total score of a hand
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    hand.forEach(card => {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            score += 10;
        } else if (card.value === 'A') {
            score += 11;
            aceCount += 1;
        } else {
            score += parseInt(card.value);
        }
    });

    // Adjust for Aces if score goes over 21
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }

    return score;
}

// Display a card on the screen with animation
function displayCard(hand, card, isPlayer = true) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = `${card.value} ${card.suit}`;
    cardElement.classList.add('revealed');
    
    if (isPlayer) {
        playerHand.appendChild(cardElement);
    } else {
        dealerHand.appendChild(cardElement);
    }
}

// Update score displays
function updateScores() {
    playerScoreText.textContent = `Your Score: ${playerScore}`;
    dealerScoreText.textContent = `Dealer Score: ${dealerScore}`;
}

// Start a new game
function startNewGame() {
    playerScore = 0;
    dealerScore = 0;
    playerCards = [];
    dealerCards = [];
    createDeck();
    playerHand.innerHTML = '';
    dealerHand.innerHTML = '';
    updateScores();
    messageText.textContent = 'Good Luck!';
    hitButton.disabled = false;
    standButton.disabled = false;
}

// Player's turn: Hit
hitButton.addEventListener('click', () => {
    const card = dealCard();
    playerCards.push(card);
    playerScore = calculateScore(playerCards);
    displayCard(playerCards, card, true);
    updateScores();

    if (playerScore > 21) {
        messageText.textContent = 'You busted! Dealer wins.';
        hitButton.disabled = true;
        standButton.disabled = true;
    }
});

// Dealer's turn: Stand
standButton.addEventListener('click', () => {
    while (dealerScore < 17) {
        const card = dealCard();
        dealerCards.push(card);
        dealerScore = calculateScore(dealerCards);
        displayCard(dealerCards, card, false);
        updateScores();
    }

    if (dealerScore > 21) {
        messageText.textContent = 'Dealer busted! You win.';
    } else if (playerScore > dealerScore) {
        messageText.textContent = 'You win!';
    } else if (playerScore < dealerScore) {
        messageText.textContent = 'Dealer wins!';
    } else {
        messageText.textContent = 'It\'s a tie!';
    }

    hitButton.disabled = true;
    standButton.disabled = true;
});

// Reset button
resetButton.addEventListener('click', startNewGame);

// Start the first game when the page loads
startNewGame();
