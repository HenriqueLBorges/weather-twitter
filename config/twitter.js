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