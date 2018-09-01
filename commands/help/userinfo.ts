import { Message } from "discord.js";

 export default {
  desc: 'Information about the user; created account, roles, etc.',
  common: 'userinfo',
  args: '',
  alias: ['userinfo'],
  run: async function(message: Message) {
    let info: string = ""
    info = `User: ${message.author.tag}`
    info += `\nID: ${message.author.id}`
    info += `\nName: ${message.author.username}`
    info += `\nCreated: ${message.author.createdAt}`
    if (message.guild) info += `\nJoined: ${message.guild.members.get(message.author.id)!.joinedAt}`
    message.channel.send(`\`\`\`ruby\n${info}\n\`\`\``)
  }
}