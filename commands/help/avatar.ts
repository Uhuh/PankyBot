import { Message } from 'discord.js'
import PankyBot from '../../src/bot'

export default {
  desc: 'Grabs users avatar link.',
  name: 'avatar',
  args: '<user mention (optional)>',
  run: async function(message: Message, args: string[], client: PankyBot) {
    const member = message.mentions.members.find(val => val.id !== client.user.id)
    // Just returns a link to the persons avatar. /shrug
    message.channel.send(`Avatar: ${member ? member.user.avatarURL : message.author.avatarURL}`)
  }
}
