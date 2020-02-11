import { Message, MessageEmbed } from "discord.js";
import * as OS from "os";
import PankyBot from "../../src/bot";

export default {
  desc: 'Gives a list of things about the bot',
  name: 'botstatus',
  args: '',
  run: async function (message: Message, _args: string[], client: PankyBot) {

    const {user} = client;

    if (!user) return;

    const embed = new MessageEmbed()
    let userCount = 0
    let channelCount = 0

    for (const [, g] of client.guilds) {
      userCount += g.memberCount;
      channelCount += g.channels.size;
    }

    embed.setColor(16711683)
      .setTitle(`**Bot Status**`)
      .setThumbnail(user.avatarURL() || "")
      .addField(`**Bot Developer:**`, `Panku#0721`, true)
      .addField(`**The bot is in:**`, `${client.guilds.size} servers`, true)
      .addField(`**The bot is watching:**`, `${userCount} users`, true)
      .addField(`**The bot is watching:**`, `${channelCount} channels`, true)
      .addField(`**Bot OS:**`, `${OS.platform()}`, true)
    message.channel.send(embed)
  }
}
