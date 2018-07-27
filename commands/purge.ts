import PankyBot from "../src/bot";
import { Message, User } from "discord.js";

export default function purge(client: PankyBot, message: Message, args: string[]) {
  let amount: number = Number(args[0])
  let user: User
  const channel = message.channel
  if(!message.guild || !Number(args[0])) return

  if(args[1]) user = message.mentions.members.first().user
  
  channel.fetchMessages().then((msgs) => {
    for(const [k, msg] of msgs) {
      if(amount === 0) return
      if(user && amount > 0 && user === msg.author) {
        msg.delete()
        amount--
      }
      if(!user && amount > 0) {
        msg.delete()
        amount--
      }
    }
  })
  .catch((err) => {
    console.log(err)
  })
}