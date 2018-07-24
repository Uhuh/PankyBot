import PankyBot from "../src/bot";
import { GuildMember } from "discord.js";
import * as moment from "moment";

export default function log(client: PankyBot, member: GuildMember) {
  if (!member.guild.id) return console.log("Tried to log someone that's not in guild")
  let activity = { id: `${member.guild.id}-${member.id}`, user: member.id, guild: member.guild.id, date_active: `${moment().valueOf()}` }
  client.setActivity.run(activity)
}