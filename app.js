var app = require("./config/server.js");
var client = require("./config/twitter.js");
var yql = require("yql");
var CronJob = require("cron").CronJob;
var db = require("./config/database.js");
var moment = require("moment");

//Set the available port or 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Set the available host
var server_host = process.env.YOUR_HOST || '0.0.0.0';

function newReply(result, callbackFunction) {
    try {
        if (typeof result !== "undefined" && typeof result.query.results.channel.item.forecast !== "undefined") {
            var data = result.query.results.channel.item.forecast;
            var todayHigh, todayLow, tomorrowHigh, tomorrowLow;
            var location = result.query.results.channel.location;

            todayHigh = data[0].high;
            todayLow = data[0].low;
            tomorrowHigh = data[1].high;
            tomorrowLow = data[1].low;

            callbackFunction("Oi bb, a temperatura para " + location.city + " -" + location.region
                + ", " + location.country + " hoje será " + todayHigh
                + "ºC/" + todayLow + "ºC." + " Já pra amanhã a temperatura será "
                + tomorrowHigh + "ºC/" + tomorrowLow + "ºC. Volte sempre haha :)" + " #clima #sãoPaulo");
        }
    }
    catch (e) {
        console.warn("ERROR on Yahoo Weather API response.");
        console.log("Response = ", e);
        return;
    }
}

function getMessage(result, callbackFunction) {
    try {
        if (typeof result !== "undefined" && typeof result.query.results.channel.item.forecast !== "undefined") {
            var data = result.query.results.channel.item.forecast;
            var todayHigh, todayLow, tomorrowHigh, tomorrowLow;

            todayHigh = data[0].high;
            todayLow = data[0].low;
            tomorrowHigh = data[1].high;
            tomorrowLow = data[1].low;

            db.findTweet(parseInt(data[0].code), "today", function (todayResults) {
                var i = Math.floor(Math.random() * ((todayResults.length - 1) - 0 + 1)) + 0; //gets a random tweet about this code

                db.findTweet(parseInt(data[0].code), "tomorrow", function (tomorrowResults) {
                    var j = Math.floor(Math.random() * ((tomorrowResults.length - 1) - 0 + 1)) + 0; //gets a random tweet about this code

                    callbackFunction("hoje a temperadura será " + todayHigh
                        + "ºC/" + todayLow + "ºC. " + todayResults[i].text + " Já pra amanhã temos "
                        + tomorrowHigh + "ºC/" + tomorrowLow + "ºC. " + tomorrowResults[j].text + " #clima #sãoPaulo");
                });
            });
        }
    }
    catch (e) {
        console.warn("ERROR on Yahoo Weather API response.");
        console.log("Response = ", e);
        //Starts a jobs to keep trying to get results from the API
        retryJob.start();

        //Verifies if the cron job started.
        if (retryJob.running)
            console.log("Cron job - retry started.");
        else
            console.warn("Cron job - retry didn't started.");

        return;
    }

}

function getWeather(location, callbackFunction) {
    location = location.toLowerCase();
    location = '"' + location + '"';
    console.log("getWeather location =", location);
    //Creates a query
    var query = new yql('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=' + location + ') and u="c"');

    //Executes the query
    query.exec(function (err, result) {
        callbackFunction(result);
    });
}

