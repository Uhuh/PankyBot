import PankyBot from "../../src/bot"
import { Message } from 'discord.js'

export default {
  desc: 'Send the github link and the invitation link',
  common: 'github',
  args: '',
  alias: ['source', 'github'],
  run: async function (message: Message, client: PankyBot) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "PankyBot's GitHub",
        url: "https://github.com/Uhuh/PankyBot",
        description: "This bot does legit nothing but here's the GH.",
        fields: [{
          name: "Bot invite link",
          value: "https://discordapp.com/oauth2/authorize?client_id=342815158688808961&scope=bot&permissions=8"
        }],
        timestamp: new Date(),
        footer: {
          text: "© ye boi"
        }
      }
    })
  }
}