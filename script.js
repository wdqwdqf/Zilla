const suggestions = [
    "Membership Plan",
    "Training",
    "Instructors",
    "Trainers"
];

let displayedSuggestions = 4;

function toggleChatbox() {
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    if (chatContainer.style.display === 'block') {
        showSuggestions();
    }
}

function showSuggestions() {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = '';

    const shuffledSuggestions = shuffleArray(suggestions);

    for (let i = 0; i < displayedSuggestions; i++) {
        const suggestionBtn = document.createElement('button');
        suggestionBtn.classList.add('suggestion');
        suggestionBtn.textContent = shuffledSuggestions[i];
        suggestionBtn.onclick = () => {
            const botResponse = getBotResponse(shuffledSuggestions[i]);
            displayBotResponse(botResponse);
            suggestionBtn.style.display = 'none';
            replaceSuggestion();
        };
        suggestionBox.appendChild(suggestionBtn);
    }
}

function replaceSuggestion() {
    const suggestionBox = document.getElementById('suggestion-box');
    const suggestionBtns = suggestionBox.getElementsByClassName('suggestion');
    const shuffledSuggestions = shuffleArray(suggestions);

    for (let i = 0; i < suggestionBtns.length; i++) {
        if (suggestionBtns[i].style.display === 'none') {
            suggestionBtns[i].textContent = shuffledSuggestions[displayedSuggestions - 1];
            suggestionBtns[i].style.display = 'inline-block';
            break;
        }
    }
}

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function sendMessage() {
    const userMessage = document.getElementById('user-message').value;
    if (userMessage.trim() === '') return;

    appendMessage('user', userMessage);
    document.getElementById('user-message').value = '';

    const botResponse = getBotResponse(userMessage);
    displayBotResponse(botResponse);
}

function sendMessageOnEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function appendMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayBotResponse(botResponse) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('bot-message');
    messageElement.innerText = botResponse;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerCaseUserMessage = userMessage.toLowerCase();
    if (lowerCaseUserMessage.includes("hi") || lowerCaseUserMessage.includes("hello")) {
        return "Get Lost";
    } else if (lowerCaseUserMessage.includes("Membership Plan")) {
        return "There are numerous membership plan for you in this Fitness Zilla and u may check it membership plan page";
    } else if (lowerCaseUserMessage.includes("Training")) {
        return "There are different training plan provides by the different trainers and instructors so u may check it membership plan page";
    }else if (lowerCaseUserMessage.includes("Instructors")) {
        return "There are different plan provides by the different instructors so u may check it membership plan page";
    }else if (lowerCaseUserMessage.includes("Trainers")) {
        return "There are different plan provides by the different trainers so u may check it membership plan page";
        return "To ask more questions except from suggestions, contact us at 9811802916 or visit our contact us page.";
    }
}

window.onload = function () {
    document.getElementById('toggle-btn').onclick = function () {
        toggleChatbox();
    };
};
