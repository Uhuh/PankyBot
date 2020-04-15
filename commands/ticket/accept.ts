import * as Discord from "discord.js"
import PankyBot from "../../src/bot"

export default {
  desc: 'Accept a ticket and create a channel for it',
  name: 'accept',
  args: '[ticket id]',
  run: async (message: Discord.Message, args: string[], client: PankyBot) => {
    let id = 1
    if(args.length > 0 && Number.isNaN(Number(args[0]))) {
      id = Number(args[0])
    }
    if (client.ticketQueue.length === 0) 
      return message.channel.send('Empty queue.')

    const ticket = client.ticketQueue[id-1];

    client.tickets.set(ticket.user.id, true);
    message.channel.send(`Accepted ${ticket.user.name}'s ticket for \`${ticket.message}\``)
    const member = message.guild?.members.cache.find(m => m.id === ticket.user.id)
    if(!member) return message.channel.send(`Couldn't find member with ${ticket.user.id}`)

    member.send(`Your ticket has been accepted by ${message.author.username}. Start talking to me here connect.`)

    message.guild?.channels.create(
      message.author.id,
      {
        type: 'text',
        parent: '690814797205209128',
        permissionOverwrites: [
          {
            id: '647960154079232041',
            deny: ['VIEW_CHANNEL']
          }
        ] 
      }
    )
    
    return;
  }
}
