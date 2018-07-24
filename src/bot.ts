import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as config from './vars'
import msg from '../events/message'
import log from '../events/log'
import setup_tables from './setup_tables';

export default class PankyBot extends Discord.Client {
  config: any
  getUser: any
  setUser: any
  getActivity: any
  setActivity: any
  constructor() {
    super()
    
    this.config = config
    
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)

      // Setup our sql tables.
      setup_tables(this)
    })

    this.on('voiceStateUpdate', (member: Discord.GuildMember) => log(this, member))
    this.on('message', (message: Discord.Message) => msg(this, message))
  }

  async start() {
    this.login(this.config.TOKEN)
  }
}
