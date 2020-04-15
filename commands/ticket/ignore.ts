import * as Discord from "discord.js"
import PankyBot from "../../src/bot"

export default {
  desc: 'Close a ticket, must be done in the tickets channel',
  name: 'close',
  args: '',
  run: async (message: Discord.Message, args: string[], client: PankyBot) => {
    let id = 1;
    if(args.length > 0 && Number.isNaN(Number(args[0]))) {
      id = Number(args[0])
    }

    const ticket = client.ticketQueue[id-1]
    client.ticketQueue.splice(id-1, 1)

    message.channel.send(`Removed \`${ticket.message}\` from the ticket queue. There are ${client.ticketQueue.length} left`)
  }
}
