import * as Discord from "discord.js"
import PankyBot from "../../src/bot"

export default {
  desc: 'Generate a ticket and add to the queue.',
  name: 'ticket',
  args: '<A message describing your problem>',
  run: async (message: Discord.Message, args: string[], client: PankyBot) => {

    if (message.channel.type !== 'dm') {
      return message.author.send(`You need to create a ticket in the DM's`)
    }

    const ticket = client.ticketQueue.find(t => message.author.id === t.user.id)
    if (ticket) {
      // @TODO Add ability to let the user submit a new ticket.
      return message.author.send(`You already have a pending ticket for \`${ticket.message}\``)
    }

    client.ticketQueue.push(
      {
        user: {
          id: message.author.id,
          name: message.author.username
        },
        message: args.join(' ')
      }
    )
    message.author.send(`Your ticket has been added to the queue, your position is: ${client.ticketQueue.length}`)
   
    return;
  }
}
