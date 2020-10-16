import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Kick user(s)',
  name: 'kick',
  args: '<user> [reason]',
  type: 'mod',
  run: (message: Message, args: string[], client: PankyBot) => {
    let reason = ""

    if(!client.user || !message.member || !message.mentions || !message.mentions.members) return;

    if (message.channel.type === 'dm') { return; }
    // Don't let some crazy dude spam kick gotta make sure they're the OG
    if (!message.member.hasPermission("MANAGE_MESSAGES")) { return message.react('❌') }
    // Skip all the mentions.
    for (const [, member] of message.mentions.members) {
      if (member.id !== client.user.id) {
        args.shift()
      }
    }
    // If there is a reason given
    for (const i of args) { reason += i + " "; }
    // List who's being kicked and the reason if given.
    for (const [, member] of message.mentions.members) {
      if (member.id === client.user.id) { continue; }
      member.kick(reason).then(() => {
        message.react('✅')
      })
        .catch(() => {
          message.react('👎')
        })
    }

    return;
  }
}
