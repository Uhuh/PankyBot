import PankyBot from "../src/bot";
import log from './log'

export default function activity(client: PankyBot) {
  client.guilds.forEach((guild) => {
    guild.members.forEach((member) => {
      if(member.presence.status == 'online') {
        log(client, member)
      }
      else if(member.lastMessage.createdTimestamp > client.getActivity.run(member.id, member.guild.id)) {
        log(client, member)
      }
    })
  })
}