import PankyBot from "./bot";
import * as SQLite from 'better-sqlite3'

const sql = new SQLite('./users.sqlite')


export default function setup_tables(client: PankyBot) {
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
    sql.prepare('CREATE TABLE activity (id TEXT PRIMARY KEY, user TEXT, guild TEXT, date_active INT);').run()
    sql.prepare('CREATE UNIQUE INDEX idx_activity_id ON activity (id);').run()
    sql.pragma('synchronous = 1')
    sql.pragma('journal_mode = wal')
  }

  client.getActivity = sql.prepare("SELECT * FROM activity WHERE user = ? AND guild = ?")
  client.setActivity = sql.prepare("INSERT OR REPLACE INTO activity (id, user, guild, date_active) VALUES (@id, @user, @guild, @date_active);")
  client.getUser = sql.prepare("SELECT * FROM users WHERE user = ? AND guild = ?")
  client.setUser = sql.prepare("INSERT OR REPLACE INTO users (id, user, guild, note) VALUES (@id, @user, @guild, @note);")
}