import bot from '../src/bot'
import { Message } from 'discord.js'

export default function ping(client: bot, message: Message) {
  // Good ol' tester.
  message.channel.send(`${client.ping}ms`).catch(console.error);
}