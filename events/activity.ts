import PankyBot from "../src/bot";
import log from './log'

export default function activity(client: PankyBot) {
  client.guilds.forEach((guild) => {
    guild.members.forEach((member) => {

      /*
        Best way to keep track of... "EVERYONE" is if we just log everyone. Of course if this is a LARGEEEE server this is gonna be ugly..
        However can't just depend on lastmessage
        SO check if they're anything but online and NOT currently being watched.
      */
      if((member.presence.status == 'idle' || member.presence.status == 'dnd' || 
          member.presence.status == 'offline') && !client.getActivity.get(member.id, member.guild.id))
        log(client, member)
      // If they're online then they're active. OBVO
      else if(member.presence.status == 'online')
        log(client, member)
      // Might not have user in DB
      else if(member.lastMessage && !client.getActivity.get(member.id, member.guild.id))
        log(client, member)
      // The user might have a presence that's invis, so keep track of messages.
      else if(member.lastMessage && Number(member.lastMessage.createdTimestamp) < Number(client.getActivity.get(member.id, member.guild.id).date_active))
        log(client, member)
    })
  })
}