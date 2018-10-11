import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();
import * as DBL from 'dblapi.js';
import activity from '../events/activity';
import log from '../events/log';
import msg from '../events/message';
import setup_tables from './setup_tables';
import * as config from './vars';

export default class PankyBot extends Discord.Client {
  config: any;
  getUser: any;
  setUser: any;
  getActivity: any;
  setActivity: any;
  removeActivity: any;
  usersActivity: any;
  getPrefix: any;
  setPrefix: any;
  dbl: any;
  constructor() {
    super();

    this.config = config;
    // Discord bot list, gotta up them server numbers for certified )
    this.dbl = new DBL(this.config.DBLTOKEN, this);
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`);
      this.user.setPresence({ game: { name: `@${this.user.username} help` }, status: 'online' });
      this.setInterval( () => this.dbl.postStats(this.guilds.size), 1800000);
      // Setup our sql tables.
      setup_tables(this);
    });

    this.on('voiceStateUpdate', (member: Discord.GuildMember) => log(this, member));
    this.on('message', (message: Discord.Message) => msg(this, message));
  }

  async start() {
    await this.login(this.config.TOKEN);
    // ON startup get who's online (Last message only works while bot is on over time)
    activity(this);
    // Log activity every 2.5minutes.
    setInterval(() => activity(this), 150000);
  }
}
