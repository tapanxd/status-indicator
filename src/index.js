const http = require('http');
const WebSocketManager = require('./websocket');
const StatusManager = require('./statusManager');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('User Status Tracker is running.\n');
});

// Initialize WebSocket
WebSocketManager.initialize(server);

// Example subscription to status updates
StatusManager.subscribeToUpdates((update) => {
  console.log('Status Update:', update);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});