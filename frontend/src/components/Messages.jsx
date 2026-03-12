function Messages({ messages, isTyping }) {
  return (
    <div className="messages">
      {messages.map((msg, index) => {
        if (msg.sender === "assistant") {
          const outfits = msg.text
            .split("Outfit")
            .slice(1); // remove first empty part

          return (
            <div key={index} className="assistant-message">
              <div className="outfit-grid">
                {outfits.map((outfit, i) => (
                  <div key={i} className="outfit-card">
                    <pre>{`Outfit ${outfit}`}</pre>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // USER MESSAGE (unchanged)
        return (
          <div key={index} className="user-message">
            {msg.text}
          </div>
        );
      })}

      {isTyping && <div className="typing">Stylist is typing… ✨</div>}
    </div>
  );
}

export default Messages;
