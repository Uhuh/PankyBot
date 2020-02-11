import { Message, MessageEmbed } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Sends a list of all available commands.',
  name: 'help',
  args: '',
  run: async function (message: Message, _args: string[], client: PankyBot) {
    const embed = new MessageEmbed();

    const {user} = client;

    if (!user) return;

    embed.setTitle('**List of commands**')
      .setColor(16711684)
      .setAuthor(user.username, user.avatarURL() || "")
      .setThumbnail(user.avatarURL() || "")
      .setFooter('Have a great day :D')
      .setTimestamp(new Date())

    for (const func of client.commands.values()) {
      embed.addField(`**@${client.user?.username} ${func.name} ${func.args}**`, `Description: ${func.desc}`)
    }
    message.author.send({ embed })
  }
}
