import PankyBot from "../src/bot";
import { Message, Permissions, RichEmbed } from "discord.js";

export default function kick(client: PankyBot, message: Message, args: string []) {
  let reason: string = ""
  let embed: RichEmbed = new RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
  if (!message.guild) return
  // Don't let some crazy dude spam kick gotta make sure they're the OG
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permissions to use this command.")
  // Skip all the mentions.
  for(const i of message.mentions.members) args.shift()
  // If there is a reason given
  for(const i of args) { reason += i + " " }
  // List who's being kicked and the reason if given.
  for(const [k, member] of message.mentions.members) {
    
    member.kick(reason).then(() => {
      embed.setColor(65295)
        .setTitle(`:wave: Bye ${member.nickname?member.nickname:member.user.username} :wave:`)
        .setDescription('Successfully kicked user!')
        message.channel.send(embed)
    })
    .catch(() => {
      embed.setColor(16711683)
        .setTitle(':octagonal_sign: **Unable to kick** :octagonal_sign:')
        .setDescription('There was an issue while kicking')
        .addField(':thinking:', 'I can\'t kick any role higher or equal to mine! Are you trying to kick someone above me?', true)
        .addField(':thinking:', 'I might not have permissions to kick! Give me permissions by going to server settings and giving me a role that has the ability to kick!', true)
        message.channel.send(embed)
      })
  }
}