// pages/api/check-debate.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { requestId } = req.body;
    
    try {
      // This is where you would check the status of the debate generation
      // For now, we'll simulate checking with n8n by directly calling the webhook again
      // In a production environment, you'd have a separate endpoint to check status
      
      const checkUrl = process.env.N8N_RESULT_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL || 'https://saadahmedkz.app.n8n.cloud/webhook/debate/result';
      
      const response = await fetch(checkUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to check debate status: ${response.status}`);
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error checking debate status:', error);
      return res.status(500).json({ error: error.message });
    }
  }