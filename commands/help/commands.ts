import { Message, RichEmbed } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Sends a list of all available commands.',
  name: 'help',
  args: '',
  run: async function (message: Message, args: string[], client: PankyBot) {
    const embed = new RichEmbed()

    embed.setTitle('**List of commands**')
      .setColor(16711684)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setFooter('Have a great day :D')
      .setTimestamp(new Date())

    for (const func of client.commands.values()) {
      embed.addField(`**${client.config.PREFIX} ${func.name} ${func.args}**`, `Description: ${func.desc}`)
    }
    message.author.send({ embed })
  }
}
