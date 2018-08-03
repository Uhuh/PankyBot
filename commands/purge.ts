import PankyBot from "../src/bot";
import { Message, User } from "discord.js";

const purge = {
  desc: 'Deletes number of messages requested, or delete user specific commands if given.',
  common: 'purge',
  args: '<# of messages> <user mention(optional)>',
  alias: ['purge'],
  run: async function (client: PankyBot, message: Message, args: string[]) {
    let amount: number = Number(args[0])
    let user: User
    const channel = message.channel
    if (!message.guild) return channel.send('I can\'t delete messages in DMs.')
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return
    if (!Number(args[0])) return message.reply(`Pass the amount you want to purge. EG: \`${client.config.PREFIX}purge 5\``)

    // If you want to purge the messages of a specific user.
    if (args[1]) user = message.mentions.members.first().user
    // Delete the message sent
    message.delete()
    // Grab as many messages you can panky. Depending on the args delete delete delete.
    channel.fetchMessages().then((msgs) => {
      for (const [k, msg] of msgs) {
        if (amount === 0) return
        if (user && amount > 0 && user === msg.author) {
          msg.delete()
          amount--
        }
        if (!user && amount > 0) {
          msg.delete()
          amount--
        }
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default purge