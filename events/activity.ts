import PankyBot from "../src/bot";
import { GuildMember } from "discord.js";
import * as moment from "moment";

export default function activity(client: PankyBot, member: GuildMember) {
  let activity;
  if (member) {
    activity = { id: `${member.guild.id}-${member.id}`, user: member.id, guild: member.guild.id, date_active: `${moment().format()}` }
    client.setActivity.run(activity)
  }
}