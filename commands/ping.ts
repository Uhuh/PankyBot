import bot from '../src/bot'
import { Message } from 'discord.js'

export default function ping(client: bot, message: Message, args: any) {
  // Good ol' tester.
  message.channel.send(`${client.ping}ms`).catch(console.error);
}