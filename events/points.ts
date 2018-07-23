import bot from '../src/bot'
import { Message } from 'discord.js'

export default function points(client: bot, message: Message) {
  let score;
  if(message.guild) {
    // Get the users current score info.
    score = client.getScore.get(message.author.id, message.guild.id)
    // If the user doesn't exist in the DB set default (level 0)
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
    }
    // ding ding gimmie the points
    score.points++;

    const curLevel = Math.floor(0.8 * Math.sqrt(score.points));
    
    if(score.level < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**!`);
      score.level = curLevel
    }
    // time to set the score baybee
    client.setScore.run(score);
  }
}