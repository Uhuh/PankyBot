import PankyBot from "../src/bot";
import { Message } from "discord.js";

export default function setName(client: PankyBot, message: Message, args: string[]) {
  let user
  let name: string = ""
  if(!args) return
  args.shift()
  args.forEach((i) => {
    name += i + " "
  })
  if (message.guild) {
    user = { id: `${message.guild.id}-${message.mentions.members.first().user.id}`, user: message.mentions.members.first().user.id, guild: message.guild.id, note: name  }
    client.setUser.run(user)
  }
  message.reply(`Successfully set ${client.users.get(message.mentions.members.first().user.id)!.username}'s name.`)
}