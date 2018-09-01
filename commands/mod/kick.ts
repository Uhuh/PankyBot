import PankyBot from "../../src/bot"
import { Message, Permissions, RichEmbed } from "discord.js"

export default {
  desc: 'Kicks requested user, assuming requestee has permissions and user can be kicked.',
  common: 'kick',
  args: '<user mention> <reason(optional)>',
  alias: ['kick'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let reason: string = ""
    let name: string = ""
    let embed: RichEmbed = new RichEmbed()

    if (message.channel.type === 'dm') return
    // Don't let some crazy dude spam kick gotta make sure they're the OG
    if (!message.member.hasPermission("KICK_MEMBERS")) return
    // Skip all the mentions.
    for (const i of message.mentions.members) { args.shift() }
    // If there is a reason given
    for (const i of args) { reason += i + " " }
    // List who's being kicked and the reason if given.
    for (const [k, member] of message.mentions.members) {
      if (member.id === client.user.id) continue
      name = member.nickname || member.user.username
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