import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import SuggestionCard from "./components/SuggestionCard";
import Messages from "./components/Messages";
import "./App.css";

const suggestions = [
  { title: "Job Interview", desc: "Professional outfit suggestions", icon: "💼" },
  { title: "Weekend Casual", desc: "Comfortable and stylish looks", icon: "☕" },
  { title: "Color Analysis", desc: "Find your perfect palette", icon: "🎨" },
  { title: "Seasonal Style", desc: "Trendy seasonal outfits", icon: "🌸" },
];

function generateThreadId() {
  return "thread_" + Date.now() + "_" + Math.random().toString(36).slice(2);
}

function App() {
  // ✅ state FIRST
  const [threadId, setThreadId] = useState(generateThreadId());
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [autoSendText, setAutoSendText] = useState(null);
  // ✅ functions BEFORE JSX
  const startNewChat = () => {
    setThreadId(generateThreadId());
    setMessages([]);
  };

  // ✅ JSX ONLY inside return
  return (
    <div className="app">
      <Sidebar onNewChat={startNewChat} />

      <main className="main">
        {messages.length === 0 && (
          <>
            <h1>✨ Your AI Fashion Stylist ✨</h1>
            <div className="suggestions">
              {suggestions.map((item, index) => (
  <SuggestionCard
    key={index}
    {...item}
    onClick={() => setAutoSendText(item.title)}
  />
))}
            </div>
          </>
        )}

        <Messages messages={messages} isTyping={isTyping} />

        <ChatInput
  threadId={threadId}
  setMessages={setMessages}
  setIsTyping={setIsTyping}
  isTyping={isTyping}
  autoSendText={autoSendText}
/>

      </main>
    </div>
  );
}

export default App;
