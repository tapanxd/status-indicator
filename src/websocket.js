const { WebSocketServer } = require('ws');
const StatusManager = require('./statusManager');

class WebSocketManager {
  constructor() {
    this.connections = new Map(); // Map of userID to WebSocket
  }

  initialize(server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws, req) => {
      const userID = req.headers['x-user-id']; // Assuming userID is passed in headers
      if (!userID) {
        ws.close();
        return;
      }

      this.connections.set(userID, ws);
      StatusManager.setStatus(userID, 'online');

      ws.on('message', (message) => {
        const { status } = JSON.parse(message);
        if (['online', 'offline', 'away'].includes(status)) {
          StatusManager.setStatus(userID, status);
        }
      });

      ws.on('close', () => {
        StatusManager.setStatus(userID, 'offline');
        this.connections.delete(userID);
      });
    });
  }
}

module.exports = new WebSocketManager();
