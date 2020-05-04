import { Message, MessageEmbed } from "discord.js";

export default {
  desc: 'Make a poll',
  name: 'poll',
  args: '',
  type: '<Words words>',
  run: async (message: Message, args: string[]) => {
    if(args.length === 0) {
      return message.channel.send(`You need to give me something to poll.`);
    }

    const [content, time] = args.join(' ').split('|');

    if(content.length === 0) {
      return message.channel.send(`You need to give me something to poll.`);
    } else if(Number.isNaN(Number(time))) {
      return message.channel.send(`Send a value time in minutes.`)
    }

    const embed = new MessageEmbed()
      .setTitle(`POLL STARTED`)
      .setDescription(content)
      .setColor(16775168)
      .setFooter(`Poll will end in ${time} minute${Number(time) > 1 ? 's':''}`)
      .setTimestamp(new Date());
    
    const filter = (reaction: any) => {
      return ['👍', '👎'].includes(reaction.emoji.name);
    };

    return message.channel.send({ embed })
      .then(m => {
        m.react('👍');
        m.react('👎');
        embed.setTitle(`POLL ENDED`);
        embed.setFooter('Poll ended');

        m.awaitReactions(filter, { max: 500, time: Number(time) * 60000 })
          .then(colleected => {
            for(const [, r] of colleected) {
              embed.addField(r.emoji.name, r.count, true);
            }
            message.channel.send({ embed })
          })
          .catch(console.error);
      });
  }
}
