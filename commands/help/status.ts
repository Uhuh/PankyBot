import { Guild, Message, RichEmbed, Role } from "discord.js";

export default {
  desc: 'Gets the server info',
  name: 'status',
  args: '',
  run: async function (message: Message) {
    const embed = new RichEmbed()
    const guild = message.guild
    const roles = []
    let textC = 0
    let voiceC = 0
    if (message.channel.type === 'dm') { return; }

    for (const [k, role] of guild.roles) { roles.push(role) }

    for (const [k, channel] of guild.channels) {
      if (channel.type === 'text') { textC++; }
      else if (channel.type === 'voice') { voiceC++; }
    }

    embed.setColor(16772864)
      .setThumbnail(guild.iconURL)
      .setDescription(`**Server information for _${guild.name}_**`)
      .addField(`_**> Owner**_`, `\`${guild.owner.user.tag}\``, true)
      .addField(`_**> OwnerID**_`, `\`${guild.ownerID}\``, true)
      .addField(`_**> Users**_`, `\`${guild.memberCount}\``, true)
      .addField(`_**> Text Channels**_`, `\`${textC}\``, true)
      .addField(`_**> Voice Channels**_`, `\`${voiceC}\``, true)
      .addField(`_**> Roles** from highest to lowest_`, `${roles.reverse().join(' ')}`, true)

    message.channel.send(embed)
  }
}
