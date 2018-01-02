# About
This Node.js with Express project is a bot that interacts with [Yahoo Weather API](https://developer.yahoo.com/weather/) to gets it's data about weather. It uses this data to create funny phrases with the current and next day forecast and then uses [node-twitter](https://github.com/desmondmorris/node-twitter) to tweet about it. It also uses [node-cron](https://github.com/kelektiv/node-cron) to schedule the API calls.

##  Where is it?
The bot uses the twitter account [@climaoSP](https://twitter.com/climaoSP) and tweets in portuguese about São Paulo-SP, Brazil forecast every day 05:00 AM (America/São Paulo). This projec it's hosted at [Heroku](https://www.heroku.com/) and uses [kaffeine](http://kaffeine.herokuapp.com/) to prevent it from sleeping.