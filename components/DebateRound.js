import { useState } from 'react';

export default function DebateRound({ round, supporting, opposing }) {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const formatPoints = (content) => {
    try {
      let points = [];
      let stance = '';
      
      if (typeof content === 'string') {
        // Try to parse if it's a string
        try {
          const parsed = JSON.parse(content);
          points = parsed.points || [];
          stance = parsed.stance || parsed.position || '';
        } catch {
          // If parsing fails, just return the string
          return <p>{content}</p>;
        }
      } else {
        points = content.points || [];
        stance = content.stance || content.position || '';
      }
      
      // For Party 1 (Support)
      if (stance === "Support" || content.stance === "Support") {
        return (
          <div>
            <h3>Stance: {stance}</h3>
            <ul className="points-list">
              {points.map((point, index) => (
                <li key={index}>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      } 
      // For Party 2 (Oppose)
      else if (stance === "Opposing" || content.position === "Opposing") {
        return (
          <div>
            <h3>Position: {stance || "Opposing"}</h3>
            <ul className="points-list">
              {points.map((point, index) => (
                <li key={index}>
                  <h4>{point.point}</h4>
                  <p>{point.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Default case
      return <p>Content could not be displayed properly</p>;
    } catch (error) {
      return <p>Error parsing content: {error.message}</p>;
    }
  };
  
  return (
    <div className="debate-round">
      <div className="round-header" onClick={toggleExpand}>
        <h3 className="round-title">
          Round {round}
          <span className="toggle-icon">{expanded ? '▼' : '►'}</span>
        </h3>
      </div>
      
      {expanded && (
        <div className="debate-sides">
          <div className="side supporting">
            <h3>Supporting Arguments</h3>
            {formatPoints(supporting)}
          </div>
          <div className="side opposing">
            <h3>Opposing Arguments</h3>
            {formatPoints(opposing)}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .round-header {
          cursor: pointer;
          user-select: none;
        }
        
        .toggle-icon {
          float: right;
          margin-right: 1rem;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}