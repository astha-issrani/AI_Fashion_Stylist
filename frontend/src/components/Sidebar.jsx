import styles from "./Sidebar.module.css";

function Sidebar({ onNewChat }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Fashion AI</h2>
      <button className={styles.button} onClick={onNewChat}>
        + New Conversation
      </button>
    </aside>
  );
}

export default Sidebar;
