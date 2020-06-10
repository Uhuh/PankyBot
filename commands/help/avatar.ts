import { Message, MessageEmbed } from 'discord.js'
import PankyBot from '../../src/bot'

export default {
  desc: 'Grabs users avatar link.',
  name: 'avatar',
  args: '[user]',
  type: 'general',
  run: (message: Message, _args: string[], client: PankyBot) => {
    const { user }= client;
    const { members } = message.mentions;
    if (!user) 
      throw new Error("Client missing?");
    if (!members)
      throw new Error("Idk how it got here without a mention...");

    const member = members.last();
    const embed = new MessageEmbed();
    const m = members.size === 1 ? message.member : member || message.member;

    if (!m)
      throw new Error("Somehow user doesn't exist");

    embed.setDescription(`[Link to Avatar](${m.user.avatarURL({ dynamic: true, size: 2048 })})`);
    embed.setImage(m.user.avatarURL({ dynamic: true, size: 2048 }) || "");

    message.channel.send(embed);
  }
}