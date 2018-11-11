import { Message } from 'discord.js'
import commands from '../commands/help/commands'
import PankyBot from '../src/bot'
import log from './log'

export default (client: PankyBot, message: Message) => {
  //Don't care about bots.
  if (message.author.bot) { return "Bot"; }

  // User is clearly active by sending a message. Log this activity.
  log(client, message.member)

  const gPrefix = message.guild ? client.getPrefix.get(message.guild.id) : null

  //Ignore anything that doesn't use the prefix
  if (
    (gPrefix && message.content.indexOf(gPrefix.prefix) === 0)        ||
    (message.content.indexOf(client.config.PREFIX) === 0 && !gPrefix) ||
    (message.guild && message.mentions.members.has(client.user.id))   ||
    (message.channel.type === 'dm' && (gPrefix || client.config.PREFIX))
  ) {
    const length = message.content.indexOf(client.config.PREFIX) === 0 ? client.config.PREFIX.length :
                          (message.content.split(' ')[0].length)
    // + 1 for the damn space.
    const [command, ...args] = message.content.substring(length + 1).split(' ')
    // If the user mentions the bot then send them a pm with commands.
    if (gPrefix && message.mentions.members.has(client.user.id) && !command) { commands.run(message, args, client) }
    //If the command isn't in the big ol' list.
    if (!client.commands.has(command.toLowerCase())) { return 'Command DNE' }
    // Find the command and run it.
    client.commands.get(command.toLowerCase())!.run(message, args, client)
  }
  return "Prefix not used";
}
