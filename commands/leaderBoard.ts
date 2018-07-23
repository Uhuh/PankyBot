import bot from '../src/bot'
import * as SQLite from 'better-sqlite3'
import { Message, RichEmbed } from 'discord.js';
const sql = new SQLite('scores.sqlite')

export default function leaderBoard(client: bot, message: Message) {
  const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

  if(!top10) return // No top 10 somehow

  const embed = new RichEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0x00AE86);
  
  for(const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
  }

  return message.channel.send({embed});
}