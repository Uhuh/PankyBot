import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Information about the user; created account, roles, etc.',
  name: 'userinfo',
  args: '',
  run: async function (message: Message, args: string[], client: PankyBot) {
    let info = "";
    // There is some issues with discord and cached users so if someone hasn't sent a message this command won't
    // work for said user. Assuming the person mentions a new user.
    const member = message.mentions.members.find(val => val.id !== client.user.id) || message.member;

    info = `User: ${member.user.tag}`;
    info += `\nID: ${member.user.id}`;
    info += `\nName: ${member.displayName}`;
    info += `\nCreated: ${member.user.createdAt}`;
    if (member.user.presence.game) {
      info += `\nPresence: ${member.user.presence.game.name}`;
    }
    if (message.guild) { info += `\nJoined: ${member.joinedAt}`; }
    info += `\nLast_Message: ${member.user.lastMessage.createdAt}`;
    info += `\nAvatarURL: ${member.user.avatarURL}`;
    message.channel.send(`\`\`\`ruby\n${info}\n\`\`\``)
  }
}
