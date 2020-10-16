import { Message, MessageEmbed } from "discord.js";

export default {
  desc: 'Gets the server info',
  name: 'status',
  args: '',
  type: 'general',
  run: async function (message: Message) {
    const embed = new MessageEmbed()
    const {guild} = message;
    let textC = 0
    let voiceC = 0
    if (message.channel.type === 'dm') { return; }

    if (!guild) return;

    for (const [, channel] of guild.channels.cache) {
      if (channel.type === 'text') { textC++; }
      else if (channel.type === 'voice') { voiceC++; }
    }

    const {owner} = guild;

    embed.setColor(16772864)
      .setThumbnail(guild.iconURL() || "hahaxd")
      .setDescription(`**Server information for _${guild.name}_**`);

    if(owner)
      embed.addField(`**Owner**`, `\`${owner.user.tag}\``);

    embed.addField(`**OwnerID**`, `\`${guild.ownerID}\``)
      .addField(`**Users**`, `\`${guild.memberCount}\``)
      .addField(`**Text Channels**`, `\`${textC}\``)
      .addField(`**Voice Channels**`, `\`${voiceC}\``)

    message.channel.send(embed);
  }
}
