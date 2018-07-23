import { Message } from 'discord.js'
import bot from '../src/bot'
import cmds from '../commands/cmd'
import points from './points'

export default function msg(client: bot, message: Message) {
  //Don't care about bots.
  if (message.author.bot) return
​  //Any message counts as a point or somethin
  points(client, message)
  //Ignore anything that doesn't use the prefix
  if (message.content.indexOf(client.config.PREFIX) !== 0) return
​
  const [command, ...args] = message.content.substring(client.config.PREFIX.length).split(" ")
  //If the command isn't in the big ol' list.
  if(!cmds.has(command.toLowerCase())) return
  // Find the command and run it.
  cmds.get(command.toLowerCase())(client, message, args)
}