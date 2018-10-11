import { Message, RichEmbed } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Bans a user',
  common: 'ban',
  args: '<user mention(s)> <number of days(default 7 days)> <reason(optional)',
  alias: ['ban'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let days: number = 7;
    let reason: string = '';
    let name: string = '';
    const embed: RichEmbed = new RichEmbed();
    if (message.channel.type === 'dm') { return; }
    // Shouldn't let just anyone ban members.
    if (!message.member.hasPermission('BAN_MEMBERS')) { return; }

    // Skip through all the users mentioned
    for (const i of message.mentions.members) { args.shift(); }

    // If they set amount of days to ban a user. Then shift args for reason.
    if (Number(args[0])) { days = Number(args[0]); args.shift(); }

    // If there's a reason get it or whatever.
    for (const i of args) { reason += i + ' '; }

    for (const [k, member] of message.mentions.members) {
      if (member.id === client.user.id) { continue; }
      name = member.nickname || member.user.username;
      member.ban({ days, reason }).then(() => {
        embed.setColor(65295)
          .setTitle(`:wave: Sorry ${name}, you've been banned! :wave:`)
          .setDescription(`Successfully banned ${name}!`)
          .addField(`Banned for: ${days} day${(days > 1 ? 's' : '')}`,
                    `Banned by ${message.member.nickname || message.author.username}`, true)
          .addField(`_**Reason for banning ${name}**_`, `Reason: ${reason || 'No reason given'}`, true);
        message.channel.send(embed);
      })
        .catch(() => {
          embed.setColor(16711683)
            .setTitle(`:octagonal_sign: **Unable to ban ${name}** :octagonal_sign:`)
            .addField('**__Check who you\'re trying to ban.__**', 'Discord doesn\'t allow a role to ban its equal or superior')
            .addField('**__I might not have the correct permissions__**',
                      `Panky should have correct perms when invited. Check this in your server settings.`);
          message.channel.send(embed);
        });
    }
  }
};
