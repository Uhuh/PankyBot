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
    console.log(`Score.P: ${score.points}`)
    const curLevel = Math.floor(0.8 * Math.sqrt(score.points));
    console.log(`CurrL: ${curLevel}; Score.L: ${score.level}`)
    if(score.level < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**!`);
      score.level = curLevel
    }
    client.setScore.run(score);
  }
}