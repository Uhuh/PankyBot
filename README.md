## Description

I'm not going anywhere big with this project. I've just made a few DiscordJS bots previously and just had a good time doing them.

## Getting Started

To setup and run Panky

`git clone git@github.com:Uhuh/PankyBot.git` <br >
`cd PankyBot/` <br >
`npm install` <br >

Now before you start your bot you need to set up the environment variables. <br >
Using your preferred text editor or IDE (I will use nano in this case) <br >
`.env` should be in the root folder of the project: `PankyBot/.env` <br >
`nano .env` <br >
Now within `.env` <br >
```
PREFIX=!
TOKEN=superSecretToken
GUILD_NAME=`Your server name`
```
Save this file, now you're ready to start!

`npm run start` <br >

![alt text](https://github.com/Uhuh/PankyBot/blob/master/extra/gif/start.gif)

## Usage

To many people on the server and they decide to switch their names / profile pictures often? <br>
Worry no more! You can easily set a note on those crazy beans! <br>
To simply give someone a name, run this command. This will stick with them _forever_ until changed! <br>
`!setname @username John Smith` <br>
If you want to see who is _who_ simple run: <br>
`!whois @username` <br>
Panky will tell you that user is (if they have a name set...). <br>
![alt text](https://cdn.discordapp.com/attachments/285627738772209685/471449870289338378/unknown.png) <br>

_**"Dang, I have to many users on my server and don't know which ones to purge! ¯\\\_(ツ)\_/¯"**_ <br>

DiscordJS has its own `purge` command. HOWEVER it does not tell you what users it will purge. <br>
It'll tell you the number of people it will purge based on the number of days you given it. <br>
We want to see who has been least active in the server and how this is done is that it tracks <br>
when users connect to voicechat, send a message, or appear online! <br>
The downside is that the bot must be on over a course of time to accumulate the data so it's most accurate. <br>
You don't want to invite the bot and instantly check `activity` since it only knows what happens the day of joining.

Anyway you can check activity by running: `!getactivity <amount>` <br>
_**24**_ is the max amount you can request <sub>because 24 is max fields embed can make</sub>

![alt text](https://cdn.discordapp.com/attachments/360637139664371713/471442741553922058/unknown.png)
## Contributors

- [Dylan Warren](https://github.com/Uhuh)

## License

MIT I guess.
