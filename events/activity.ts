import PankyBot from '../src/bot'
import log from './log'

export default async function (client: PankyBot) {
  for (const [key, guild] of client.guilds) {
    for (const [k, member] of guild.members) {
      if (member.user.bot) { continue }
      // If they're online or in a vc then they're active.
      if (member.presence.status === 'online' || member.voiceChannel) {
        log(member)
      }
    }
  }
}
