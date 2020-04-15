import * as Discord from "discord.js"
import PankyBot from "../../src/bot"

export default {
  desc: 'Show the ticket queue.',
  name: 'queue',
  args: '',
  run: async (message: Discord.Message, _args: string[], client: PankyBot) => {
    if (client.ticketQueue.length === 0) return message.channel.send('Empty queue.')
    message.channel.send(
      client.ticketQueue.map((t, i) => `[ T_ID: ${i+1} - USER: ${t.user.name} ] - \`${t.message}\``)
    )

    return;
  }
}
