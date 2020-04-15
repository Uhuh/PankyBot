import * as Discord from "discord.js"
import PankyBot from "../../src/bot"

export default {
  desc: 'Close a ticket, must be done in the tickets channel',
  name: 'close',
  args: '',
  run: async (message: Discord.Message, _args: string[], client: PankyBot) => {
    const { guild } = message;
    if(!guild) return;

    client.tickets.delete((message.channel as Discord.TextChannel).name)
    const tickUser = guild.members.find(m => (message.channel as Discord.TextChannel).name === m.id)
    if(tickUser)
      tickUser.send(`Ticket closed by ${message.author.username}`)
    // message.channel.delete()
  }
}
