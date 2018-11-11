import PankyBot from '../src/bot'
import log from './log'
import { GET_ACTIVITY } from '../src/setup_tables';

export default (client: PankyBot) => {
  for (const [key, guild] of client.guilds) {
    for (const [k, member] of guild.members) {
      if(member.user.bot) { continue }
      /*
        When the bot joins a new server it doesn't have record of anyone.
        When the bot joins it will add all users to db.
      */
      if (GET_ACTIVITY.get(member.id, member.guild.id)) {
        log(client, member)
      }
      // If they're online or in a vc then they're active.
      else if (member.presence.status === 'online' || member.voiceChannel) {
        log(client, member)
      }
    }
  }
}
