// components/DebateFlowDiagram.js
import React from 'react';

const DebateFlowDiagram = () => {
  return (
    <div className="flow-diagram-container">
      <h3>How the Debate Bot Works</h3>
      
      <div className="flow-diagram">
        <div className="flow-node user-input">
          <div className="node-icon">👤</div>
          <div className="node-title">User Input</div>
          <div className="node-desc">User provides a topic</div>
        </div>
        
        <div className="flow-arrow">→</div>
        
        <div className="flow-node judge">
          <div className="node-icon">⚖️</div>
          <div className="node-title">Judge Bot</div>
          <div className="node-desc">Processes or generates topic</div>
        </div>
        
        <div className="flow-arrow">→</div>
        
        <div className="flow-branch">
          <div className="flow-branch-item">
            <div className="flow-arrow down">↓</div>
            <div className="flow-node support">
              <div className="node-icon">👍</div>
              <div className="node-title">Party 1: Support</div>
              <div className="node-desc">Generates supporting arguments</div>
            </div>
          </div>
          
          <div className="flow-branch-item">
            <div className="flow-arrow down">↓</div>
            <div className="flow-node oppose">
              <div className="node-icon">👎</div>
              <div className="node-title">Party 2: Oppose</div>
              <div className="node-desc">Generates opposing arguments</div>
            </div>
          </div>
        </div>
        
        <div className="flow-merge">
          <div className="flow-arrow up">↑</div>
          <div className="flow-arrow up">↑</div>
        </div>
        
        <div className="flow-node timeout">
          <div className="node-icon">⏱️</div>
          <div className="node-title">Timeout Check</div>
          <div className="node-desc">Checks if responses took &gt; 20s</div>
        </div>
        
        <div className="flow-arrow">→</div>
        
        <div className="flow-node result">
          <div className="node-icon">📊</div>
          <div className="node-title">Result</div>
          <div className="node-desc">Displays debate to user</div>
        </div>
      </div>
      
      <style jsx>{`
        .flow-diagram-container {
          margin-top: 3rem;
          margin-bottom: 3rem;
          width: 100%;
          max-width: 800px;
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .flow-diagram-container h3 {
          text-align: center;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        
        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .flow-node {
          background-color: white;
          border-radius: 8px;
          padding: 1rem;
          width: 200px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin: 0.5rem 0;
        }
        
        .node-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .node-title {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        
        .node-desc {
          font-size: 0.8rem;
          color: #666;
        }
        
        .flow-arrow {
          font-size: 1.5rem;
          margin: 0.5rem 0;
          color: #666;
        }
        
        .flow-branch {
          display: flex;
          justify-content: center;
          width: 100%;
          gap: 2rem;
        }
        
        .flow-branch-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .flow-merge {
          display: flex;
          justify-content: center;
          width: 100%;
          gap: 8rem;
        }
        
        .user-input {
          border-left: 4px solid #e91e63;
        }
        
        .judge {
          border-left: 4px solid #9c27b0;
        }
        
        .support {
          border-left: 4px solid #4caf50;
        }
        
        .oppose {
          border-left: 4px solid #f44336;
        }
        
        .timeout {
          border-left: 4px solid #ff9800;
        }
        
        .result {
          border-left: 4px solid #2196f3;
        }
        
        @media (max-width: 600px) {
          .flow-branch {
            flex-direction: column;
            gap: 0;
          }
          
          .flow-merge {
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DebateFlowDiagram;