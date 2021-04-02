import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();
import msg from '../events/message';
import * as config from './vars';
import commandHandler from '../commands/commandHandler';
import {
  SET_SCORE,
  GET_SCORE,
  SET_CHANNEL_COUNT,
  GET_OPT,
} from './setup_tables';
import moment = require('moment');

interface Command {
  desc: string;
  name: string;
  args: string;
  type: string;
  run: Function;
}

export default class PankyBot extends Discord.Client {
  config: any;
  prevCount: number | null;
  prevCounter: Discord.User | null;
  baseType: number;
  NUM_MSG: number;
  commands: Discord.Collection<string, Command>;
  userMsgCount: Discord.Collection<string, number>;
  G_ID = '647960154079232041';
  MSG_VC = '676639231648464908';
  ROLE_ID = '677235204435476480';
  MOD_ID = '647963820043534356';
  cs_guild: Discord.Guild;
  m_channel: Discord.TextChannel;
  constructor() {
    super({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });

    this.config = config;
    this.commands = new Discord.Collection();
    this.userMsgCount = new Discord.Collection();
    this.baseType = 2;
    this.NUM_MSG = 5;
    this.prevCount = null;
    this.prevCounter = null;
    //@ts-ignore
    this.cs_guild = this.guilds.cache.get(this.G_ID);
    this.m_channel = this.cs_guild?.channels.cache.get(
      this.MSG_VC
    ) as Discord.TextChannel;

    commandHandler(this);

    // Discord bot list, gotta up them server numbers for certified )
    this.once('ready', () => {
      console.log(`[Started]: ${new Date()}`);
      //@ts-ignore
      this.cs_guild = this.guilds.cache.get(this.G_ID);
      this.m_channel = this.cs_guild?.channels.cache.get(
        this.MSG_VC
      ) as Discord.TextChannel;
      if (config.BETA === '0') {
        this.memberCount();
      }
    });

    this.on('message', (message: Discord.Message) => {
      try {
        if (message.author.bot) return;
        if (message.guild && GET_OPT(message.author.id)) {
          console.log(`Logging message count for ${message.author.username}`);
          SET_CHANNEL_COUNT(
            message.author.id,
            message.channel.id,
            moment().format('YYYY-MM-DD')
          );
        }
        if (message.channel.id === '676613498968473610') {
          this.count(message);
        } else {
          msg(this, message);
        }
      } catch (e) {
        // CS server bot spam.
        const channel = this.channels.cache.get(
          '676617287473692679'
        ) as Discord.TextChannel;
        if (channel) {
          const embed = new Discord.MessageEmbed();

          embed
            .setTitle(`**Error parsing message**`)
            .setDescription(`${e}`)
            .setColor(16711684)
            .setFooter(`Message sent by: ${message.author.tag}`)
            .setTimestamp(new Date());

          channel.send({ embed });
        }
      }
    });
    this.on('messageDelete', (msg: Discord.Message) => {
      if (
        parseInt(msg.content.replace(/\s/g, ''), this.baseType) ===
        this.prevCount
      ) {
        msg.channel.send(msg.content);
      }
    });
    this.on('guildMemberAdd', (member: Discord.GuildMember) => {
      this.memberCount();
      // Nuke bots.
      if (member.user.bot) {
        const role = member.guild.roles.cache.find(
          (r) => r.id === '647975315267780608'
        );
        const channel = this.channels.cache.get(
          '672912829032169474'
        ) as Discord.TextChannel;
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
    const M_COUNT = '676629201645862962';

    const guild = this.guilds.cache.get('647960154079232041');
    if (!guild) return console.log('how');
    const channel = guild.channels.cache.get(M_COUNT);

    if (!channel) return console.log('VC Channel not avial');

    channel.edit({
      name: `Member count: ${guild.memberCount}`,
    });
  };

  getUserScore = (userId: string, guildID: string, type = 'points') => {
    let score = GET_SCORE(userId, guildID, type);

    if (!score) {
      console.log('score DNE?');
      score = {
        id: `${userId}-${guildID}`,
        user: userId,
        guild: guildID,
        points: 0,
      };
    }

    return score;
  };

  count = (msg: Discord.Message) => {
    // How many points will said user get? :)
    // Always +1 by default
    let score = this.getUserScore(msg.author.id, this.G_ID, 'scores');

    if (!this.cs_guild) return console.log('Somehow not in CS guild');

    if (!this.m_channel) return;

    const num = parseInt(msg.content.replace(/\s/g, ''), this.baseType);

    if (
      Number.isNaN(num) ||
      (this.prevCount !== null && this.prevCount !== num - 1) ||
      (this.prevCounter !== null && this.prevCounter === msg.author)
    ) {
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
      this.cs_guild.roles.cache.get(this.ROLE_ID) &&
      !this.cs_guild.roles.cache
        .get(this.ROLE_ID)!
        .members.find((m) => msg!.member === m) &&
      !msg.member.roles.cache.find((r) => r.id === this.MOD_ID)
    ) {
      const role = this.cs_guild.roles.cache.get(this.ROLE_ID);
      if (role) {
        role.members.forEach((m) => m.roles.remove(this.ROLE_ID));
      }
      // Good player, here's some points.
      msg.member.roles.add(this.ROLE_ID);
    }

    score.points++;
    SET_SCORE(score, 'scores');
    console.log(this.m_channel.name);
    if (this.config.BETA === '0') {
      this.m_channel.edit({
        name: `Count number: ${num}`,
      });
    }
  };

  async start() {
    await this.login(this.config.TOKEN);
  }
}
