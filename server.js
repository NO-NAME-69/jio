// ==========================================================================
// Jio Next - Local Development Server on Port 6969
// Pure Node.js Standard Library (Zero External Dependencies)
// ==========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

// Port configuration: Defaults to 6969
const DEFAULT_PORT = 6969;
const portArg = process.argv[2] ? parseInt(process.argv[2], 10) : null;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : (portArg || DEFAULT_PORT);

// Base directory for static files
const BASE_DIR = path.resolve(__dirname);

// Comprehensive MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.htm': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse path using modern WHATWG URL API
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize path & prevent directory traversal
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.join(BASE_DIR, safePath);

  // Ensure filePath stays inside BASE_DIR
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Forbidden: Access denied.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>404 Not Found</title><style>body{background:#050b14;color:#f8fafc;font-family:sans-serif;padding:40px;text-align:center}a{color:#00e5ff}</style></head>
          <body>
            <h1>404 - Page Not Found</h1>
            <p>The requested file <code>${pathname}</code> was not found on this server.</p>
            <p><a href="/">Return to Jio Next Homepage &rarr;</a></p>
          </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`500 Internal Server Error: ${err.message}`);
      }
      return;
    }

    let targetPath = filePath;
    if (stats.isDirectory()) {
      targetPath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(targetPath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`500 Error reading file: ${readErr.message}`);
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    });
  });
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    const localUrl = `http://localhost:${PORT}`;
    const networkUrl = `http://127.0.0.1:${PORT}`;

    console.log('\n========================================================');
    console.log('   🚀 JIO NEXT - DIGITAL LIFE REIMAGINED');
    console.log('========================================================');
    console.log(`   🟢 Server is running on port: ${PORT}`);
    console.log(`   👉 Local URL:   ${localUrl}`);
    console.log(`   👉 Network:     ${networkUrl}`);
    console.log('========================================================');
    console.log('   Press Ctrl+C to stop the server anytime.\n');
  });
}

module.exports = server;
