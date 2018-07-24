import PankyBot from '../src/bot'
import { Message } from 'discord.js';

export default function source(client: PankyBot, message: Message, args: any) {
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
        value: "https://discordapp.com/oauth2/authorize?client_id=342815158688808961&scope=bot&permissions=0"
      }],
      timestamp: new Date(),
      footer: {
        text: "© ye boi"
      }
    }
  })
}