import { Message, TextChannel } from 'discord.js'
import commands from '../commands/help/commands'
import PankyBot from '../src/bot'
import * as logger from "log-to-file"

export default async function (client: PankyBot, message: Message) {
  //Don't care about bots.
  if (message.author.bot) { return "Bot" }

  if (
      message.channel.type === 'dm' && 
      // comp sci discord lol
      client.guilds.get('647960154079232041')?.members.has(message.author.id) &&
      client.tickets.has(message.author.id)
  ) { client.handleTicketMessage(message, 'dm') } 
  else if(
    client.tickets.has((message.channel as TextChannel).name) &&
    message.content.includes('!close')
  ) { client.handleTicketMessage(message, 'close') } 
  else if(
    client.tickets.has((message.channel as TextChannel).name)
  ) { client.handleTicketMessage(message, 'reply') }
  else if (
    client.guilds.get('647960154079232041')?.members.get(message.author.id) &&
    !client.tickets.has((message.channel as TextChannel).name) &&
    message.channel.type === 'dm'
  ) {
    client.handleTicketMessage(message, 'create')
  }
  
  const mention = message.mentions.users.first();

  if (mention && client.user && mention.id === client.user.id) {
    const length = message.content.split(' ')[0].length;
    // + 1 for the damn space.
    const [command, ...args] = message.content.substring(length + 1).split(' ')

    // If the user mentions the bot then send them a pm with commands.
    if (!command) {
      commands.run(message, args, client);
      return;
    }

    const clientCommand = client.commands.get(command.toLowerCase());

    //If the command isn't in the big ol' list.
    if (!clientCommand) { 
      return console.log('Command DNE'); 
    }

    try {
      // Find the command and run it.
      clientCommand.run(message, args, client);
    } catch (e) {
      logger(`Error occurred trying to run command: ${e}`, 'errors.log');
    }
  }
}
