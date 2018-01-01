var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

client.tweet = client.post('statuses/update', { status: 'Post test.' }, function (error, tweet, response) {
    //if (error) console.log("error");
    //else {
        //console.log("tweet = ", tweet);  // Tweet body. 
        //console.log("response");  // Raw response object. 
    //}
});
module.exports = client;