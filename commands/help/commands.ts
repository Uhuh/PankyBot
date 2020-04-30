import { Message, MessageEmbed } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Sends a list of all available commands.',
  name: 'help',
  args: '[category]',
  type: 'general',
  run: async function (message: Message, args: string[], client: PankyBot) {
    const embed = new MessageEmbed();

    const {user} = client;

    if(!user) return;

    embed
      .setDescription(`<> = required arguments, [] = optional.`)
      .setColor(16711684)
      .setAuthor(user.username, user.avatarURL() || "")
      .setThumbnail(user.avatarURL() || "")
      .setFooter(`Replying to: ${message.author.tag}`)
      .setTimestamp(new Date());
    
    if(!args.length) {
      embed.setTitle('**COMMAND CATEGORIES**')
      embed.addField(`**GENERAL**`, `Try out \`@${user.tag} help general\``);
      embed.addField(`**ECONOMY**`, `Try out \`@${user.tag} help economy\``);
      embed.addField(`**MOD**`, `Try out \`@${user.tag} help mod\``);
    } 
    else if(args.length === 1) {
      args[0] = args[0].toLowerCase();
      if(args[0] !== 'general' && args[0] !== 'economy' && args[0] !== 'mod') {
        return;
      }
      embed.setTitle(`**${args[0].toUpperCase()} COMMANDS**`);

      for (const func of client.commands.values()) {
        if(func.type === args[0]) {
          embed.addField(`**@${user.username} ${func.name} ${func.args}**`, `${func.desc}`);
        }
      }
    }

    message.channel.send({ embed });
  }
}
