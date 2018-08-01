import PankyBot from "../src/bot";
import { Message, Permissions, RichEmbed } from "discord.js";

const kick = {
  desc: 'Kicks requested user, assuming requestee has permissions and user can be kicked.',
  common: 'kick',
  args: '<user mention> <reason(optional)>',
  alias: ['kick'],
  run: async function (client: PankyBot, message: Message, args: string[]) {
    let reason: string = ""
    let name: string = ""
    let embed: RichEmbed = new RichEmbed()

    if (!message.guild) return
    // Don't let some crazy dude spam kick gotta make sure they're the OG
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('you do no have the `KICK_MEMBERS` permission.')
    // Skip all the mentions.
    for (const i of message.mentions.members) { args.shift() }
    // If there is a reason given
    for (const i of args) { reason += i + " " }
    // List who's being kicked and the reason if given.
    for (const [k, member] of message.mentions.members) {
      name = member.nickname ? member.nickname : member.user.username
      member.kick(reason).then(() => {
        embed.setColor(65295)
          .setTitle(`:wave: Bye ${name} :wave:`)
          .setDescription(`Successfully kicked ${name}!`)
        message.channel.send(embed)
      })
        .catch(() => {
          embed.setColor(16711683)
            .setTitle(`:octagonal_sign: **Unable to kick ${name}** :octagonal_sign:`)
            .addField('**__Check who you\'re trying to kick.__**', 'Discord doesn\'t allow a role to kick its equal or superior')
            .addField('**__I might not have the correct permissions__**', `Panky should have correct perms when invited. Check this in your server settings.`)
          message.channel.send(embed)
        })
    }
  }
}

export default kick