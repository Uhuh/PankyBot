import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as DBL from 'dblapi.js'
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
      setInterval(() => this.randPres(), 10000);
      this.setInterval(() => this.serverChannels(), 10000);
    })

    this.on('message', (message: Discord.Message) => msg(this, message));
  }

  randPres = () => {
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

  serverChannels = () => {
    const G_ID = "647960154079232041";
    const M_COUNT = "676629201645862962";
    const MSG_VC = "676639231648464908";
    const COUNT = "676613498968473610";
    
    const guild = this.guilds.get(G_ID);

    if (!guild) return console.log("Somehow not in CS guild");

    const channel = guild.channels.get(M_COUNT);
    const m_channel = guild.channels.get(MSG_VC);
    const count_channel = guild.channels.get(COUNT) as Discord.TextChannel;

    if(!channel || !m_channel || !count_channel) return console.log("VC Channel not avial");

    channel.edit({
      name: `Server member count: ${guild.memberCount}`
    });

    count_channel.messages.fetch().then(m => {
      m_channel.edit({
        name: `Count number: ${m.size}`
      });
    })
  }

  async start() {
    await this.login(this.config.TOKEN)
  }
}
