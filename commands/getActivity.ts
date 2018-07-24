import PankyBot from "../src/bot";
import * as SQLite from 'better-sqlite3'
import { Message, RichEmbed, GuildMember } from "discord.js";
import * as moment from 'moment'
import { resolve } from "url";
const sql = new SQLite('users.sqlite')


export default function getActivity(client: PankyBot, message: Message, args: string[]) {
  if(!args[0]  || !(typeof Number(args[0]) === 'number') || isNaN(Number(args[0]))) {
    return message.channel.send(`Please enter a number. EG: \`${client.config.PREFIX}getactivity 5\``)
  }
    
  const leastActive = sql.prepare("SELECT * FROM activity WHERE guild = ? ORDER BY date_active ASC LIMIT ?").all(message.guild.id, args[0])
  
  const embed: RichEmbed = new RichEmbed()
      .setAuthor(client.user.username)
      .setColor(3447003)
      .setDescription(`Looky look`)
      .setTitle(`Top ${args[0]} least "active" users.`)
  for (const user of leastActive) {
    embed.addField(`${client.guilds.get(user.guild)!.members.get(user.user)!.user.username}`,`Last active: ${moment(Number(user.date_active)).format('ddd MMM DD YYYY')}`)
  }
  message.channel.send({embed})
}