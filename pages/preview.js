// pages/preview.js
import Head from 'next/head';
import DebateBotMockup from '../components/DebateBotMockup';
import Link from 'next/link';

export default function Preview() {
  return (
    <div className="container">
      <Head>
        <title>AI Debate Bot - Preview</title>
        <meta name="description" content="Preview of the AI Debate Bot interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="navigation">
          <Link href="/">
            <a className="back-link">← Back to Real Application</a>
          </Link>
        </div>
        
        <DebateBotMockup />
        
        <div className="implementation-notes">
          <h2>Implementation Notes</h2>
          <p>
            This preview demonstrates how the finished application will look and function.
            The actual implementation integrates with your n8n workflow via webhooks and WebSockets.
          </p>
          
          <h3>Key Features Shown:</h3>
          <ul>
            <li>User input for custom debate topics (like "India Pakistan war")</li>
            <li>Clear display of the debate topic</li>
            <li>Side-by-side presentation of supporting and opposing arguments</li>
            <li>Multiple rounds of debate with animations</li>
            <li>Responsive design that works on mobile and desktop</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Configure the n8n webhook integration</li>
            <li>Set up the Next.js frontend with the provided code</li>
            <li>Test the integration with your debate workflow</li>
            <li>Deploy to production</li>
          </ol>
        </div>
      </main>

      <footer>
        <p>
          AI Debate Bot - Powered by n8n and OpenAI
        </p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1000px;
        }

        .navigation {
          align-self: flex-start;
          margin-bottom: 2rem;
        }

        .back-link {
          color: #0070f3;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .implementation-notes {
          margin-top: 3rem;
          padding: 2rem;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          width: 100%;
          background-color: #fafafa;
        }

        .implementation-notes h2 {
          margin-top: 0;
          color: #333;
        }

        .implementation-notes h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #0070f3;
        }

        .implementation-notes ul, .implementation-notes ol {
          padding-left: 1.5rem;
        }

        .implementation-notes li {
          margin-bottom: 0.5rem;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer p {
          color: #666;
        }
      `}</style>
    </div>
  );
}