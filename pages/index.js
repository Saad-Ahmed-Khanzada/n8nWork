import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import DebateRound from '../components/DebateRound';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debateRounds, setDebateRounds] = useState([]);
  const [debateEnded, setDebateEnded] = useState(false);
  const [topic, setTopic] = useState('');
  
  // Function to handle user input submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please enter a topic or prompt for the debate.');
      return;
    }
    
    setLoading(true);
    setDebateEnded(false);
    setError(null);
    setDebateRounds([]);
    setTopic('');
    
 // In your handleSubmit function
try {
  console.log('Sending request to API...');
  
  const response = await fetch('/api/debate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userPrompt: userInput }),
  });

  console.log('API response status:', response.status);
  
  if (!response.ok) {
    throw new Error(`Failed to start debate: ${response.status}`);
  }

  // Get the raw response text first to see exactly what's coming back
  const responseText = await response.text();
  console.log('Raw API response text:', responseText);
  
  // Parse it ourselves
  let responseData;
  try {
    responseData = JSON.parse(responseText);
  } catch (e) {
    console.error('Error parsing API response:', e);
    throw new Error('Invalid JSON in API response');
  }
  
  console.log('Parsed API response:', responseData);
  
  // Check if we have debate results
  if (responseData && responseData.debate_result) {
    console.log('Found debate_result in response data');
    
    const { topic, supporting_arguments, opposing_arguments } = responseData.debate_result;
    console.log('Extracted components:', { topic, supporting_arguments, opposing_arguments });
    
    // Set the topic
    setTopic(topic);
    
    // Set debate rounds
    setDebateRounds([
      {
        round: 1,
        supporting: supporting_arguments,
        opposing: opposing_arguments
      }
    ]);
  } else {
    console.error('No debate_result found in response data:', responseData);
    setError('Received response but no debate data was found');
  }
  
  setLoading(false);
} catch (err) {
  setError(err.message);
  console.error('Error:', err);
  setLoading(false);
}
  };

  return (
    <div className="container">
      <Head>
        <title>AI Debate Bot</title>
        <meta name="description" content="AI Debate Bot powered by n8n" />
      </Head>

      <main className="main">
        <h1 className="title">AI Debate Bot</h1>
        <p className="subtitle">Watch two AI bots debate topics of your choice</p>
        
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a debate topic prompt (e.g., 'Provide a debate about climate change')"
            className="input"
            required
          />
          <button 
            type="submit" 
            className="button"
            disabled={loading}
          >
            {loading ? 'Starting Debate...' : 'Start Debate'}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <p>Generating debate...</p>
            <div className="spinner"></div>
          </div>
        )}
        
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        
        {topic && (
          <div className="topic">
            <h2>Debate Topic:</h2>
            <p>{topic}</p>
          </div>
        )}

        <div className="debate-container">
          {debateRounds.map((round, index) => (
            <DebateRound
              key={index}
              round={round.round || index + 1}
              supporting={round.supporting}
              opposing={round.opposing}
            />
          ))}
        </div>

        {debateEnded && (
          <div className="debate-ended">
            <p>The debate has ended.</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        
        .main {
          padding: 4rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 800px;
        }
        
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
        }
        
        .subtitle {
          margin-top: 0.5rem;
          font-size: 1.2rem;
          color: #666;
          text-align: center;
        }
        
        .form {
          display: flex;
          max-width: 800px;
          width: 100%;
          margin: 2rem 0;
        }
        
        .input {
          flex: 1;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
        }
        
        .button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .button:hover {
          background: #0051a8;
        }
        
        .button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .loading, .error, .debate-ended {
          padding: 1rem;
          border-radius: 4px;
          width: 100%;
          text-align: center;
          margin: 1rem 0;
        }
        
        .loading {
          background: #f0f0f0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .spinner {
          margin-top: 1rem;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: #0070f3;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error {
          background: #ffebee;
          color: #d32f2f;
        }
        
        .topic {
          background: #e3f2fd;
          padding: 1rem;
          border-radius: 4px;
          width: 100%;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .topic h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        
        .topic p {
          margin: 0;
          font-weight: bold;
        }
        
        .debate-container {
          width: 100%;
        }
        
        .debate-ended {
          background: #fff9c4;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}