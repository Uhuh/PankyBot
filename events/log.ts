import { GuildMember } from "discord.js"
import * as moment from "moment"
import PankyBot from "../src/bot"
import { SET_ACTIVITY } from "../src/setup_tables";

export default (client: PankyBot, member: GuildMember) => {
  // Don't log any bots or DM's
  if (!member.guild.id || member.user.bot) { return; }

  const activity = {
    id: `${member.guild.id}-${member.id}`,
    user: member.id,
    guild: member.guild.id,
    date_active: `${((member.presence.status === 'online' || member.voiceChannel || !member.lastMessage)
      ? moment().valueOf() : member.lastMessage.createdTimestamp)}`
  }
  // `!member.lastMessage` is here because of when joining a new server it doesn't have anyone on record.
  // So to add everyone to db we want to log them as "active" the soon after the bot joins

  SET_ACTIVITY.run(activity)
}
