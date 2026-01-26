import React from 'react';
import styles from "./SuggestionCard.module.css";


const SuggestionCard = ({ title, desc, icon }) => (
  <div className={styles.card}>
    <div className={styles.icon}>{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default SuggestionCard;