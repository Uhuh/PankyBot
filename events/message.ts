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
  const args = message.content.slice(client.config.PREFIX.length).trim().split(/ +/g)
  //If the command isn't in the big ol' list.
  if(!cmds.has(args[0])) return
  // Find the command and run it.
  cmds.get(args[0])(client, message, args)
}