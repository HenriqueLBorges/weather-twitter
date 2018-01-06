var Twit = require('twit')

var client = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

client.getMentions = function (callbackFunction) {
    client.get('statuses/mentions_timeline', function (error, tweets, response) {
        if (error) console.log("Error on Twitter getMentions() -", error);
        else
            callbackFunction(tweets);
    });
}

client.tweet = function (tweet) {
    console.log("Tweet =", tweet);
    client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        if (error) console.log("Error on Twitter tweet() -", error);
        else {
            //console.log("tweet = ", tweet);  // Tweet body. 
            //console.log("response");  // Raw response object. 
            console.log("Tweet sent.");
        }
    });
}

client.newReply = function (tweet, twitterID) {
    console.log("Replie =", tweet);
    client.post('statuses/update.json?in_reply_to_status_id=' + twitterID, { status: tweet }, function (error, tweet, response) {
        if (error) console.log("Error on Twitter newReply() -", error);
        else {
            //console.log("tweet = ", tweet);  // Tweet body. 
            //console.log("response");  // Raw response object. 
            console.log("Replie sent.");
        }
    });
}

client.newStream = function () {
    var stream = client.stream('user');

    stream.on('connect', function (request) {
        console.log("Connecting Twitter Stream...");
    });

    stream.on('connected', function (request) {
        console.log("Twitter stream connected.");
    });

    stream.on('disconnect', function (disconnectMessage) {
        console.log("Twitter stream disconnected.");
    });

    stream.on('error', function (error) {
        console.log("Error on Twitter Stream", error);
    });

    stream.on('limit', function (limitMessage) {
        console.log("New limitation message on Twitter Stream -", limitMessage);
    });

    stream.on('status_withheld', function (withheldMessage) {
        console.log("Status - Twitter was withheld.");
        console.log("Withheld Message -", withheldMessage);
    });

    stream.on('user_withheld', function (withheldMessage) {
        console.log("Status - The account was withheld.");
        console.log("Withheld Message -", withheldMessage);
    });

    //User events
    stream.on('favorite', function (event) {
        var username = "@" + event.source.screen_name;
        console.log(username, "favorited an account's tweet.");
    });

    stream.on('follow', function (event) {
        var username = event.source.screen_name;
        console.log(username, "followed the account.");
        client.tweet("Obrigado por me seguir bb @" + username);
    });

    stream.on('unfollow', function (event) {
        var username = event.source.screen_name;
        console.log(username, "followed the account.");
        client.tweet("bb @" + username + " parou de me seguir.");
    });
}
module.exports = client;