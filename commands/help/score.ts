import { Message, MessageEmbed } from "discord.js";
import { GET_SCORE, GUILD_SCORE } from "../../src/setup_tables";
import PankyBot from "../../src/bot";

export default {
  desc: 'Counting score. :)',
  name: 'score',
  args: '',
  run: (message: Message, _args: string[], client: PankyBot) => {
    if(!message.guild) return;

    if(message.mentions.members!.size > 1) {
      const member = message.mentions.members?.find(m => m.id !== client.user!.id);
      if(!member) return;
      const score = GET_SCORE.get(member.id, message.guild.id);
      if(!score) {
        return message.channel.send(`${member.displayName} has no counting points... :(`);
      }
      let msg = score.points < 0 ? 'yikes...' : 
                score.points < 100 ? 'keep counting!' : 
                score.points < 500 ? 'holy cow!' : 'get a job!';

      const frogPogNum = Math.floor(score.points/100 % 10);

      message.channel.send(`${member.displayName} has ${score.points} counting points, ${msg}`);
      if (frogPogNum !== 0 && frogPogNum < 8) {
        message.channel.send(
          {
            files: [{
              attachment: `images/fp${frogPogNum}.png`,
              name: `fp${frogPogNum}.png`
            }]
          }
        )
        .catch(console.error);
      }
    } else {
      const SCORES = GUILD_SCORE.all(message.guild.id);

      const embed = new MessageEmbed();

      embed.setTitle('**Counting scoreboard**')
        .setColor(16711684)
        .setFooter('Have a great day :D')
        .setTimestamp(new Date());

      for (const s of SCORES) {
        embed.addField(`**${message.guild.members.cache.get(s.user)?.displayName}**`, `Counting points: ${s.points}`)
      }
      message.channel.send({ embed })
    }

    return;
  }
}