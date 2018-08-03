import PankyBot from "../src/bot";
import { Message } from "discord.js";

const prefix = {
  desc: 'Change the bots prefix for the requested server',
  common: 'prefix',
  args: '<prefix you want>',
  alias: ['prefix'],
  run: async function (client: PankyBot, message: Message, args: string[]) {
    if (!message.guild) return
    if (!message.member.hasPermission('MANAGE_GUILD')) return
    if (args.length > 1) return
    // user mentions start with `<@` 
    if (args[0].includes('<@')) return
    const prefix = {
      id: `${message.guild.id}-${message.guild.ownerID}`,
      guild: message.guild.id,
      prefix: args[0]
    }
    client.setPrefix.run(prefix)
    // Let them bad boys know
    message.react('✅')
  }
}

export default prefix