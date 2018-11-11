import PankyBot from '../src/bot'
import log from './log'

export default async (client: PankyBot) => {
  for (const [key, guild] of client.guilds) {
    for (const [k, member] of guild.members) {
      /*
        When the bot joins a new server it doesn't have record of anyone.
        When the bot joins it will add all users to db.
      */
      if (!client.getActivity.get(member.id, member.guild.id)) {
        log(client, member)
      }
      // If they're online or in a vc then they're active.
      else if (member.presence.status === 'online' || member.voiceChannel) {
        log(client, member)
      }
    }
  }
}
