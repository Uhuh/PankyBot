import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as SQLite from 'better-sqlite3'
import * as config from './vars'
import msg from '../events/message'
import activity from '../events/activity';

const sql = new SQLite('./users.sqlite')

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

      const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get()
      if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, user TEXT, guild TEXT, note TEXT);').run()
        // Ensure that the 'id' row is always unique and indexed.
        sql.prepare('CREATE UNIQUE INDEX idx_users_id ON users (id);').run()
        sql.pragma('synchronous = 1')
        sql.pragma('journal_mode = wal')
      }
      const actTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'activity';").get()
      if (!actTable['count(*)']) {
        sql.prepare('CREATE TABLE activity (id TEXT PRIMARY KEY, user TEXT, guild TEXT, date_active TEXT);').run()
        sql.prepare('CREATE UNIQUE INDEX idx_activity_id ON activity (id);').run()
        sql.pragma('synchronous = 1')
        sql.pragma('journal_mode = wal')
      }

      this.getActivity = sql.prepare("SELECT * FROM activity WHERE guild = ?")
      this.setActivity = sql.prepare("INSERT OR REPLACE INTO activity (id, user, guild, date_active) VALUES (@id, @user, @guild, @date_active);")
      this.getUser = sql.prepare("SELECT * FROM users WHERE user = ? AND guild = ?")
      this.setUser = sql.prepare("INSERT OR REPLACE INTO users (id, user, guild, note) VALUES (@id, @user, @guild, @note);")
    })

    this.on('voiceStateUpdate', (member: Discord.GuildMember) => activity(this, member))
    this.on('message', (message: Discord.Message) => msg(this, message))
  }

  async start() {
    this.login(this.config.TOKEN)
  }
}
