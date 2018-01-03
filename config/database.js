var MongoClient = require('mongodb').MongoClient;
var client = {};


client.findTweet = function (code, type, callbackFunction) {
    MongoClient.connect(process.env.dbURI, function (err, database) {
        if (err) console.warn("Error connecting to Database =", err);
        else {
            console.log("Database connected.");
            const db = database.db('weather-twitter');
            db.collection('tweets', function (err, collection) {
                console.log("Collection found.");
                collection.find({ "code": code, "type": type }).toArray(function (err, results) {
                    if (err) console.warn("Error on collection.find() method = ", err);
                    else
                        callbackFunction(results);
                });

            });
        }
    });
}

module.exports = client;