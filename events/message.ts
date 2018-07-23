import { Message } from 'discord.js'
import bot from '../src/bot'
import cmds from '../commands/cmd'

export default function msg(client: bot, message: Message) {
  if (message.author.bot) return
​
  if (message.content.indexOf(client.config.PREFIX) !== 0) return
​
  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.PREFIX.length).trim().split(/ +/g)
  
  if(!cmds.has(args[0])) return

  cmds.get(args[0])(client, message)
}