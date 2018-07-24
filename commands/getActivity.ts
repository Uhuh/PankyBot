import PankyBot from "../src/bot";
import * as SQLite from 'better-sqlite3'
import { Message } from "discord.js";
const sql = new SQLite('users.sqlite')

export default function getActivity(client: PankyBot, message: Message, args: string[]) {
  if(!args[0]  || !(typeof Number(args[0]) === 'number') || isNaN(Number(args[0]))) {
    return message.channel.send(`Please enter a number. EG: \`${client.config.PREFIX}getactivity 5\``)
  }
    
  const leastActive = sql.prepare("SELECT * FROM activity WHERE guild = ? ORDER BY date_active ASC LIMIT ?").all(message.guild.id, args[0])
  console.log(leastActive)
}