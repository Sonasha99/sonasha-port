import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!uri) {
    return res.status(500).json({ error: 'MONGODB_URI is not set in environment variables' });
  }

  let client;
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const entry = { ...data, timestamp: new Date().toISOString() };

    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000
    });
    await client.connect();
    const db = client.db('portfolio');
    await db.collection('messages').insertOne(entry);
    await client.close();

    return res.status(200).json({ success: true, message: 'Message stored in database' });
  } catch (error) {
    if (client) {
      try { await client.close(); } catch (_) {}
    }
    console.error('MongoDB Error:', error);
    return res.status(500).json({ error: error.message || 'Error saving to database' });
  }
}
