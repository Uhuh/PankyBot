import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Locks a channel for X minutes.',
  name: 'lock',
  args: '<number of minute(s)> <#Channel-name(s)>',
  run: (message: Message, args: string[], client: PankyBot) => {
    const guild = message.guild;
    const channels = message.mentions.channels;
    let minutes = 5;
    const { user } = client;
    if (message.channel.type === 'dm') { return; }
    if (!guild || !message.member || !user) throw new Error("Guild of member DNE");

    if (!message.member.hasPermission('MANAGE_CHANNELS')) { return message.react('👎') }

    if (!Number(args[0])) { return message.reply('please use a number for the amount of minutes to lock the channels.') }
    minutes = Number(args[0])

    const E_ID = guild.roles.everyone;

    if (!E_ID) return;

    for(const [, channel] of channels) {
      channel.overwritePermissions({
        permissionOverwrites: [
          {
            id: E_ID,
            deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
          }
        ]
      });
      setTimeout(() => {
        channel.overwritePermissions({
          permissionOverwrites: [
            {
              id: E_ID,
              allow: ['SEND_MESSAGES', 'ADD_REACTIONS']
            }
          ]
        });
      }, minutes * 60000);
    }

    /* for (const [, channel] of channels) {
      for (const [, role] of guild.roles) {
        channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ATTACH_FILES: false
        })
        setTimeout(() => {
          channel.overwritePermissions(role, {
            SEND_MESSAGES: true,
            ATTACH_FILES: true
          })
        }, minutes * 60000)
      }
    } */

    return;
  }
}
