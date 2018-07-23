import bot from '../src/bot'
import { Message } from 'discord.js';

export default function source(client: bot, message: Message, args: any) {
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
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© ye boi"
      }
    }
  })
}