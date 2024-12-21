const redis = require('redis');

const redisClient = redis.createClient({ url: 'redis://127.0.0.1:6379' });
const subscriber = redis.createClient({ url: 'redis://127.0.0.1:6379' });
const publisher = redis.createClient({ url: 'redis://127.0.0.1:6379' });

(async () => {
  await redisClient.connect();
  await subscriber.connect();
  await publisher.connect();
})();

module.exports = { redisClient, subscriber, publisher };
