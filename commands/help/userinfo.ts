import { GuildMember, Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Information about the user; created account, roles, etc.',
  common: 'userinfo',
  args: '',
  alias: ['userinfo'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let info: string = "";
    const member: GuildMember | undefined = message.mentions.members
                                            .first().user.id !== client.user.id ? message.mentions.members.first() : undefined;
    const name: string = member ? ( member.nickname || member.user.username ) : ( message.member.nickname || message.author.username );
    info = `User: ${member? member.user.tag : message.author.tag}`;
    info += `\nID: ${member? member.user.id : message.author.id}`;
    info += `\nName: ${name}`;
    info += `\nCreated: ${member ? member.user.createdAt : message.author.createdAt}`;
    if (member ? member.user.presence.game : message.author.presence.game) {
      info += `\nPresence: ${member ? member.user.presence.game.name : message.author.presence.game.name}`;
    }
    if (message.guild) { info += `\nJoined: ${message.guild.members.get(member ? member.user.id : message.author.id)!.joinedAt}`; }
    message.channel.send(`\`\`\`ruby\n${info}\n\`\`\``);
  }
};
