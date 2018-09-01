import PankyBot from "../../src/bot"
import { Message, Guild, GuildChannel, Collection } from "discord.js"

const lock = {
  desc: 'Locks a channel for X minutes.',
  common: 'lock',
  args: '<number of minute(s)> <#Channel-name(s)>',
  alias: ['lock'],
  run: async function(client: PankyBot, message: Message, args: string[]) {
    const guild: Guild = message.guild
    let channels: Collection<String, GuildChannel> = message.mentions.channels
    let minutes: number = 10
    
    if (message.channel.type === 'dm') return
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return

    if (!Number(args[0])) return message.reply('please use a number for the amount of minutes to lock the channels.')
    minutes = Number(args[0])
    
    for (const [k, channel] of channels) {
      for (const [k, role] of guild.roles) {
        channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ATTACH_FILES: false
        })
        setTimeout(() => {
          channel.overwritePermissions(role, {
            SEND_MESSAGES: true,
            ATTACH_FILES: true
          })
        }, minutes*60000)
      }
    }
  }
}

export default lock