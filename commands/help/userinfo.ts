import { Message, MessageEmbed } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Information about user.',
  name: 'userinfo',
  args: '',
  type: 'general',
  run: async function (message: Message, args: string[], client: PankyBot) {
    const { user } = client;

    if (!user) return;

    const userId = message.mentions.members?.first()?.id || args.shift() || message.author.id;

    // There is some issues with discord and cached users so if someone hasn't sent a message this command won't
    // work for said user. Assuming the person mentions a new user.
    const member = message.guild?.members.cache.get(userId || '');

    if (!member) return;

    const embed = new MessageEmbed();

    embed.setTitle(`**User Info**`)
      .setColor(7419530)
      .setThumbnail(member.user.avatarURL({dynamic: true}) || "")
      .setFooter(`Replying to: ${message.author.tag}`)
      .addField(`**DETAILS**`, 
        `\`\`\`asciidoc
• Username :: ${member.user.tag}
• ID       :: ${member.user.id}
• Created  :: ${member.user.createdAt.toDateString()}
• Joined   :: ${member.joinedAt?.toDateString()}\`\`\``
      )
      .addField(`**STATUS**`, 
        `\`\`\`asciidoc
• Type     :: ${member.user.bot ?  "Beepboop, I'm a bot." : "I'm Human."}
• Presence :: ${member.presence.activities[0]}\`\`\``
      )
      .setTimestamp(new Date());

    message.channel.send({ embed })
  }
}
