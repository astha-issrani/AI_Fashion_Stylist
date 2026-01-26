import React from 'react';
import Sidebar from './components/Sidebar';
import SuggestionCard from './components/SuggestionCard';
import styles from './App.css';

function App() {
  const suggestions = [
    { title: "Job Interview", desc: "Professional outfit suggestions", icon: "💼" },
    { title: "Weekend Casual", desc: "Comfortable and stylish looks", icon: "☕" },
    { title: "Color Analysis", desc: "Find your perfect palette", icon: "🎨" },
    { title: "Seasonal Style", desc: "Trendy seasonal outfits", icon: "🌸" }
  ];

  return (
    <div className={styles.mainContainer}>
      <Sidebar />
      <div className={styles.contentArea}>
        <header className={styles.header}>
          👕 AI Personal Stylist
        </header>
        
        <div className={styles.hero}>
          <h1>✨ Your AI Fashion Stylist ✨</h1>
          <p>Get personalized style advice, outfit recommendations, and fashion tips!</p>
          
          <div className={styles.suggestionGrid}>
            {suggestions.map((s, i) => (
              <SuggestionCard key={i} {...s} />
            ))}
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            className={styles.chatBar} 
            placeholder="Ask me anything about fashion, styling, outfits..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;