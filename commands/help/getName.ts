import { Message } from 'discord.js'
import PankyBot from "../../src/bot"

const getName = {
  desc: 'Returns the set name of a user, if set.',
  common: 'whois',
  args: '<user mention>',
  alias: ['whois', 'getname', 'who'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let user
    if (message.guild) {
      // Get the users current user info.
      user = client.getUser.get(message.mentions.members.first().user.id, message.guild.id)
      // If the user doesn't exist in the DB set default (level 0)
      if (!user) {
        return message.channel.send('That user doesn\'t have a name set for them!')
      }
      let nick: string = message.mentions.members.first().nickname ? message.mentions.members.first().nickname : message.mentions.members.first().user.username
      message.channel.send(`${nick}'s real name is.... ${user.note}`)
    }
  }
}

export default getName