import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function apiPlugin() {
  return {
    name: 'api-endpoints',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        // ── 1. Contact Form Endpoint ──
        if (req.method === 'POST' && req.url === '/api/contact') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const entry = { ...data, timestamp: new Date().toISOString() };

              // Always save instantly to local database
              const dataDir = path.resolve(process.cwd(), 'data');
              if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
              const filePath = path.join(dataDir, 'messages.json');
              let existing = [];
              if (fs.existsSync(filePath)) {
                try { existing = JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch (e) {}
              }
              existing.push(entry);
              fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

              // Respond immediately (instant UI response)
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Message stored in database' }));

              // Background sync to MongoDB Atlas
              const env = loadEnv('', process.cwd(), '');
              const mongoUri = env.MONGODB_URI || process.env.MONGODB_URI;

              if (mongoUri && !mongoUri.includes('<')) {
                import('mongodb').then(async ({ MongoClient }) => {
                  try {
                    const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 4000 });
                    await client.connect();
                    const db = client.db('portfolio');
                    await db.collection('messages').insertOne(entry);
                    await client.close();
                    console.log('✅ Message saved to MongoDB Atlas');
                  } catch (mongoErr) {
                    console.warn('⚠️ MongoDB Atlas sync note (saved locally):', (mongoErr as any)?.message || mongoErr);
                  }
                }).catch(() => {});
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Error saving message' }));
            }
          });
          return;
        }

        // ── 2. Feedback Endpoint ──
        if (req.method === 'POST' && req.url === '/api/feedback') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const entry = { ...data, timestamp: new Date().toISOString() };

              // Local save
              const dataDir = path.resolve(process.cwd(), 'data');
              if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
              const filePath = path.join(dataDir, 'feedback.json');
              let existing = [];
              if (fs.existsSync(filePath)) {
                try { existing = JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch (e) {}
              }
              existing.push(entry);
              fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

              // Respond immediately
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Feedback stored in database' }));

              // Background sync to MongoDB Atlas
              const env = loadEnv('', process.cwd(), '');
              const mongoUri = env.MONGODB_URI || process.env.MONGODB_URI;

              if (mongoUri && !mongoUri.includes('<')) {
                import('mongodb').then(async ({ MongoClient }) => {
                  try {
                    const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 4000 });
                    await client.connect();
                    const db = client.db('portfolio');
                    await db.collection('feedback').insertOne(entry);
                    await client.close();
                    console.log('✅ Feedback saved to MongoDB Atlas');
                  } catch (mongoErr) {
                    console.warn('⚠️ MongoDB Atlas sync note (saved locally):', (mongoErr as any)?.message || mongoErr);
                  }
                }).catch(() => {});
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Error saving feedback' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
  server: {
    watch: {
      ignored: ['**/data/**', '**/.env', '**/messages.json', '**/feedback.json']
    }
  }
});
