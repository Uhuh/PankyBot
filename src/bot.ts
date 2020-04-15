import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as DBL from 'dblapi.js'
import msg from '../events/message'
import * as config from './vars'
import commandHandler from '../commands/commandHandler'
import { GET_SCORE, SET_SCORE } from './setup_tables'

interface Command {
  desc: string,
  name: string,
  args: string,
  run: Function
}

interface Ticket {
  user: {
    id: string,
    name: string
  },
  message: string
}

export default class PankyBot extends Discord.Client {
  config: any;
  dbl: any;
  prevCount: number | null;
  prevCounter: Discord.User | null;
  baseType: number;
  tickets: Discord.Collection<string, boolean>;
  ticketQueue: Ticket[];
  questions: string[];
  commands: Discord.Collection<string, Command>;
  constructor() {
    super()

    this.config = config;
    this.commands = new Discord.Collection()
    this.tickets = new Discord.Collection()
    this.ticketQueue = []
    this.questions = []
    this.baseType = 2;
    this.prevCount = null;
    this.prevCounter = null;
    commandHandler(this)
    
    // Discord bot list, gotta up them server numbers for certified )
    this.dbl = new DBL(this.config.DBLTOKEN, this)
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)
      this.setInterval(() => this.dbl.postStats(this.guilds.size), 1800000)
      this.setInterval(() => this.randPres(), 10000);
      this.memberCount();
    })

    this.on('message', (message: Discord.Message) => {
      if(message.channel.id === '676613498968473610') {
        this.serverChannels(message);
      } else {
        msg(this, message);
      }
    });

    this.on('guildMemberAdd', () => this.memberCount());
    this.on('guildMemberRemove', () => this.memberCount());
  }

  memberCount = () => {
    // CS server id
    const M_COUNT = "676629201645862962";

    const guild = this.guilds.get('647960154079232041');
    if(!guild) return console.log("how")
    const channel = guild.channels.get(M_COUNT);

    if(!channel) return console.log("VC Channel not avial");

    channel.edit({
      name: `Member count: ${guild.memberCount}`
    });
  }

  handleTicketMessage = async (message: Discord.Message, type: string) => {
    const guild = this.guilds.get('647960154079232041')
    if(!guild) 
      return console.error(`Couldn't find guild to handle ticket message`)
    
    let channel: Discord.TextChannel | void = guild.channels.find(c => c.name === message.author.id) as Discord.TextChannel
    
    if(!channel && (type !== 'reply')) 
      return console.error(`Couldn't find channel: ${message.author.id} : ${type}`)

    switch(type) {
      case 'dm':
        if(channel)
          channel.send(`[ ${message.author.username} ] - ${message.content}`)
        break;
      case 'reply':
        const ticketer = guild.members.find(m => (message.channel as Discord.TextChannel).name === m.id)
        if(ticketer)
          ticketer.send(`[ ${message.author.username} ] - ${message.content}`)
        break;
      default:
        console.error('What ticket?')
    }
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

  serverChannels = (msg: Discord.Message) => {
    const G_ID = "647960154079232041";
    const MSG_VC = "676639231648464908";
    const COUNT = "676613498968473610";
    const ROLE_ID = "677235204435476480";
    const MOD_ID = "647963820043534356";
    
    const guild = this.guilds.get(G_ID);

    // How many points will said user get? :)
    // Always +1 by default
    let score = GET_SCORE.get(msg.author.id, G_ID);
    if(!score) {
      console.log('score DNE?')
      score = { id: `${msg.author.id}-${G_ID}`, user: msg.author.id, guild: G_ID, points: 0 }
    }

    if (!guild) return console.log("Somehow not in CS guild");

    const m_channel = guild.channels.get(MSG_VC);
    const count_channel = guild.channels.get(COUNT) as Discord.TextChannel;

    if(!m_channel || !count_channel) return console.log("VC Channel not avial");

    const num = parseInt(msg.content.replace(/\s/g, ''), this.baseType);
    if (Number.isNaN(num) || (
      (this.prevCount !== null && this.prevCount !== (num-1)) ||
      (this.prevCounter !== null && this.prevCounter === msg.author)
    )) {
      score.points--;
      // Take points away from losers.
      console.log(`Taking away points... ${score.points}`);
      SET_SCORE.run(score);
      return msg.delete();
    }

    this.prevCount = num;
    this.prevCounter = msg.author;
    
    if(msg.member && 
      guild.roles.get(ROLE_ID) && !guild.roles.get(ROLE_ID)!.members.find(m => msg!.member === m) &&
      !msg.member.roles.find(r => r.id === MOD_ID)
      ) {
      const role = guild.roles.get(ROLE_ID)
      if (role) {
        role.members.forEach(m => m.roles.remove(ROLE_ID));
      }
      // Good player, here's some points.
      msg.member.roles.add(ROLE_ID);
    }
    
    console.log(score);
    score.points++;
    console.log(`Adding points.... ${score.points}`)
    SET_SCORE.run(score);
    m_channel.edit({
      name: `Count number: ${num}`
    });
  }

  async start() {
    await this.login(this.config.TOKEN)
  }
}
