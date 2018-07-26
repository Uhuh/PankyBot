import PankyBot from "../src/bot";
import { Message, Permissions } from "discord.js";

export default function kick(client: PankyBot, message: Message, args: string []) {
  let reason: string = ""
  if (!message.guild) return
  // Don't let some crazy dude spam kick gotta make sure they're the OG
  if(message.member.missingPermissions(["ADMINISTRATOR"])) return message.channel.send("You don't have permissions to use this command.")
  // Skip all the mentions.
  for(const i of message.mentions.members) args.shift()
  // If there is a reason given
  for(const i of args) { reason += i + " " }
  // List who's being kicked and the reason if given.
  for(const [k, member] of message.mentions.members) {
    message.channel.send(`_[Kicking **${member.nickname?member.nickname:member.user.username}**]_ because: _${reason?reason:"no reason given."}_`)
    member.kick(reason)
  }
}