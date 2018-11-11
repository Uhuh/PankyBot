import { Message } from 'discord.js'
import PankyBot from "../../src/bot";

export default {
  desc: 'Returns the set name of a user, if set.',
  common: 'whois',
  args: '<user mention>',
  alias: ['whois', 'getname', 'who'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let user
    if (message.guild) {
      // Get the users current user info.
      user = client.getUser.get(message.mentions.members.find(val => val.id !== client.user.id).user.id, message.guild.id)
      // If the user doesn't exist in the DB set default (level 0)
      if (!user) {
        return message.channel.send('That user doesn\'t have a name set for them!')
      }
      const nick = message.mentions.members.find(val => val.id !== client.user.id).displayName;
      message.channel.send(`${nick}'s real name is.... ${user.note}`)
    }
  }
}
