import { Message, RichEmbed } from "discord.js";
import * as OS from "os";
import PankyBot from "../../src/bot";

export default {
  desc: 'Gives a list of things about the bot',
  common: 'botstatus',
  args: '',
  alias: ['botstatus', 'bs'],
  run: async function (message: Message, args: string[], client: PankyBot) {

    const embed = new RichEmbed()
    let userCount = 0
    let channelCount = 0

    for (const [k, g] of client.guilds) {
      userCount += g.memberCount;
      channelCount += g.channels.size;
    }

    embed.setColor(16711683)
      .setTitle(`**Bot Status**`)
      .setThumbnail(client.user.avatarURL)
      .addField(`**Prefix:**`, `${client.config.PREFIX}`, true)
      .addField(`**Bot Developer:**`, `Panku#7681`, true)
      .addField(`**The bot is in:**`, `${client.guilds.size} servers`, true)
      .addField(`**The bot is watching:**`, `${userCount} users`, true)
      .addField(`**The bot is watching:**`, `${channelCount} channels`, true)
      .addField(`**Ping:**`, `${client.ping} ms`, true)
      .addField(`**Bot OS:**`, `${OS.platform()}`, true)
    message.channel.send(embed)
  }
}
