var app = require("./config/server.js");
var client = require("./config/twitter.js");
var yql = require('yql');

//Set the available port or 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Set the available host
var server_host = process.env.YOUR_HOST || '0.0.0.0';
function getMessage() {
    var todayHigh, todayLow, tomorrowHigh, tomorrowLow, textToday, textTomorrow;

    todayHigh = data[0].high;
    todayLow = data[0].low;
    tomorrowHigh = data[1].high;
    tomorrowLow = data[1].low;

    switch (data[0].code) {
        case 0: //tornado
            textToday = "";
            break;
        case 1: //tropical storm
            textToday = "";
            break;
        case 2: //hurricane
            textToday = "";
            break;
        case 3: //severe thunderstorms
            textToday = "";
            break;
        case 4: //thunderstorms
            textToday = "";
            break;
        case 5: //mixed rain and snow
            textToday = "";
            break;
        case 6: //mixed rain and sleet
            textToday = "";
            break;
        case 7: //mixed snow and sleet
            textToday = "";
            break;
        case 8: //freezing drizzle
            textToday = "";
            break;
        case 9: //drizzle
            textToday = "";
            break;
        case 10: //freezing rain
            textToday = "";
            break;
        case 11: //showers
            textToday = "";
            break;
        case 12: //showers
            textToday = "";
            break;
        case 13: //snow flurries
            textToday = "";
            break;
        case 14: //light snow showers
            textToday = "";
            break;
        case 15: //blowing snow
            textToday = "";
            break;
        case 16: //snow
            textToday = "";
            break;
        case 17: //hail
            textToday = "";
            break;
        case 18: //sleet
            textToday = "";
            break;
        case 19: //dust
            textToday = "";
            break;
        case 20: //foggy
            textToday = "";
            break;
        case 21: //haze
            textToday = "";
            break;
        case 22: //smoky
            textToday = "";
            break;
        case 23: //blustery
            textToday = "";
            break;
        case 24: //windy
            textToday = "";
            break;
        case 25: //cold
            textToday = "";
            break;
        case 26: //cloudy
            textToday = "";
            break;
        case 27: //mostly cloudy (night)
            textToday = "";
            break;
        case 28: //mostly cloudy (day)
            textToday = "";
            break;
        case 29: //partly cloudy (night)
            textToday = "";
            break;
        case 30: //partly cloudy (day)
            textToday = "";
            break;
        case 31: //clear (night)
            textToday = "";
            break;
        case 32: //sunny
            textToday = "";
            break;
        case 33: //fair (night)
            textToday = "";
            break;
        case 34: //fair (day)
            textToday = "";
            break;
        case 35: //mixed rain and hail
            textToday = "";
            break;
        case 36: //hot
            textToday = "";
            break;
        case 37: //isolated thunderstorms
            textToday = "";
            break;
        case 38: //scattered thunderstorms
            textToday = "";
            break;
        case 39: //scattered thunderstorms
            textToday = "";
            break;
        case 40: //scattered showers
            textToday = "";
            break;
        case 41: //heavy snow
            textToday = "";
            break;
        case 42: //scattered snow showers
            textToday = "";
            break;
        case 43: //heavy snow
            textToday = "";
            break;
        case 44: //partly cloudy
            textToday = "";
            break;
        case 45: //thundershowers
            textToday = "";
            break;
        case 46: //snow showers
            textToday = "";
            break;
        case 47: //isolated thundershowers
            textToday = "";
            break;
        case 3200: // not available
            textToday = "";
            break;
    }
    switch (data[1].code) {
        case 0: //tornado
            textToday = "";
            break;
        case 1: //tropical storm
            textToday = "";
            break;
        case 2: //hurricane
            textToday = "";
            break;
        case 3: //severe thunderstorms
            textToday = "";
            break;
        case 4: //thunderstorms
            textToday = "";
            break;
        case 5: //mixed rain and snow
            textToday = "";
            break;
        case 6: //mixed rain and sleet
            textToday = "";
            break;
        case 7: //mixed snow and sleet
            textToday = "";
            break;
        case 8: //freezing drizzle
            textToday = "";
            break;
        case 9: //drizzle
            textToday = "";
            break;
        case 10: //freezing rain
            textToday = "";
            break;
        case 11: //showers
            textToday = "";
            break;
        case 12: //showers
            textToday = "";
            break;
        case 13: //snow flurries
            textToday = "";
            break;
        case 14: //light snow showers
            textToday = "";
            break;
        case 15: //blowing snow
            textToday = "";
            break;
        case 16: //snow
            textToday = "";
            break;
        case 17: //hail
            textToday = "";
            break;
        case 18: //sleet
            textToday = "";
            break;
        case 19: //dust
            textToday = "";
            break;
        case 20: //foggy
            textToday = "";
            break;
        case 21: //haze
            textToday = "";
            break;
        case 22: //smoky
            textToday = "";
            break;
        case 23: //blustery
            textToday = "";
            break;
        case 24: //windy
            textToday = "";
            break;
        case 25: //cold
            textToday = "";
            break;
        case 26: //cloudy
            textToday = "";
            break;
        case 27: //mostly cloudy (night)
            textToday = "";
            break;
        case 28: //mostly cloudy (day)
            textToday = "";
            break;
        case 29: //partly cloudy (night)
            textToday = "";
            break;
        case 30: //partly cloudy (day)
            textToday = "";
            break;
        case 31: //clear (night)
            textToday = "";
            break;
        case 32: //sunny
            textToday = "";
            break;
        case 33: //fair (night)
            textToday = "";
            break;
        case 34: //fair (day)
            textToday = "";
            break;
        case 35: //mixed rain and hail
            textToday = "";
            break;
        case 36: //hot
            textToday = "";
            break;
        case 37: //isolated thunderstorms
            textToday = "";
            break;
        case 38: //scattered thunderstorms
            textToday = "";
            break;
        case 39: //scattered thunderstorms
            textToday = "";
            break;
        case 40: //scattered showers
            textToday = "";
            break;
        case 41: //heavy snow
            textToday = "";
            break;
        case 42: //scattered snow showers
            textToday = "";
            break;
        case 43: //heavy snow
            textToday = "";
            break;
        case 44: //partly cloudy
            textToday = "";
            break;
        case 45: //thundershowers
            textToday = "";
            break;
        case 46: //snow showers
            textToday = "";
            break;
        case 47: //isolated thundershowers
            textToday = "";
            break;
        case 3200: // not available
            textToday = "";
            break;
    }
    var string = "Bom dia bbs, hoje a máxima é de " + todayHigh
        + "ºC e mínima de " + todayLow + "ºC."
}
function getWeather(location, callbackFunction) {
    location = '"' + location + '"';

    // Creates a query
    var query = new yql('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=' + location + ') and u="c"');

    // Executes the query
    query.exec(function (err, data) {
        var location = data.query.results.channel.location;
        var condition = data.query.results.channel.item.condition;

        console.log('A temperatura atual em ' + location.city + ', ' + location.region + ' é ' + condition.temp + ' graus celsius.');
        console.log(data.query.results.channel.item.forecast);
        callbackFunction(data.query.results.channel.item.forecast);
    });
}

// GET Method
app.get("/", function (req, res) {
    location = "são paulo, br";
    //client.post();
    getWeather(location, function (data) {
        getMessage(data);


    });
});


//App listening
app.listen(server_port, server_host, function () {
    console.log("Server online.");
});