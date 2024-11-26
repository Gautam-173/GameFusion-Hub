const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const modal = document.getElementById('story-modal');
const finalStoryText = document.getElementById('final-story');
const story = {
    start: {
        text: "You find yourself in a mysterious village. Do you:",
        choices: [
            { text: "Explore the village", next: "explore" },
            { text: "Talk to the villagers", next: "talk" }
        ]
    },
    explore: {
        text: "You wander through the village and discover a hidden path leading into the woods. Do you:",
        choices: [
            { text: "Follow the path", next: "hiddenPath" },
            { text: "Return to the village", next: "start" }
        ]
    },
    talk: {
        text: "The villagers seem friendly and share stories of a hidden treasure. Do you:",
        choices: [
            { text: "Ask for more details about the treasure", next: "treasureHunt" },
            { text: "Thank them and leave", next: "start" }
        ]
    },
    hiddenPath: {
        text: "You follow the hidden path and come across an ancient tree. Do you:",
        choices: [
            { text: "Climb the tree", next: "climbTree" },
            { text: "Sit under the tree and rest", next: "restUnderTree" }
        ]
    },
    treasureHunt: {
        text: "The villagers tell you that the treasure is guarded by a dragon. Do you:",
        choices: [
            { text: "Prepare to face the dragon", next: "dragonEncounter" },
            { text: "Decide it's too dangerous and leave", next: "start" }
        ]
    },
    climbTree: {
        text: "You climb the tree and get a better view of the village. Do you:",
        choices: [
            { text: "Climb down and investigate the object", next: "investigateObject" },
            { text: "Stay in the tree and observe", next: "end" }
        ]
    },
    restUnderTree: {
        text: "You sit under the tree and fall asleep. Do you:",
        choices: [
            { text: "Befriend the creature", next: "end" },
            { text: "Run away", next: "end" }
        ]
    },
    dragonEncounter: {
        text: "You prepare to face the dragon and approach its lair. Do you:",
        choices: [
            { text: "Challenge the dragon", next: "end" },
            { text: "Try to sneak past it", next: "end" }
        ]
    },
    end: {
        text: "Congratulations! You've created an amazing story!",
        choices: []
    }
};

// To store the complete story
let userStory = [];

// Function to start the game
function startGame() {
    userStory = []; // Reset the story
    showStory('start');
}

// Function to show the story and choices
function showStory(key) {
    const currentStory = story[key];
    storyText.textContent = currentStory.text;
    choicesContainer.innerHTML = '';

    // Save the current story to the user's journey
    if (key !== 'end') {
        userStory.push(currentStory.text);
    }

    // Add choices buttons
    currentStory.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => {
            showStory(choice.next);
        };
        choicesContainer.appendChild(button);
    });

    // When the story ends, show the modal with the full story
    if (key === 'end') {
        userStory.push(currentStory.text); // Add the final message
        showModal(userStory.join(' '));
    }
}

// Function to show the modal with the full story
function showModal(fullStory) {
    finalStoryText.textContent = fullStory;
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Start the game when the page loads
window.onload = startGame;