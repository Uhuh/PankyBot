import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
dotenv.config()
import * as SQLite from 'better-sqlite3'
import * as config from './vars'
import msg from '../events/message'

const sql = new SQLite('./scores.sqlite')

export default class PankyBot extends Discord.Client {
  config: any
  getScore: any
  setScore: any
  constructor() {
    super()
    
    this.config = config
    
    this.on('ready', () => {
      console.log(`[Started]: ${new Date()}`)

      // Stealing AnIdiotsGuide's SQlite db
      const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
      if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare('CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);').run();
        // Ensure that the 'id' row is always unique and indexed.
        sql.prepare('CREATE UNIQUE INDEX idx_scores_id ON scores (id);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
      }

      this.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
      this.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
    })
    this.on('message', (message: Discord.Message) => msg(this, message))
  }

  async start() {
    this.login(this.config.TOKEN)
  }
}
