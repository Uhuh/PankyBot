import * as SQLite from 'better-sqlite3'
import { Guild, GuildMember, Message, RichEmbed } from "discord.js";
import * as moment from 'moment'
import PankyBot from "../../src/bot";
const sql = new SQLite('users.sqlite')

export default {
  desc: 'Returns the request amount of least active users.',
  common: 'activity',
  args: '<# of users>',
  alias: ['active', 'activity', 'ga'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    if (!args[0] || !(typeof Number(args[0]) === 'number') || isNaN(Number(args[0]))) {
      return message.channel.send(`Please enter a number. EG: \`${client.config.PREFIX}getactivity 5\``)
    }
    const guild = client.guilds.get(message.guild.id)
    const lostUsers = client.usersActivity.all(message.guild.id)
    const embed= new RichEmbed()
      .setColor(3447003)
      .setDescription(`Looky look`)

    let gUser
    let name

    // User might leave so clean the db
    for (const user of lostUsers) {
      gUser = guild!.members.get(user.user)
      if (!gUser) {
        client.removeActivity.run(user.user, user.guild)
      }
    }

    const leastActive = sql.prepare("SELECT * FROM activity WHERE guild = ? ORDER BY date_active ASC LIMIT ?")
                        .all(message.guild.id, args[0])
    embed.setTitle(`Top ${leastActive.length} least "active" users.`)

    for (const user of leastActive) {
      gUser = client.guilds.get(user.guild)!.members.get(user.user)

      // Because some people don't change their names so they would be null.
      name = (gUser!.nickname || gUser!.user.username)
      embed.addField(`**_${name}_**`, `Last active: *${moment(user.date_active)
            .format('MMM DD hh:mmA YYYY')}*`, (leastActive.length === 2 ? false : true))
    }
    message.channel.send({ embed })
  }
}
