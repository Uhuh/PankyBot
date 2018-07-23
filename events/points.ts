import bot from '../src/bot'
import { Message } from 'discord.js'

export default function points(client: bot, message: Message) {
  let score;
  if(message.guild) {
    score = client.getScore.get(message.author.id, message.guild.id)
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
    }
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
    }
    client.setScore.run(score);
  }
}