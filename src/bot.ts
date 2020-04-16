import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
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
    this.on('ready', () => {
      let baseIndex = 1;
      const bases = [2, 8, 16, 32, 36];
      console.log(`[Started]: ${new Date()}`)
      this.setInterval(() => this.randPres(), 10000);
      this.setInterval(() => {
        const C_ID = "676613498968473610";
        const G_ID = "647960154079232041";
        const base = bases[baseIndex];
        baseIndex === 4 ? (baseIndex=0) : baseIndex++;
        const channel = this.guilds.cache.get(G_ID)?.channels.cache.get(C_ID) as Discord.TextChannel;
        this.baseType = base;
        channel.send(`Start counting in base ${base}!`)
          .then(m => this.setTimeout(() => m.delete(), 600000));
      }, 600000);
      this.memberCount();
    })

    this.on('message', (message: Discord.Message) => {
      if(message.channel.id === '676613498968473610') {
        if (message.author.bot) return;
        this.count(message);
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

    const guild = this.guilds.cache.get('647960154079232041');
    if(!guild) return console.log("how")
    const channel = guild.channels.cache.get(M_COUNT);

    if(!channel) return console.log("VC Channel not avial");

    channel.edit({
      name: `Member count: ${guild.memberCount}`
    });
  }

  handleTicketMessage = async (message: Discord.Message, type: string) => {
    const guild = this.guilds.cache.get('647960154079232041')
    if(!guild) 
      return console.error(`Couldn't find guild to handle ticket message`)
    
    let channel: Discord.TextChannel | void = guild.channels.cache.find(c => c.name === message.author.id) as Discord.TextChannel
    
    if(!channel && (type !== 'reply')) 
      return console.error(`Couldn't find channel: ${message.author.id} : ${type}`)

    switch(type) {
      case 'dm':
        if(channel)
          channel.send(`[ ${message.author.username} ] - ${message.content}`)
        break;
      case 'reply':
        const ticketer = guild.members.cache.find(m => (message.channel as Discord.TextChannel).name === m.id)
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
      `in ${this.guilds.cache.size} guilds`,
      `moderation...`
    ];

    user.setPresence({
      activity: { name: presArr[Math.floor(Math.random() * presArr.length)], type: "CUSTOM_STATUS" },
      status: "online"
    }).catch(console.error);
  }

  count = (msg: Discord.Message) => {
    const G_ID = "647960154079232041";
    const MSG_VC = "676639231648464908";
    const ROLE_ID = "677235204435476480";
    const MOD_ID = "647963820043534356";
    
    const guild = this.guilds.cache.get(G_ID);

    // How many points will said user get? :)
    // Always +1 by default
    let score = GET_SCORE.get(msg.author.id, G_ID);
    console.log(score);
    if(!score) {
      console.log('score DNE?')
      score = { id: `${msg.author.id}-${G_ID}`, user: msg.author.id, guild: G_ID, points: 0 }
    }

    if (!guild) return console.log("Somehow not in CS guild");

    const m_channel = guild.channels.cache.get(MSG_VC);
    if(!m_channel) return;

    const num = parseInt(msg.content.replace(/\s/g, ''), this.baseType);
    console.log(`Num: ${num}`);

    if (Number.isNaN(num) || (
      (this.prevCount !== null && this.prevCount !== (num-1)) ||
      (this.prevCounter !== null && this.prevCounter === msg.author)
    )) {
      score.points--;
      // Take points away from losers.
      SET_SCORE.run(score);
      return msg.delete();
    }

    this.prevCount = num;
    this.prevCounter = msg.author;
    
    if(msg.member && 
      guild.roles.cache.get(ROLE_ID) && !guild.roles.cache.get(ROLE_ID)!.members.find(m => msg!.member === m) &&
      !msg.member.roles.cache.find(r => r.id === MOD_ID)
      ) {
      const role = guild.roles.cache.get(ROLE_ID)
      if (role) {
        role.members.forEach(m => m.roles.remove(ROLE_ID));
      }
      // Good player, here's some points.
      msg.member.roles.add(ROLE_ID);
    }
    
    score.points++;
    SET_SCORE.run(score);
    m_channel.edit({
      name: `Count number: ${num}`
    });
  }

  async start() {
    await this.login(this.config.TOKEN)
  }
}
