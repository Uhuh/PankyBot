import PankyBot from '../src/bot'
import { Message } from 'discord.js'

const ping = {
  desc: 'Returns bots ping',
  common: 'ping',
  args: '',
  alias: ['ping'],
  run: async function (client: PankyBot, message: Message) {
    // Good ol' tester.
    message.channel.send(`${client.ping}ms`).catch(console.error);
  }
}

export default ping