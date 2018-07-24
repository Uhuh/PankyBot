import PankyBot from "../src/bot";
import log from './log'

export default function activity(client: PankyBot) {
  client.guilds.forEach((guild) => {
    guild.members.forEach((member) => {
      if(member.presence.status == 'online')
        log(client, member)
      // The user might have a presence that's invis, so keep track of messages.
      else if(member.lastMessage && Number(member.lastMessage.createdTimestamp) > Number(client.getActivity.get(member.id, member.guild.id).date_active))
        log(client, member)
    })
  })
}