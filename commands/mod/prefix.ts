import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Change the bots prefix for the requested server. If no arguments passed it will display the guilds prefix.',
  name: 'prefix',
  args: '<prefix you want>',
  run: async function (message: Message, args: string[], client: PankyBot) {
    const gPrefix = client.getPrefix.get(message.guild.id)

    if (message.channel.type === 'dm') { return }
    if (args.length === 0) { return message.channel.send(`The guild's prefix is \`${gPrefix?gPrefix.prefix:'modpls'}\``) }
    if (!message.member.hasPermission('MANAGE_GUILD')) { return message.react('👎') }
    if (args.length > 1) { return }
    // user mentions start with `<@`
    if (args[0].includes('<@')) { return }

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
