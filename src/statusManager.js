const { redisClient, publisher } = require('./redis');

const STATUS_CHANNEL = 'user:status:updates';

class StatusManager {
  static async setStatus(userID, status) {
    await redisClient.set(`user:${userID}:status`, status, { EX: 300 }); // Expire in 5 mins
    await publisher.publish(STATUS_CHANNEL, JSON.stringify({ userID, status }));
  }

  static async getStatus(userID) {
    return await redisClient.get(`user:${userID}:status`);
  }

  static subscribeToUpdates(callback) {
    const { subscriber } = require('./redis');
    subscriber.subscribe(STATUS_CHANNEL);
    subscriber.on('message', (channel, message) => {
      if (channel === STATUS_CHANNEL) {
        callback(JSON.parse(message));
      }
    });
  }
}

module.exports = StatusManager;
