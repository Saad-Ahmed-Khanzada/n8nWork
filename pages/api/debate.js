export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userPrompt } = req.body;
    console.log('Received user prompt:', userPrompt);
    
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    console.log('Sending to n8n:', n8nWebhookUrl);
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPrompt }),
    });
    
    // Log the response status
    console.log('n8n response status:', response.status);
    
    // Get the raw response text
    const responseText = await response.text();
    console.log('Raw n8n response:', responseText);
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed n8n response:', data);
      
      // NO MODIFICATIONS - Just return the data we received
      return res.status(200).json(data);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return res.status(500).json({ 
        error: 'Invalid response from n8n service',
        message: responseText
      });
    }
  } catch (error) {
    console.error('Error connecting to n8n:', error);
    return res.status(500).json({ 
      error: 'Failed to connect to debate bot service',
      message: error.message 
    });
  }
}