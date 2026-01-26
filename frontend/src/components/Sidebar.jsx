import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = () => (
  <aside className={styles.sidebar}>
    <div className={styles.logo}>Fashion AI</div>
    <button className={styles.newChatBtn}>+ New Conversation</button>
  </aside>
);

export default Sidebar;