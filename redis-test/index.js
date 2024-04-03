const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', (err)=> {
  console.error(err);
})

redisClient.set('name', 'redis-test', redis.print);
redisClient.get('name', (err, value) => {
  if (err) {
    console.error(err);
  }
  console.log('name:', value);

  redisClient.quit();
})




