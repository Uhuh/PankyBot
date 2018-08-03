import { Message } from 'discord.js'
import PankyBot from '../src/bot'
import cmds from '../commands/cmd'
import commands from '../commands/commands';
import * as SQlite from 'better-sqlite3'
const sql = new SQlite('users.sqlite')

export default function msg(client: PankyBot, message: Message) {
  //Don't care about bots.
  if (message.author.bot) return

  // There's a reason people get server muted.
  if (message.member.serverMute) message.delete()

  const gPrefix = client.getPrefix.get(message.guild.id)

  //Ignore anything that doesn't use the prefix
  if (
    message.content.indexOf(gPrefix.prefix) === 0 ||
    (message.content.indexOf(client.config.PREFIX) === 0 && !gPrefix) ||
    message.mentions.members.has(client.user.id)
  ) {
    const length: number = message.content.indexOf(client.config.PREFIX) === 0 ? client.config.PREFIX.length : (message.content.split(' ')[0].length)
    // + 1 for the damn space.
    const [command, ...args] = message.content.substring(length + 1).split(' ')
    // If the user mentions the bot then send them a pm with commands.
    if (message.mentions.members.has(client.user.id) && !command) commands.run(client, message, args)
    //If the command isn't in the big ol' list.
    if (!cmds.has(command.toLowerCase())) return
    // Find the command and run it.
    cmds.get(command.toLowerCase()).run(client, message, args)
  }
}