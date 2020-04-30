import { Message } from 'discord.js'
import PankyBot from '../../src/bot'

export default {
  desc: 'Bans and then ubans a user, which clears 7 days worth of messages.',
  name: 'softban',
  args: '<user to softban>',
  type: 'mod',
  run: (message: Message, _args: string[], client: PankyBot) => {
    const { user } = client;
    const { mentions, guild, member } = message;
    if (!guild || !guild.available || !mentions.members || !user || !member) return;

    const found = mentions.members.find(val => val.id !== user.id)
    const days = 7

    if (!member.hasPermission(['BAN_MEMBERS'])) { return message.react('👎') }
    if (!found) { return message.reply(`That user isn't apart of the server`) }

    found.ban({ days })
      .then(() => {
        message.react('✅')
        guild.members.unban(found.id)
          .catch(() => {
            message.channel.send(`Couldn't unban ${found.displayName}`)
          })
      })
      .catch(() => {
        message.channel.send(`Couldn't ban ${found.displayName}.`)
      })

    return;
  }
}