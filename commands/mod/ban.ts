import { Message, MessageEmbed } from "discord.js";
import * as moment from 'moment'
import PankyBot from "../../src/bot";

export default {
  desc: 'Bans a user and deletes user messages on amount of days passed in.',
  name: 'ban',
  args: '<user mention(s)> <number of days(default 7 days)> <reason(optional)',
  run: (message: Message, args: string[], client: PankyBot) => {
    let days = 0
    let reason = ''
    let name = ''
    const embed = new MessageEmbed()
    if (message.channel.type === 'dm') { return; }
    if (!message.member || !message.mentions.members || !client.user) return;
    // Shouldn't let just anyone ban members.
    if (!message.member.hasPermission('BAN_MEMBERS')) { return message.react('👎') }

    // Skip through all the users mentioned
    for (const [, member] of message.mentions.members) {
      if (member.id !== client.user.id) {
        args.shift()
      }
    }

    // How many days back to delete a users message history
    if (!isNaN(Number(args[0]))) { days = Number(args[0]); args.shift() }
    // MAx is 7 days in history so if someone sets greater then, set to 7.
    if (days > 7) { days = 7; }
    // If there's a reason get it or whatever.
    for (const i of args) { reason += i + ' ' }

    for (const [, member] of message.mentions.members) {
      if (member.id === client.user.id) { continue; }
      name = member.displayName;
      member.ban({ days, reason }).then(() => {
        embed.setColor(65295)
          .setTitle(`:wave: Sorry ${name}, you've been banned! :wave:`)
          .setDescription(`Successfully banned ${name}!`)
          .addField(`Banned by ${message.member!.displayName || "Error getting name.."}`, `${moment().format('ddd MMM DD YYYY')}`, true)
          .addField(`Reason for banning ${name}`, `Reason: ${reason || 'No reason given'}`, true)
        message.channel.send(embed)
      })
        .catch(() => {
          embed.setColor(16711683)
            .setTitle(`:octagonal_sign: **Unable to ban ${name}** :octagonal_sign:`)
            .addField('**__Check who you\'re trying to ban.__**', 'Discord doesn\'t allow a role to ban its equal or superior')
            .addField('**__I might not have the correct permissions__**',
              `Panky should have correct perms when invited. Check this in your server settings.`)
          message.channel.send(embed)
        })
    }

    return;
  }
}
