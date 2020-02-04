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

    commandHandler(this)
    
    // Discord bot list, gotta up them server numbers for certified )
    this.dbl = new DBL(this.config.DBLTOKEN, this)
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)
      this.setInterval(() => this.dbl.postStats(this.guilds.size), 1800000)
      setInterval(() => this.presence(), 10000);
    })

    this.on('message', (message: Discord.Message) => msg(this, message))
    this.on('voiceStateUpdate', (member: Discord.GuildMember) => log(member))
    this.on('guildMemberAdd', (member: Discord.GuildMember) => log(member))
    this.on('guildCreate', (guild: Discord.Guild) => {
      for (const [, member] of guild.members) {
        log(member)
      }
    })
  }

  presence = () => {
    const { user } = this;
    if (!user) return console.log("Is client dead? Can't find in presence.");

    const presArr = [
      `@${user.username} help`,
      `in ${this.guilds.size} guilds`,
      `moderation...`
    ];

    user.setPresence({
      activity: { name: presArr[Math.floor(Math.random() * presArr.length)], type: "CUSTOM_STATUS" },
      status: "online"
    }).catch(console.error);
  }

  async start() {
    await this.login(this.config.TOKEN)
  }
}
