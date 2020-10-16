import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import msg from '../events/message'
import * as config from './vars'
import commandHandler from '../commands/commandHandler'
import { SET_SCORE, GET_SCORE, SET_CHANNEL_COUNT, GET_OPT } from './setup_tables'
import moment = require('moment')

interface Command {
  desc: string,
  name: string,
  args: string,
  type: string,
  run: Function
}

export default class PankyBot extends Discord.Client {
  config: any;
  prevCount: number | null;
  prevCounter: Discord.User | null;
  baseType: number;
  NUM_MSG: number;
  shopItems: Map<string, any>;
  commands: Discord.Collection<string, Command>;
  userMsgCount: Discord.Collection<string, number>;
  constructor() {
    super()

    this.config = config;
    this.commands = new Discord.Collection();
    this.userMsgCount = new Discord.Collection();
    this.baseType = 2;
    this.NUM_MSG = 5;
    this.prevCount = null;
    this.prevCounter = null;
    /**
     * My CS server is in shambles with this economy now lol
     * CNA = Can not afford
     */
    this.shopItems = new Map([
      ['1', {
        name: `Pizza`, price: 15000, CNA: `you can't afford that...`,
        bought: `bought a pizza.`, desc: `Get any 1 topping pizza from dominos lol. (Pickup)`
      }],
      ['2', {
        name: `Discord Nitro`, price: 15000, CNA: `you can't afford a gift.`,
        bought: `bought a nitro.`, desc: `Nitro gift lol`
      }],
      ['3', {
        name: `Steam Gift`, price: 15000, CNA: `you can't get steam gift.`,
        bought: `bought steam gift.`, desc: `Steam gift $10 or under.`
      }],
      ['4', {
        name: `Add emoji`, price: 500, CNA: `you can't afford an emoji.`,
        bought: `bought an emoji slot.`, desc: `Add an emoji to the server.`
      }],
      ['5', {
        name: `Solid picture`, price: 200, CNA: `you can't afford an image :(`,
        bought: `bought a SOLID PHOTO :O`, desc: `I take a picture of Solid and send it.`
      }],
      ['6', {
        name: `Barrel oil`, price: 100, CNA: `dude, it's cheap cmon, work harder.`,
        bought: `bought oil lol.`, desc: `Literally a barrel of oil, have fun?`
      }],
      ['7', {
        name: `Perm ban any user`, price: 666666, CNA: `try harder`,
        bought: `banned someone lmao`, desc: `Ban any user you want lol`
      }]
    ]);

    commandHandler(this);

    // Discord bot list, gotta up them server numbers for certified )
    this.once('ready', () => {
      console.log(`[Started]: ${new Date()}`);
      this.setInterval(() => this.randPres(), 10000);
      if (config.BETA === '0') {
        this.memberCount();
      }
    });

    this.on('message', (message: Discord.Message) => {
      try {
        if (message.author.bot) return;
        if (message.guild && GET_OPT(message.author.id)) {
          console.log(`Logging message count for ${message.author.username}`);
          SET_CHANNEL_COUNT(message.author.id, message.channel.id, moment().format('YYYY-MM-DD'));
        }
        if (message.channel.id === '676613498968473610') {
          this.count(message);
        } else {
          this.messagePoints(message);
          msg(this, message);
        }
      } catch (e) {
        // CS server bot spam.
        const channel = this.channels.cache.get('676617287473692679') as Discord.TextChannel;
        if (channel) {
          const embed = new Discord.MessageEmbed();

          embed.setTitle(`**Error parsing message**`)
            .setDescription(`${e}`)
            .setColor(16711684)
            .setFooter(`Message sent by: ${message.author.tag}`)
            .setTimestamp(new Date());

          channel.send({ embed });
        }
      }

    });
    this.on('messageDelete', (msg: Discord.Message) => {
      if (parseInt(msg.content.replace(/\s/g, ''), this.baseType) === this.prevCount) {
        msg.channel.send(msg.content);
      }
    });
    this.on('guildMemberAdd', (member: Discord.GuildMember) => {
      this.memberCount();
      // Nuke bots.
      if (member.user.bot) {
        const role = member.guild.roles.cache.find(r => r.id === '647975315267780608');
        const channel = this.channels.cache.get('672912829032169474') as Discord.TextChannel;
        if (role) {
          member.roles.add(role);
        }
        if (channel) {
          const embed = new Discord.MessageEmbed()
            .setColor(3066993)
            .setAuthor(`Bot added.`, member.user.avatarURL() || '')
            .addField(`Bot name`, `<@${member.user.id}> (${member.user.tag})`);
          channel.send({ embed });
        }
      }
    });
    this.on('guildMemberRemove', () => this.memberCount());
  }

  memberCount = () => {
    // CS server id
    const M_COUNT = "676629201645862962";

    const guild = this.guilds.cache.get('647960154079232041');
    if (!guild) return console.log("how")
    const channel = guild.channels.cache.get(M_COUNT);

    if (!channel) return console.log("VC Channel not avial");

    channel.edit({
      name: `Member count: ${guild.memberCount}`
    });
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

  messagePoints = (message: Discord.Message) => {
    // Ignore this damn bot-testing channel. The kiddos be farming points
    if (message.channel.id === '672912829032169474') return;
    if (message.guild) {
      // Let's see how many times they've spoken.
      let num = this.userMsgCount.get(message.author.id);
      // Increment num if it exist. Else create.
      if (num) {
        num++;
        this.userMsgCount.set(message.author.id, num);
      } else {
        this.userMsgCount.set(message.author.id, 1);
        num = 1;
      }

      // Every five messages add 5 points?
      if (num % this.NUM_MSG === 0) {
        let score = this.getUserScore(message.author.id, message.guild.id);
        score.points += this.NUM_MSG;
        SET_SCORE(score, 'points');
      }
    }
  }

  getUserScore = (userId: string, guildID: string, type = 'points') => {
    let score = GET_SCORE(userId, guildID, type);

    if (!score) {
      console.log('score DNE?')
      score = { id: `${userId}-${guildID}`, user: userId, guild: guildID, points: 0 }
    }

    return score;
  }

  count = (msg: Discord.Message) => {
    const G_ID = "647960154079232041";
    const MSG_VC = "676639231648464908";
    const ROLE_ID = "677235204435476480";
    const MOD_ID = "647963820043534356";

    const guild = this.guilds.cache.get(G_ID);

    // How many points will said user get? :)
    // Always +1 by default
    let score = this.getUserScore(msg.author.id, G_ID, 'scores');
    console.log(score);

    if (!guild) return console.log("Somehow not in CS guild");

    const m_channel = guild.channels.cache.get(MSG_VC);
    if (!m_channel) return;

    const num = parseInt(msg.content.replace(/\s/g, ''), this.baseType);
    console.log(`Num: ${num}`);

    if (Number.isNaN(num) || (
      (this.prevCount !== null && this.prevCount !== (num - 1)) ||
      (this.prevCounter !== null && this.prevCounter === msg.author)
    )) {
      score.points--;
      // Take points away from losers.
      SET_SCORE(score, 'scores');
      return msg.delete();
    }

    this.prevCount = num;
    this.prevCounter = msg.author;

    if (
      this.config.BETA === '0' &&
      msg.member &&
      guild.roles.cache.get(ROLE_ID) &&
      !guild.roles.cache.get(ROLE_ID)!.members.find(m => msg!.member === m) &&
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
    SET_SCORE(score, 'scores');
    if (this.config.BETA === '0') {
      m_channel.edit({
        name: `Count number: ${num}`
      });
    }
  }

  async start() {
    await this.login(this.config.TOKEN);
  }
}
