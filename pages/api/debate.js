export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userPrompt } = req.body;
    console.log('Received user prompt:', userPrompt);
    
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://saadahmedkz.app.n8n.cloud/webhook/debate';
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
      
      // Check if we have the expected structure
      if (!data.debate_result && responseText.includes('debate_result')) {
        // Try to fix the structure if possible
        try {
          const fixedData = { debate_result: JSON.parse(responseText) };
          console.log('Fixed data structure:', fixedData);
          return res.status(200).json(fixedData);
        } catch (e) {
          console.error('Failed to fix data structure:', e);
        }
      }
      
      // If we have valid JSON but no debate_result, create a mock one for testing
      if (!data.debate_result) {
        console.log('Adding mock debate_result structure');
        data = {
          debate_result: {
            topic: "Climate change",
            supporting_arguments: {
              stance: "Support",
              points: [
                {
                  title: "Test Point 1",
                  description: "Description for test point 1"
                }
              ]
            },
            opposing_arguments: {
              position: "Opposing",
              points: [
                {
                  point: "Test Point 1",
                  detail: "Detail for test point 1"
                }
              ]
            }
          }
        };
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      data = { message: responseText };
    }
    
    // Use the parsed data or our fixed version
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error connecting to n8n:', error);
    return res.status(500).json({ 
      error: 'Failed to connect to debate bot service',
      message: error.message 
    });
  }
}