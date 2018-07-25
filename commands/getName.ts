import { Message } from 'discord.js'
import PankyBot from '../src/bot';

export default function whoIs(client: PankyBot, message: Message) {
  let user;
  if(message.guild) {
    // Get the users current user info.
    user = client.getUser.get(message.mentions.members.first().user.id, message.guild.id)
    // If the user doesn't exist in the DB set default (level 0)
    if (!user) {
      return message.channel.send('That user doesn\'t have a name set for them!')
    }
    message.channel.send(`${message.mentions.members.first().nickname}'s real name is.... ${user.note}`)
  }
}