import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Say something',
  name: 'say',
  args: '',
  type: 'owner',
  run: async function (message: Message, args: string[], client: PankyBot) {
    if(message.author.id === client.config.BOT_OWNER) {
      message.channel.send(args.join(' '));
    }
  }
}
