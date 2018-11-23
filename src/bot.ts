import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as DBL from 'dblapi.js'
import log from '../events/log'
import msg from '../events/message'
import * as config from './vars'
import commandHandler from '../commands/commandHandler';
import activity from '../events/activity';

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
      this.user.setPresence({ game: { name: `@${this.user.username} help` }, status: 'online' })
      this.setInterval(() => this.dbl.postStats(this.guilds.size), 1800000)
      // Setup our sql tables.
      commandHandler(this)

    })

    this.on('voiceStateUpdate', (member: Discord.GuildMember) => log(member))
    this.on('message', (message: Discord.Message) => msg(this, message))
  }

  async start() {
    await this.login(this.config.TOKEN)
    activity(this)
    // Log activity every 10minutes.
    setInterval(() => activity(this), 600000)
  }
}
