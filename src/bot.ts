import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as DBL from 'dblapi.js'
import log from '../events/log'
import msg from '../events/message'
import * as config from './vars'
import commandHandler from '../commands/commandHandler';

interface Command {
  desc: string,
  name: string,
  args: string,
  run: Function
}

export default class PankyBot extends Discord.Client {
  config: any;
  dbl: any;
  commands: Discord.Collection<string, Command>
  constructor() {
    super()

    this.config = config;
    this.commands = new Discord.Collection()

    // Discord bot list, gotta up them server numbers for certified )
    this.dbl = new DBL(this.config.DBLTOKEN, this)
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)
      this.setInterval(() => this.dbl.postStats(this.guilds.size), 1800000)
      setInterval(() => this.presence(), 10000);
      // Setup our sql tables.
      commandHandler(this)

    })

    this.on('message', (message: Discord.Message) => msg(this, message))
    this.on('voiceStateUpdate', (member: Discord.GuildMember) => log(member))
    this.on('guildMemberAdd', (member: Discord.GuildMember) => log(member))
    this.on('guildCreate', (guild: Discord.Guild) => {
      for (const [k, member] of guild.members) {
        log(member)
      }
    })
  }

  presence() {
    const presArr = [
      `@${this.user.username} help`,
      `in ${this.guilds.size} guilds`,
      `with ${Math.floor(this.ping)} ping`
    ];

    this.user.setPresence({
      game: { name: presArr[Math.floor(Math.random() * presArr.length)] },
      status: "online"
    });
  }

  async start() {
    await this.login(this.config.TOKEN)
  }
}
