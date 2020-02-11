import { Message, MessageEmbed } from "discord.js";

export default {
  desc: 'Gets the server info',
  name: 'status',
  args: '',
  run: async function (message: Message) {
    const embed = new MessageEmbed()
    const {guild} = message;
    const roles = []
    let textC = 0
    let voiceC = 0
    if (message.channel.type === 'dm') { return; }

    if (!guild) return;

    for (const [, role] of guild.roles) { roles.push(role) }

    for (const [, channel] of guild.channels) {
      if (channel.type === 'text') { textC++; }
      else if (channel.type === 'voice') { voiceC++; }
    }

    const {owner} = guild;

    embed.setColor(16772864)
      .setThumbnail(guild.iconURL() || "hahaxd")
      .setDescription(`**Server information for _${guild.name}_**`);

    if(owner)
      embed.addField(`_**> Owner**_`, `\`${owner.user.tag}\``, true);

    embed.addField(`_**> OwnerID**_`, `\`${guild.ownerID}\``, true)
      .addField(`_**> Users**_`, `\`${guild.memberCount}\``, true)
      .addField(`_**> Text Channels**_`, `\`${textC}\``, true)
      .addField(`_**> Voice Channels**_`, `\`${voiceC}\``, true)
      .addField(`_**> Roles** from highest to lowest_`, `${roles.reverse().join(' ')}`, true);

    message.channel.send(embed);
  }
}
