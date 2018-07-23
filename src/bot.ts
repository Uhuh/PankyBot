import * as Discord from "discord.js"
import * as dotenv from 'dotenv'
dotenv.config()
import * as config from './vars'
import msg from '../events/message'

export default class PankyBot extends Discord.Client {
  config: any
  
  constructor() {
    super()
    
    this.config = config
    
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)
    })

    this.on('message', (message: Discord.Message) => msg(this, message))
  }

  async start() {
    this.login(this.config.TOKEN)
  }
}
