import { Message, Guild, RichEmbed } from "discord.js"
import PankyBot from "../../src/bot"

const botStatus = {
  desc: 'Gives a list of things about the bot',
  common: 'botstatus',
  args: '',
  alias: ['botstatus', 'bs'],
  run: async function (client: PankyBot, message: Message, args: string[]) {
    const guild: Guild = message.guild
    const embed: RichEmbed = new RichEmbed()
    let userCount: number = 0
    let channelCount: number = 0
    if (!guild) return
    for (const [k, g] of client.guilds) { userCount += g.memberCount; channelCount += g.channels.size }

    embed.setColor(16711683)
      .setTitle(`**Bot Status**`)
      .setThumbnail(client.user.avatarURL)
      .addField(`**Prefix:**`, `${client.config.PREFIX}`, true)
      .addField(`**Bot Developer:**`, `Panku#7681`, true)
      .addField(`**The bot is in:**`, `${client.guilds.size} servers`, true)
      .addField(`**The bot is watching:**`, `${userCount} users`, true)
      .addField(`**The bot is watching:**`, `${channelCount} channels`, true)
      .addField(`**Ping:**`, `${client.ping} ms`, true)
      .addField(`**Bot OS:**`, `Linux`, true)
    message.channel.send(embed)
  }
}

export default botStatus