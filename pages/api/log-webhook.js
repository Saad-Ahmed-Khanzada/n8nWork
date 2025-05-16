// pages/api/log-webhook.js
export default async function handler(req, res) {
    console.log('Received webhook data:', req.body);
    res.status(200).json({ message: 'Data logged' });
  }