import { Message, MessageEmbed } from 'discord.js';
import { GET_SCORE, GUILD_SCORE } from '../../src/setup_tables';
import PankyBot from '../../src/bot';

export default {
  desc: 'Check clownbuck score or counting score.',
  name: 'score',
  args: '[user] <scores|points>',
  type: 'economy',
  run: (message: Message, args: string[], client: PankyBot) => {
    if (!message.guild) return;

    let type = args.length ? args[0] : 'scores';
    if (args.length && args[0] !== 'points' && args[0] !== 'scores') {
      type = 'scores';
    }

    if (message.mentions.members!.size > 1) {
      const member = message.mentions.members?.find(
        (m) => m.id !== client.user!.id
      );
      if (!member) return;
      const score = GET_SCORE(member.id, message.guild.id, type);
      if (!score) {
        return message.channel.send(
          `${member.displayName} has no clownbucks... :(`
        );
      }
      let msg =
        score.points < 0
          ? 'yikes...'
          : score.points < 100
          ? 'keep counting!'
          : score.points < 500
          ? 'holy cow!'
          : score.points < 1000
          ? 'get a job!'
          : 'one percenter out here.';

      let frogPogNum = Math.floor((score.points / 100) % 10);

      message.channel.send(
        `${member.displayName} has ${score.points} clownbucks, ${msg}`
      );
      if (frogPogNum !== 0) {
        frogPogNum = frogPogNum >= 8 ? 7 : frogPogNum;
        message.channel
          .send({
            files: [
              {
                attachment: `images/fp${frogPogNum}.png`,
                name: `fp${frogPogNum}.png`,
              },
            ],
          })
          .catch(console.error);
      }
    } else {
      console.log(`Gettings scores for ${type}`);
      const SCORES = GUILD_SCORE(message.guild.id, type);
      console.log(SCORES);

      const curr = type === 'points' ? 'Clownbucks' : 'Counting';
      const scoreType = type === 'points' ? 'clownbucks' : 'counting';

      const embed = new MessageEmbed();

      embed
        .setTitle(`**${scoreType.toUpperCase()} SCOREBOARD**`)
        .setColor(16711684)
        .setFooter('Have a great day :D')
        .setTimestamp(new Date());

      for (const s of SCORES) {
        embed.addField(
          `**${message.guild.members.cache.get(s.user)?.displayName}**`,
          `${curr}: ${s.points}`
        );
      }
      message.channel.send({ embed });
    }

    return;
  },
};
