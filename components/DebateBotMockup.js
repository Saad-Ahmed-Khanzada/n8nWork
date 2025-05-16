import React, { useState } from 'react';

const DebateBotMockup = () => {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(1);
  
  const startDemo = () => {
    setStarted(true);
    setTimeout(() => {
      setRound(2);
      setTimeout(() => {
        setRound(3);
      }, 3000);
    }, 3000);
  };
  
  return (
    <div className="mockup-container">
      <div className="mockup-header">
        <h2>AI Debate Bot - Visual Preview</h2>
        <p>Here's how your application will look once implemented</p>
      </div>
      
      <div className="mockup-browser">
        <div className="browser-header">
          <div className="browser-buttons">
            <div className="browser-button red"></div>
            <div className="browser-button yellow"></div>
            <div className="browser-button green"></div>
          </div>
          <div className="browser-address">https://your-debate-bot.app</div>
        </div>
        
        <div className="browser-content">
          <div className="app-header">
            <h1>AI Debate Bot</h1>
            <p>Watch two AI bots debate topics of your choice</p>
          </div>
          
          <div className="input-section">
            <div className="input-wrapper">
              <input 
                type="text" 
                readOnly 
                value={started ? "Provide a debate about India Pakistan war" : ""}
                placeholder="Type a debate topic prompt..."
                className="mock-input"
              />
              <button 
                className="mock-button"
                onClick={startDemo}
                disabled={started}
              >
                {started ? "Starting Debate..." : "Start Debate"}
              </button>
            </div>
          </div>
          
          {started && (
            <>
              <div className="topic-section">
                <h2>Debate Topic:</h2>
                <p>The India-Pakistan war has led to long-term regional instability in South Asia.</p>
              </div>
              
              <div className="rounds-section">
                <div className="debate-round">
                  <h3>Round 1</h3>
                  <div className="sides-container">
                    <div className="side supporting">
                      <h4>Supporting Arguments</h4>
                      <ul>
                        <li>
                          <h5>Regional Power Imbalance</h5>
                          <p>The wars created significant military imbalances that persist today.</p>
                        </li>
                        <li>
                          <h5>Territorial Disputes</h5>
                          <p>Unresolved territory issues like Kashmir continue to fuel tensions.</p>
                        </li>
                        <li>
                          <h5>Economic Impact</h5>
                          <p>Massive defense spending diverted resources from development needs.</p>
                        </li>
                      </ul>
                    </div>
                    <div className="side opposing">
                      <h4>Opposing Arguments</h4>
                      <ul>
                        <li>
                          <h5>Diplomatic Channels</h5>
                          <p>Both nations have established diplomatic methods to handle tensions.</p>
                        </li>
                        <li>
                          <h5>Regional Integration</h5>
                          <p>Organizations like SAARC have improved cooperation despite conflicts.</p>
                        </li>
                        <li>
                          <h5>External Stabilizers</h5>
                          <p>International community involvement has prevented further escalation.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {round >= 2 && (
                  <div className="debate-round new-round">
                    <h3>Round 2</h3>
                    <div className="sides-container">
                      <div className="side supporting">
                        <h4>Supporting Arguments</h4>
                        <ul>
                          <li>
                            <h5>Nuclear Proliferation</h5>
                            <p>The conflicts led both countries to develop nuclear weapons, creating constant tension.</p>
                          </li>
                          <li>
                            <h5>Proxy Conflicts</h5>
                            <p>The rivalry has expanded to proxy engagements across the region.</p>
                          </li>
                        </ul>
                      </div>
                      <div className="side opposing">
                        <h4>Opposing Arguments</h4>
                        <ul>
                          <li>
                            <h5>Nuclear Deterrence</h5>
                            <p>The nuclear capabilities have actually prevented major conflicts since 1998.</p>
                          </li>
                          <li>
                            <h5>Bilateral Progress</h5>
                            <p>Trade relations and cultural exchanges have improved despite political tensions.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {round >= 3 && (
                  <div className="debate-round new-round">
                    <h3>Round 3</h3>
                    <div className="sides-container">
                      <div className="side supporting">
                        <h4>Supporting Arguments</h4>
                        <ul>
                          <li>
                            <h5>Internal Radicalization</h5>
                            <p>The conflict has fueled extremism on both sides of the border.</p>
                          </li>
                          <li>
                            <h5>Diplomatic Isolation</h5>
                            <p>Regional cooperation is severely hampered by continued hostilities.</p>
                          </li>
                        </ul>
                      </div>
                      <div className="side opposing">
                        <h4>Opposing Arguments</h4>
                        <ul>
                          <li>
                            <h5>Economic Imperatives</h5>
                            <p>Growing economic needs are pushing both nations toward more cooperation.</p>
                          </li>
                          <li>
                            <h5>Public Opinion Shift</h5>
                            <p>Younger generations increasingly favor peaceful relations over conflict.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {!started && (
        <div className="demo-instruction">
          Click "Start Debate" above to see how the debate will appear
        </div>
      )}
      
      <style jsx>{`
        .mockup-container {
          width: 100%;
          max-width: 900px;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .mockup-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .mockup-header h2 {
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .mockup-header p {
          color: #666;
        }
        
        .mockup-browser {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          background: white;
        }
        
        .browser-header {
          background: #f1f3f4;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
        }
        
        .browser-buttons {
          display: flex;
          margin-right: 1rem;
        }
        
        .browser-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 6px;
        }
        
        .red { background-color: #ff5f56; }
        .yellow { background-color: #ffbd2e; }
        .green { background-color: #27c93f; }
        
        .browser-address {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          flex-grow: 1;
          font-size: 0.8rem;
          color: #666;
        }
        
        .browser-content {
          padding: 1.5rem;
          max-height: 600px;
          overflow-y: auto;
        }
        
        .app-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .app-header h1 {
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 2rem;
        }
        
        .app-header p {
          color: #666;
        }
        
        .input-section {
          margin-bottom: 2rem;
        }
        
        .input-wrapper {
          display: flex;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .mock-input {
          flex-grow: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
        }
        
        .mock-button {
          padding: 0.75rem 1.5rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          font-size: 1rem;
          cursor: pointer;
        }
        
        .mock-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .topic-section {
          background-color: #e3f2fd;
          padding: 1rem;
          border-radius: 4px;
          text-align: center;
          margin-bottom: 2rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .topic-section h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }
        
        .topic-section p {
          margin: 0;
          font-weight: bold;
        }
        
        .rounds-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .debate-round {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .debate-round h3 {
          margin: 0;
          padding: 0.75rem;
          background-color: #f0f0f0;
          text-align: center;
          font-size: 1.1rem;
        }
        
        .sides-container {
          display: flex;
        }
        
        .side {
          flex: 1;
          padding: 1rem;
        }
        
        .side h4 {
          text-align: center;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .side ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .side li {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .side li:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .side h5 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        
        .side p {
          margin: 0;
          font-size: 0.9rem;
          color: #333;
        }
        
        .supporting {
          background-color: #e8f5e9;
          border-right: 1px solid #ddd;
        }
        
        .opposing {
          background-color: #ffebee;
        }
        
        .new-round {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .demo-instruction {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: #fff9c4;
          border-radius: 4px;
          text-align: center;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .sides-container {
            flex-direction: column;
          }
          
          .supporting {
            border-right: none;
            border-bottom: 1px solid #ddd;
          }
        }
      `}</style>
    </div>
  );
};

export default DebateBotMockup;