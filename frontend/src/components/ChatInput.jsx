import { useState, useEffect } from "react";

function ChatInput({
  threadId,
  setMessages,
  setIsTyping,
  isTyping,
  autoSendText // 👈 NEW
}) {
  const [input, setInput] = useState("");

  const API_ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:8000/api/chat"
      : "https://aifashionstylist.onrender.com/api/chat";

  // 🔥 AUTO SEND when suggestion card is clicked
  useEffect(() => {
    if (autoSendText) {
      setInput(autoSendText);
      sendMessage(autoSendText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSendText]);

  const sendMessage = async (textOverride) => {
    const messageToSend = textOverride ?? input;

    if (!messageToSend.trim() || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { text: messageToSend, sender: "user" }
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadID: threadId,
          message: messageToSend
        })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply || "No response", sender: "assistant" }
      ]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Server connection failed ❌", sender: "assistant" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        placeholder="Type a context like: college, office, party..."
      />
      <button onClick={() => sendMessage()} disabled={isTyping}>
        {isTyping ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}

export default ChatInput;
