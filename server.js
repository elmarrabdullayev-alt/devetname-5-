import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Disable fingerprinting header
app.disable('x-powered-by');

// Health check endpoint for Render monitoring
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist with correct MIME types and caching
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.webm')) {
        res.setHeader('Content-Type', 'video/webm');
      } else if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.mp3')) {
        res.setHeader('Content-Type', 'audio/mpeg');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }

      // Long-term immutable caching for hashed Vite assets
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);

// SPA fallback: Return index.html for any direct route visits
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
