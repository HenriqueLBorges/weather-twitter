var app = require("./config/server.js");
var client = require("./config/twitter.js");
var yql = require('yql');

//Set the available port or 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Set the available host
var server_host = process.env.YOUR_HOST || '0.0.0.0';

function getWeather(location, callbackFunction) {
    location = '"' + location + '"';

    // Creates a query
    var query = new yql('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=' + location + ') and u="c"');
    
    // Executes the query
    query.exec(function (err, data) {
        var location = data.query.results.channel.location;
        var condition = data.query.results.channel.item.condition;

        console.log('A temperatura atual em ' + location.city + ', ' + location.region + ' é ' + condition.temp + ' graus celsius.');
        callbackFunction(data);
    });
}

// GET Method
app.get("/", function (req, res) {
    location = "são paulo, br";
    client.get();
    getWeather(location, function (data) {
        res.json(data);
    });
});

//App listening
app.listen(server_port, server_host, function () {
    console.log("Server online.");
});