import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Deletes number of messages requested, or delete user specific commands if given.',
  name: 'purge',
  args: '<# of messages> <user mention(optional)>',
  type: 'mod',
  run: (message: Message, args: string[], client: PankyBot) => {
    let amount = Number(args[0]);
    const { user } = client;
    const { mentions, member } = message;
    if (!user || !mentions || !member || !mentions.members) return;

    const purgeUser = mentions.members.find(val => val.id !== user.id);
    const channel = message.channel;

    if (message.channel.type === 'dm') { return channel.send('I can\'t delete messages in DMs.') }
    if (!member.hasPermission("MANAGE_MESSAGES")) { return message.react('👎') }
    if (!Number(args[0])) {
      return message.reply(`Pass the amount of messages you want to purge. EG: \`@${user.username} purge 5\``)
    }

    // Delete the message sent
    message.delete()
    // Grab as many messages you can panky. Depending on the args delete delete delete.
    if (!purgeUser) {
      channel.bulkDelete(amount)
        .then(() => {
          console.log(`Bulk deleted ${amount}`)
        })
        // So Discord;s bulkdelete wont delete anything older than 14 days. So we gotta manually delete it.
        .catch(() => {
          for (; amount > 0; amount--) {
            const m = channel.lastMessage;
            if (!m) continue;
            m.delete();
          }
        })
    }

    return;
  }
}
