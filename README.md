## Description

The way things are going Panky is going to be a moderator bot! Meaning handling kicks/bans, profanity, user activity and more!
She's still in the works right now so some features are limited but mentioned below in [usage](#usage).
If you would like to invite my live bot here is the [link](https://discordapp.com/oauth2/authorize?client_id=342815158688808961&scope=bot&permissions=8). I am hosting it via Google Cloud Platform.

## Hosting yourself

To setup and run Panky

`git clone git@github.com:Uhuh/PankyBot.git` <br>
`cd PankyBot/` <br>
`npm install` <br>

Now before you start your bot you need to set up the environment variables. <br>
Using your preferred text editor or IDE (I will use nano in this case) <br>
`.env` should be in the root folder of the project: `PankyBot/.env` <br>
`nano .env` <br>
Now within `.env` <br>
```
PREFIX=!
TOKEN=superSecretToken
GUILD_NAME=`Your server name`
```
Save this file, now you're ready to start!

`npm run start` <br>

## Usage
**Fun Commands** <br>
These commands are just for fun.

> !dog <br>

&nbsp;&nbsp;&nbsp;&nbsp;Returns a photo or gif of a random dog.


**Helper Commands** <br>
These commands are non destructable commands, they are meerly for making some things easier for mods.

> !setname \<user mention> \<name here> <br>
  
&nbsp;&nbsp;&nbsp;&nbsp;Sets a users _"name"_ to a custom name.<br>
> !whois \<user mention> <br>
  
&nbsp;&nbsp;&nbsp;&nbsp;Outputs the users name if set. <br>
> !ping
  
&nbsp;&nbsp;&nbsp;&nbsp;Returns the bots ping.
  
  
**Moderation Commands** <br>
These commands **_can_** be desctructable. Some require roles to use and these help manage the server.

> !activity <# to see> <br>
  
&nbsp;&nbsp;&nbsp;&nbsp;Outputs # of people that have least activity. 25 is the max you can request. <br>
> !kick \<user mention(s)> \<reason(optional)> <br>
  
&nbsp;&nbsp;&nbsp;&nbsp;Kicks user(s) and audit logs the reason if given. Only those with `KICK_MEMBERS` permissions can use this. <br>
> !purge \<message amount> \<user mention(optional)> <br>

&nbsp;&nbsp;&nbsp;&nbsp;Deletes messages in the channel you request it in, delete user specific commands if user is mentioned. Only users with `MESSAGE_MANAGE` can use this command.

## Contributors

- [Dylan Warren](https://github.com/Uhuh)

## License

MIT
