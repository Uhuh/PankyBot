import PankyBot from "../src/bot";
import * as SQLite from 'better-sqlite3'
import { Message, RichEmbed, GuildMember } from "discord.js";
import * as moment from 'moment'
const sql = new SQLite('users.sqlite')


export default function getActivity(client: PankyBot, message: Message, args: string[]) {
  if(!args[0]  || !(typeof Number(args[0]) === 'number') || isNaN(Number(args[0]))) {
    return message.channel.send(`Please enter a number. EG: \`${client.config.PREFIX}getactivity 5\``)
  }
    
  const leastActive = sql.prepare("SELECT * FROM activity WHERE guild = ? ORDER BY date_active ASC LIMIT ?").all(message.guild.id, args[0])

  const embed: RichEmbed = new RichEmbed()
      .setColor(3447003)
      .setDescription(`Looky look`)
      .setTitle(`Top ${leastActive.length} least "active" users.`)
  let gUser: GuildMember | undefined
  let name: string
  for (const user of leastActive) {
    gUser = client.guilds.get(user.guild)!.members.get(user.user)
    // Because some people don't change their names so they would be null.
    name = (gUser!.nickname?gUser!.nickname : gUser!.user.username)

    embed.addField(`**_${name}_**`,`Last active: *${moment(Number(user.date_active)).format('MMM DD hh:mmA YYYY')}*`, true)
  }
  message.channel.send({embed})
}