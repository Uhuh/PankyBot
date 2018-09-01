import PankyBot from "../../src/bot"
import { Message, RichEmbed } from "discord.js"
import cmd from "../cmd"

const commands = {
  desc: 'Sends a list of all available commands.',
  common: 'commands',
  args: '',
  alias: ['cmd', 'commands', 'help'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    const embed: RichEmbed = new RichEmbed()
    let prevValue
    embed.setTitle('**List of commands**')
      .setColor(16711684)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setFooter('Have a great day :D')
      .setTimestamp(new Date())

    for (const value of cmd.values()) {
      // Because I map each commands alias to themselves, it would output the same thing a few times... Let's avoid that.
      if (prevValue === value) continue

      embed.addField(`**${client.config.PREFIX} ${value.common} ${value.args}**`, `Alias: ${value.alias}\n${value.desc}`)
      prevValue = value
    }
    message.author.send({ embed })
  }
}

export default commands