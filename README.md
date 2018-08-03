## Description

The way things are going Panky is going to be a moderator bot! Meaning handling kicks/bans, profanity, user activity and more!
She's still in the works right now so some features are limited but mentioned below in [usage](#usage).
If you would like to invite my live bot here is the [link](https://discordapp.com/oauth2/authorize?client_id=342815158688808961&scope=bot&permissions=8). I am hosting it via Google Cloud Platform.

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

> !ban  <user mention(s)> <number of days(default 7 days)> <reason(optional)>

&nbsp;&nbsp;&nbsp;&nbsp;Bans a user for X amount of days. Only users with `BAN_MEMBERS` can use this command.

> !status

&nbsp;&nbsp;&nbsp;&nbsp;Outputs server information, such as users in server, owner, amount of text/voice channels etc.

> !botstatus

&nbsp;&nbsp;&nbsp;&nbsp;Outputs the bots information.

> !lock <number of minute(s)> <#channel-name(s)>

&nbsp;&nbsp;&nbsp;&nbsp;Users will not be able to send messages to locked channels. Only users with `MANAGE_CHANNELS` can use this command.

## Contributors

- [Dylan Warren](https://github.com/Uhuh)

## License

MIT