var mentionsJob = new CronJob("00 */30 * * * 1-7", function () {
    //Runs every 30th minute
    console.log("Executing Cron job - mentions");
    client.getMentions(function (result) {
        let date = new Date();
        date.setDate(date.getDate());
        date = moment(date).format("YYYY-MM-DD HH:mm:ss");

        result.map((item, i) => {
            let createAt = moment(item.created_at).format("YYYY-MM-DD HH:mm:ss");
            let ms = moment(date).diff(createAt);
            let difference = moment.duration(ms);
            let yearCreateAt = createAt.substring(0, 4);
            let monthCreateAt = createAt.substring(5, 7);
            let dayCreateAt = createAt.substring(8, 10);
            let yearDate = date.substring(0, 4);
            let monthDate = date.substring(5, 7);
            let dayDate = date.substring(8, 10);
            //Only gets the last 30 minutes tweets.
            if ((yearCreateAt == yearDate && monthCreateAt == monthDate && dayCreateAt == dayDate) &&
                (difference.hours() < 1 && difference.minutes() <= 30)) {
                let copying = false;
                let local = {
                    text: "",
                    opened: false,
                    valid: false
                };
                for (i = 0; i < item.text.length; i++) {
                    //Copies the local from the tweet.
                    if (item.text[i] == '"' || item.text[i] == '“' || item.text[i] == '”') {
                        copying = !copying;
                        if (!local.opened)//Verifies if it was already copying
                            local.opened = !local.opened;
                        else {
                            local.valid = !local.valid;
                            break;
                        }
                    }
                    else if (copying)
                        local.text += item.text[i];
                }
                if (local.valid) {
                    let username = "@" + item.user.screen_name;
                    getWeather(local.text, function (data) {
                        newReply(data, function (result) {
                            if (typeof result !== "undefined") {
                                let tweet = username + " " + result;
                                //client.newReply(tweet, item.id_str);
                                client.tweet(tweet);
                            }
                            else console.warn("Error on newReply()");
                        });
                    });
                }
            }
        });
    });

},
    function () {
        //This function is executed when the job stops
        console.log("Cron job - mentions stopped.")
    },
    true, //Start the job right now
    "America/Sao_Paulo" //Time zone of this job.
);

var morningJob = new CronJob("00 00 05 * * 1-7", function () {
    //Runs every day at 05:00:00
    console.log("Executing Cron job - morning");
    getWeather("são paulo, br", function (data) {
        getMessage(data, function (result) {
            if (typeof result !== "undefined")
                client.tweet("Bom dia bbs, " + result);
            else console.warn("Error on getMessage()");
        });
    });

},
    function () {
        //This function is executed when the job stops
        console.log("Cron job - morning stopped.")
    },
    true, //Start the job right now
    "America/Sao_Paulo" //Time zone of this job.
);

var afternoonJob = new CronJob("00 00 13 * * 1-7", function () {
    //Runs every day at 13:00:00
    console.log("Executing Cron job - afternoon");
    getWeather("são paulo, br", function (data) {
        getMessage(data, function (result) {
            if (typeof result !== "undefined")
                client.tweet("Boa tarde bbs, " + result);
            else console.warn("Error on getMessage()");
        });
    });

},
    function () {
        //This function is executed when the job stops
        console.log("Cron job - afternoon stopped.")
    },
    true, //Start the job right now
    "America/Sao_Paulo" //Time zone of this job.
);

var nightJob = new CronJob("00 00 18 * * 1-7", function () {
    //Runs every day at 18:30:00
    console.log("Executing Cron job - night");
    getWeather("são paulo, br", function (data) {
        getMessage(data, function (result) {
            if (typeof result !== "undefined")
                client.tweet("Boa noite bbs, " + result);
            else console.warn("Error on getMessage()");
        });
    });

},
    function () {
        //This function is executed when the job stops
        console.log("Cron job - night stopped.")
    },
    true, //Start the job right now
    "America/Sao_Paulo" //Time zone of this job.
);

var retryJob = new CronJob("00 00 * * * 1-7", function () {
    //Runs every hour when after a job fails
    getWeather("são paulo, br", function (data) {
        getMessage(data, function (result) {
            if (typeof result !== "undefined") {
                client.tweet("E aí bbs, " + result);
                retryJob.stop(); //Stops the Cron Job retry after tweets
            }
            else console.warn("Error on getMessage()");
        });
    });
},
    function () {
        //This function is executed when the job stops
        console.log("Cron job - retry stopped.");
    },
    false, //Start the job right now
    "America/Sao_Paulo" //Time zone of this job.
);

//Verifies if the mentions job started.
if (morningJob.running)
    console.log("Cron job - mentions job started.");
else
    console.warn("Cron job - mentions didn't started.");

//Verifies if the morning cron job started.
if (morningJob.running)
    console.log("Cron job - morning started.");
else
    console.warn("Cron job - morning didn't started.");

//Verifies if the afternoon cron job started.
if (afternoonJob.running)
    console.log("Cron job - afternoon started.");
else
    console.warn("Cron job - afternoon didn't started.");

//Verifies if the night cron job started.
if (nightJob.running)
    console.log("Cron job - night started.");
else
    console.warn("Cron job - night didn't started.");


app.listen(server_port, server_host, function () {
    console.log("Application online.");
});

client.newStream();