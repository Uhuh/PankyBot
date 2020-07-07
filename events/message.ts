import { Message, MessageEmbed, TextChannel } from 'discord.js';
import commands from '../commands/help/commands';
import PankyBot from '../src/bot';
import * as logger from "log-to-file";

export default async function (client: PankyBot, message: Message) {
  //Don't care about bots.
  if (message.author.bot) { return "Bot" }

  const mention = message.mentions.users.first();
  const prefix = 's!';

  if (client.user && 
      (mention && mention.id === client.user.id || message.content.startsWith(prefix))
  ) {
    const length = message.content.startsWith(prefix) ? prefix.length : message.content.split(' ')[0].length;
    // + 1 for the damn space.
    const [command, ...args] = message.content.substring(length).match(/\S+/g) || [];

    // If the user mentions the bot then send them a pm with commands.
    if (!command) {
      commands.run(message, args, client);
      return;
    }

    const clientCommand = client.commands.get(command.toLowerCase());

    //If the command isn't in the big ol' list.
    if (!clientCommand) { 
      return; 
    }

    try {
      // Find the command and run it.
      clientCommand.run(message, args, client);
    } catch (e) {
      // CS server bot spam.
      // https://panku.is-inside.me/N4k0RieA.png
      const channel = client.channels.cache.get('676617287473692679') as TextChannel;
      if(channel) {
        const embed = new MessageEmbed();

        embed.setTitle(`**Error running command: ${command}**`)
          .setDescription(`${e}`)
          .setColor(16711684)
          .setFooter(`Command by: ${message.author.tag}`)
          .setTimestamp(new Date());

        channel.send({ embed });
      }
      return logger(`Error occurred trying to run command: ${e}`, 'errors.log');
    }

    return;
  }
}
