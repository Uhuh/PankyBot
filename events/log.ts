import PankyBot from "../src/bot";
import { GuildMember } from "discord.js";
import * as moment from "moment";

export default function log(client: PankyBot, member: GuildMember) {
  // Don't log any bots or DM's
  if (!member.guild.id || member.user.bot) return
  
  let activity = { 
    id: `${member.guild.id}-${member.id}`, 
    user: member.id, 
    guild: member.guild.id, 
    date_active: `${((member.presence.status == 'online' || member.voiceChannel || !member.lastMessage)
                      ? moment().valueOf() : member.lastMessage.createdTimestamp) }` 
  }
  client.setActivity.run(activity)
}