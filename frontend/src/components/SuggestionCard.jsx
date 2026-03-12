import "./SuggestionCard.module.css";

function SuggestionCard({ title, desc, icon, onClick }) {
  return (
    <div className="suggestion-card" onClick={onClick}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default SuggestionCard;
