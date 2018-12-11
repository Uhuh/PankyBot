import { Message, RichEmbed } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Kicks requested user, assuming requestee has permissions and user can be kicked.',
  name: 'kick',
  args: '<user mention> <reason(optional)>',
  run: async function (message: Message, args: string[], client: PankyBot) {
    let reason = ""
    let name = ""
    const embed = new RichEmbed()

    if (message.channel.type === 'dm') { return; }
    // Don't let some crazy dude spam kick gotta make sure they're the OG
    if (!message.member.hasPermission("KICK_MEMBERS")) { return message.react('👎') }
    // Skip all the mentions.
    for (const [k, member] of message.mentions.members) {
      if (member.id !== client.user.id) {
        args.shift()
      }
    }
    // If there is a reason given
    for (const i of args) { reason += i + " "; }
    // List who's being kicked and the reason if given.
    for (const [k, member] of message.mentions.members) {
      if (member.id === client.user.id) { continue; }
      name = member.displayName;
      member.kick(reason).then(() => {
        message.react('✅')
      })
        .catch(() => {
          message.react('👎')
        })
    }
  }
}
