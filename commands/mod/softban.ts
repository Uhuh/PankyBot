import { Message } from 'discord.js'
import PankyBot from '../../src/bot'

export default {
  desc: 'Bans and then ubans a user, which clears 7 days worth of messages.',
  common: 'softban',
  args: '<user to softban>',
  alias: ['softban'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    const member = message.mentions.members.find(val => val.id !== client.user.id)
    const days = 7
    
    if (!message.member.hasPermission(['BAN_MEMBERS'])) { return message.react('👎') }
    if (!member) { return message.reply(`That user isn't apart of the server`) }

    message.guild.ban(member, days)
    .then(() => {
      message.react('✅')
      message.guild.unban(member)
      .catch(() => {
        message.channel.send(`Couldn't unban ${member.displayName}`)
      })
    })
    .catch(() => {
      message.channel.send(`Couldn't ban ${member.displayName}.`)
    })
  }
}