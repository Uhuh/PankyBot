import bot from '../src/bot'
import { Message } from 'discord.js'

export default function ping(client: bot, message: Message) {
  message.channel.send("pong!").catch(console.error);
}