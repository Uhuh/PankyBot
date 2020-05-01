import { Message, MessageEmbed } from "discord.js";
import * as math from 'mathjs';

export default {
  desc: 'Do math',
  name: 'math',
  args: '',
  type: 'general',
  run: async function (message: Message, args: string[]) {
    if(!args.length) return;

    let result = null;
    
    try {
      result = math.evaluate(args.join(' '));
    } catch (e) {
      return message.channel.send(`Input a valid calculation.`);
    }

    const embed = new MessageEmbed()
      .setColor(15105570)
      .setTitle(`Math Result`)
      .addField(`Input`, `\`\`\`js\n${args.join(' ')}\`\`\``)
      .addField(`Output`, `\`\`\`js\n${result}\`\`\``);
    
    return message.channel.send({ embed });
  }
}
