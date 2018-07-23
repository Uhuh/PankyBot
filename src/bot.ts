import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as SQLite from 'better-sqlite3'
import * as config from './vars'
import msg from '../events/message'

const sql = new SQLite('./users.sqlite')

export default class PankyBot extends Discord.Client {
  config: any
  getUser: any
  setUser: any
  constructor() {
    super()
    
    this.config = config
    
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)

      const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get();
      if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, user TEXT, guild TEXT, note TEXT);').run();
        // Ensure that the 'id' row is always unique and indexed.
        sql.prepare('CREATE UNIQUE INDEX idx_scores_id ON users (id);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
      }
      this.getUser = sql.prepare("SELECT * FROM users WHERE user = ? AND guild = ?");
      this.setUser = sql.prepare("INSERT OR REPLACE INTO users (id, user, guild, note) VALUES (@id, @user, @guild, @note);");
    })

    this.on('message', (message: Discord.Message) => msg(this, message))
  }

  async start() {
    this.login(this.config.TOKEN)
  }
}
