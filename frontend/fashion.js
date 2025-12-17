let currentThreadId = generateThreadId();
let isTyping = false;

function generateThreadId() {
    return 'thread_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('hidden');
    document.getElementById('mainContainer').classList.toggle('expanded');
}

function startNewChat() {
    currentThreadId = generateThreadId();
    document.getElementById('messagesArea').innerHTML = `
<div class="welcome-screen" id="welcomeScreen">
    <h1>✨ Your AI Fashion Stylist ✨</h1>
    <p>Get personalized style advice, outfit recommendations, and fashion tips!</p>

    <div class="suggestion-cards">
        <div class="suggestion-card" onclick="sendSuggestion('I need an outfit for a job interview')">
            <i class="fas fa-briefcase"></i>
            <h5>Job Interview</h5>
            <p>Professional outfit suggestions</p>
        </div>
        <div class="suggestion-card" onclick="sendSuggestion('Casual weekend outfit ideas')">
            <i class="fas fa-coffee"></i>
            <h5>Weekend Casual</h5>
            <p>Comfortable and stylish looks</p>
        </div>
        <div class="suggestion-card" onclick="sendSuggestion('What colors look good on me?')">
            <i class="fas fa-palette"></i>
            <h5>Color Analysis</h5>
            <p>Find your perfect palette</p>
        </div>
        <div class="suggestion-card" onclick="sendSuggestion('Summer dress recommendations')">
            <i class="fas fa-sun"></i>
            <h5>Seasonal Style</h5>
            <p>Trendy seasonal outfits</p>
        </div>
    </div>
</div>
    `;
    document.getElementById('messageInput').value = '';
}

function sendSuggestion(text) {
    document.getElementById('messageInput').value = text;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const userMessage = input.value.trim(); // <-- userMessage is defined here

    if (!userMessage || isTyping) return;

    // Hide welcome screen if visible
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.remove();
    }

    // Add user message
    addMessage(userMessage, 'user');
    input.value = '';

    // Auto-resize textarea
    input.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();
    
    // API Endpoint constant defined locally for clarity
    const API_ENDPOINT = 'https://aifashionstylist.onrender.com/'; 

    try {
        // --- THIS CODE IS NOW INSIDE THE ASYNC FUNCTION AND RUNS ON CLICK ---
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadID: currentThreadId, // <-- currentThreadId is defined globally
                message: userMessage        // <-- userMessage is defined locally above
            })
        });

        const data = await response.json();

        // Remove typing indicator
        removeTypingIndicator();

        if (data.error || !response.ok) { // Check both JSON body error and HTTP status
            addMessage(`Sorry, I encountered an error: ${data.error || 'Server Status Error.'}`, 'assistant');
        } else {
            // Fix: Use data.reply, as your Express router sends back { reply: ... }
            const apiReply = data.reply; 
            addMessage(apiReply, 'assistant');
        }
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage('Sorry, I could not connect to the server. Please check your connection!', 'assistant');
    }
}
// ... (rest of helper functions remain the same)

function addMessage(text, sender) {
    const messagesArea = document.getElementById('messagesArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;

    if (sender === 'user') {
        messageDiv.appendChild(content);
        messageDiv.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
    }

    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function showTypingIndicator() {
    isTyping = true;
    document.getElementById('sendBtn').disabled = true;

    const messagesArea = document.getElementById('messagesArea');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant-message';
    typingDiv.id = 'typingIndicator';

    typingDiv.innerHTML = `
<div class="message-avatar">
<i class="fas fa-robot"></i>
</div>
<div class="message-content">
<div class="typing-indicator">
<div class="typing-dot"></div>
<div class="typing-dot"></div>
<div class="typing-dot"></div>
</div>
</div>
    `;

    messagesArea.appendChild(typingDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function removeTypingIndicator() {
    isTyping = false;
    document.getElementById('sendBtn').disabled = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Auto-resize textarea
const textarea = document.getElementById('messageInput');
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Mobile sidebar toggle
if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.add('hidden');
}