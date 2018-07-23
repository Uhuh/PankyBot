import PankyBot from '../src/bot'
import { Message } from 'discord.js'

export default function ping(client: PankyBot, message: Message) {
  // Good ol' tester.
  message.channel.send(`${client.ping}ms`).catch(console.error);
}