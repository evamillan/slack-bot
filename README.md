# Gordify
### A Slack bot to make your lunch outings easier

Type `gordify start` to wake up the bot. It will ask who's up for lunch. Tell it you're in by adding an emoji reaction to the message.
When you're done, type `gordify stop`. The bot will then sort everyone into groups and randomly choose a leader who will be in charge of making
reservations.

### Installation
Create a [Slack app](https://api.slack.com/slack-apps), add a bot user and generate a token. It will begin with `xoxb`.
Don't forget to invite the bot to your channel! `/invite @gordify`

#### Run locally

Clone this project and install dependencies

    $ npm install

Add your token

    SLACK_TOKEN=token

Run the bot with `$ npm start` or `$ node index.js`

#### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Set your token with  `$ heroku config:set SLACK_TOKEN=token` or in Settings > Config Variables
