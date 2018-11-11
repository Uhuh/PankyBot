import { Message, User } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Deletes number of messages requested, or delete user specific commands if given.',
  common: 'purge',
  args: '<# of messages> <user mention(optional)>',
  alias: ['purge'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let amount = Number(args[0])
    const purgeUser = message.mentions.members.find(val => val.id !== client.user.id)
    const channel = message.channel
    
    if (message.channel.type === 'dm') { return channel.send('I can\'t delete messages in DMs.') }
    if (!message.member.hasPermission("MANAGE_MESSAGES")) { return message.react('👎') }
    if (!Number(args[0])) {
      return message.reply(`Pass the amount of messages you want to purge. EG: \`@${client.user.username} purge 5\``)
    }

    // Delete the message sent
    message.delete()
    // Grab as many messages you can panky. Depending on the args delete delete delete.
    channel.fetchMessages().then(msgs => {
      for (const [k, msg] of msgs) {
        if (amount === 0) { return }
        if (purgeUser && amount > 0 && purgeUser.user === msg.author) {
          msg.delete()
          .catch(() => {
            console.log('Error deleting message')
          })
          amount--;
        }
        else if (amount > 0) {
          msg.delete()
          .catch(() => {
            console.log('Error deleting message.')
          })
          amount--;
        }
      }
    })
      .catch(err => {
        console.log(err)
      })
  }
}
