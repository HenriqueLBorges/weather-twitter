var app = require("./config/server.js");
var client = require("./config/twitter.js");
var yql = require('yql');
var CronJob = require('cron').CronJob;

//Set the available port or 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Set the available host
var server_host = process.env.YOUR_HOST || '0.0.0.0';

function getMessage(data) {
    var todayHigh, todayLow, tomorrowHigh, tomorrowLow;
    var textToday = "";
    var textTomorrow = "";

    todayHigh = data[0].high;
    todayLow = data[0].low;
    tomorrowHigh = data[1].high;
    tomorrowLow = data[1].low;

    switch (parseInt(data[0].code)) {
        case 0: //tornado
            textToday = "A previsão pra hoje é de tornado, cuidado com os tubarões.";
            break;
        case 1: //tropical storm
            textToday = "Pelo visto temos uma tempestade tropical rolando hoje, cuidado galera.";
            break;
        case 2: //hurricane
            textToday = "Tornado hoje pessoal! 'Rock you like a hurricane'.";
            break;
        case 3: //severe thunderstorms
            textToday = "Raios e trovões! Se escondam em casa.";
            break;
        case 4: //thunderstorms
            textToday = "Hoje temos grandes chances de tempestade.";
            break;
        case 5: //mixed rain and snow
            textToday = "Chuva e neve em São Paulo, será?";
            break;
        case 6: //mixed rain and sleet
            textToday = "Chuva com granizo, nem saíam de casa hoje galera (duvido).";
            break;
        case 7: //mixed snow and sleet
            textToday = "Neve e granizo, mas em São Paulo nem neva...";
            break;
        case 8: //freezing drizzle
            textToday = "Pra hoje temos aquela garoa gelada.";
            break;
        case 9: //drizzle
            textToday = "Aquela garoa chata hoje, afinal, São Paulo é conhecida por isso né.";
            break;
        case 10: //freezing rain
            textToday = "Levem guarda-chuva e um casaco hoje galera. A chuva vai ser gelada.";
            break;
        case 11: //showers
            textToday = "Uma leve chuva pra hoje, arrisque-se sobre levar guarda-chuva ou não.";
            break;
        case 12: //showers
            textToday = "Um pouquinho de neve pra hoje. Novidade em São Paulo.";
            break;
        case 13: //snow flurries
            textToday = "Flocos de neve pra hoje.";
            break;
        case 14: //light snow showers
            textToday = "Talvez tenhamos um pouco de neve pra hoje.";
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
            textToday = "Vai ventar hoje, soltem pipa.";
            break;
        case 25: //cold
            textToday = "Hoje vai fazer frio amigos.";
            break;
        case 26: //cloudy
            textToday = "Nublado hoje, vai ser um dia cinza.";
            break;
        case 27: //mostly cloudy (night)
            textToday = "Durante a noite vai ser bem nublado.";
            break;
        case 28: //mostly cloudy (day)
            textToday = "Durante o dia vai ser bem nublado";
            break;
        case 29: //partly cloudy (night)
            textToday = "Hoje vai ser meio nublado durante a noite.";
            break;
        case 30: //partly cloudy (day)
            textToday = "Hoje vai ser meio nublado durante o dia.";
            break;
        case 31: //clear (night)
            textToday = "Bom tempo durante a noite.";
            break;
        case 32: //sunny
            textToday = "Dia ensolarado, partiu praia!";
            break;
        case 33: //fair (night)
            textToday = "Hoje teremos uma noite agradável.";
            break;
        case 34: //fair (day)
            textToday = "Hoje teremos um dia agradável.";
            break;
        case 35: //mixed rain and hail
            textToday = "";
            break;
        case 36: //hot
            textToday = "Dia quente hoje gente.";
            break;
        case 37: //isolated thunderstorms
            textToday = "Tempestades isoladas hoje.";
            break;
        case 38: //scattered thunderstorms
            textToday = "Várias tempestades espalhadas hoje.";
            break;
        case 39: //scattered thunderstorms
            textToday = "Várias tempestades espalhadas hoje.";
            break;
        case 40: //scattered showers
            textToday = "";
            break;
        case 41: //heavy snow
            textToday = "Aparentemente vai nevar muito hoje!";
            break;
        case 42: //scattered snow showers
            textToday = "";
            break;
        case 43: //heavy snow
            textToday = "Aparentemente vai nevar muito hoje!";
            break;
        case 44: //partly cloudy
            textToday = "Hoje vai ser parcialmente nublado.";
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
    switch (parseInt(data[1].code)) {
        case 0: //tornado
            textTomorrow = "";
            break;
        case 1: //tropical storm
            textTomorrow = "";
            break;
        case 2: //hurricane
            textTomorrow = "";
            break;
        case 3: //severe thunderstorms
            textTomorrow = "";
            break;
        case 4: //thunderstorms
            textTomorrow = "";
            break;
        case 5: //mixed rain and snow
            textTomorrow = "";
            break;
        case 6: //mixed rain and sleet
            textTomorrow = "";
            break;
        case 7: //mixed snow and sleet
            textTomorrow = "";
            break;
        case 8: //freezing drizzle
            textTomorrow = "";
            break;
        case 9: //drizzle
            textTomorrow = "";
            break;
        case 10: //freezing rain
            textTomorrow = "";
            break;
        case 11: //showers
            textTomorrow = "";
            break;
        case 12: //showers
            textTomorrow = "";
            break;
        case 13: //snow flurries
            textTomorrow = "";
            break;
        case 14: //light snow showers
            textTomorrow = "";
            break;
        case 15: //blowing snow
            textTomorrow = "";
            break;
        case 16: //snow
            textTomorrow = "";
            break;
        case 17: //hail
            textTomorrow = "";
            break;
        case 18: //sleet
            textTomorrow = "";
            break;
        case 19: //dust
            textTomorrow = "";
            break;
        case 20: //foggy
            textTomorrow = "";
            break;
        case 21: //haze
            textTomorrow = "";
            break;
        case 22: //smoky
            textTomorrow = "";
            break;
        case 23: //blustery
            textTomorrow = "";
            break;
        case 24: //windy
            textTomorrow = "";
            break;
        case 25: //cold
            textTomorrow = "";
            break;
        case 26: //cloudy
            textTomorrow = "";
            break;
        case 27: //mostly cloudy (night)
            textTomorrow = "";
            break;
        case 28: //mostly cloudy (day)
            textTomorrow = "";
            break;
        case 29: //partly cloudy (night)
            textTomorrow = "";
            break;
        case 30: //partly cloudy (day)
            textTomorrow = "";
            break;
        case 31: //clear (night)
            textTomorrow = "";
            break;
        case 32: //sunny
            textTomorrow = "";
            break;
        case 33: //fair (night)
            textTomorrow = "";
            break;
        case 34: //fair (day)
            textTomorrow = "";
            break;
        case 35: //mixed rain and hail
            textTomorrow = "";
            break;
        case 36: //hot
            textTomorrow = "";
            break;
        case 37: //isolated thunderstorms
            textTomorrow = "";
            break;
        case 38: //scattered thunderstorms
            textTomorrow = "";
            break;
        case 39: //scattered thunderstorms
            textTomorrow = "";
            break;
        case 40: //scattered showers
            textTomorrow = "";
            break;
        case 41: //heavy snow
            textTomorrow = "";
            break;
        case 42: //scattered snow showers
            textTomorrow = "";
            break;
        case 43: //heavy snow
            textTomorrow = "";
            break;
        case 44: //partly cloudy
            textTomorrow = "";
            break;
        case 45: //thundershowers
            textTomorrow = "";
            break;
        case 46: //snow showers
            textTomorrow = "";
            break;
        case 47: //isolated thundershowers
            textTomorrow = "";
            break;
        case 3200: // not available
            textTomorrow = "";
            break;
    }
    var string = "123Bom dia bbs, hoje a máxima é de " + todayHigh
        + "ºC e a mínima de " + todayLow + "ºC. " + textToday + " Já para amanhã a máxima é de "
        + tomorrowHigh + "ºC e a mínima de " + tomorrowLow + "ºC. " + textTomorrow;

    return string;
}
function getWeather(location, callbackFunction) {
    location = '"' + location + '"';

    // Creates a query
    var query = new yql('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=' + location + ') and u="c"');

    // Executes the query
    query.exec(function (err, data) {
        var location = data.query.results.channel.location;
        var condition = data.query.results.channel.item.condition;
        //Returns the data in the callback function
        callbackFunction(data.query.results.channel.item.forecast);
    });
}

var job = new CronJob('00 57 05 * * 1-7', function () {
    // Runs every day at 05:30:00 AM.
    getWeather("são paulo, br", function (data) {
        client.tweet(getMessage(data));
    });

},
    function () {
        /* This function is executed when the job stops */
        console.log("Cron job stopped!")
    },
    true, /* Start the job right now */
    'America/Sao_Paulo' /* Time zone of this job. */
);
//Verifies if the cron job started.
if (job.running)
    console.log("Job started.");
else
    console.warn("Job didn't started.")