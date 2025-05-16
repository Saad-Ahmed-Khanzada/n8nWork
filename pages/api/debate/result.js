export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { userPrompt } = req.body;
  
      // Use the result webhook URL
      const n8nWebhookUrl = 'https://saadahmedkz.app.n8n.cloud/webhook-test/debate/result';
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt }),
      });
  
      if (!response.ok) {
        throw new Error(`N8n webhook responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching results:', error);
      return res.status(500).json({ error: 'Failed to fetch debate results' });
    }
  }