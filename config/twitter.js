var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_key,
    access_token_key: process.env.consumer_key,
    access_token_secret: process.env.access_token_secret
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});
module.exports = client;
/*consumer_key: '54JnaDU5EJvasU5gwyKsLIP6V',
consumer_secret: 'DAu6d4kXwxe2qVrRYb7RMaEnONQzPgq0PnqwvwUjPPs6OZktzm',
access_token_key: '4512577469-KzyN5twu8WkfNggDp58b37QMj93yJWGofOHXFpV',
access_token_secret: 'bLiub9Dwwa0iIvdt5AjNIhpFLJI7aqk4ONhknhey45yCw'*/