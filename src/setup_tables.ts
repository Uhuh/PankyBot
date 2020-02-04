import * as SQLite from 'better-sqlite3'

const sql = new SQLite('./users.sqlite')

const SETUP = () => {
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name = 'users'").get()
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, user TEXT, guild TEXT, note TEXT)').run()
    // Ensure that the 'id' row is always unique and indexed.
    sql.prepare('CREATE UNIQUE INDEX idx_users_id ON users (id)').run()
    sql.pragma('synchronous = 0')
    sql.pragma('journal_mode = wal')
  }
  const actTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name = 'activity'").get()
  if (!actTable['count(*)']) {
    sql.prepare('CREATE TABLE activity (id TEXT PRIMARY KEY, user TEXT, guild TEXT, date_active INT)').run()
    sql.prepare('CREATE UNIQUE INDEX idx_activity_id ON activity (id)').run()
    sql.pragma('synchronous = 0')
    sql.pragma('journal_mode = wal')
  }
  const guildPrefix = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name = 'guild_prefix'").get()
  if (!guildPrefix['count(*)']) {
    sql.prepare('CREATE TABLE guild_prefix (id TEXT PRIMARY KEY, guild TEXT, prefix TEXT)').run()
    sql.prepare('CREATE UNIQUE INDEX idx_guild_prefix_id ON activity (id)').run()
    sql.pragma('synchronous = 0')
    sql.pragma('journal_mode = wal')
  }
}

SETUP()

const activeSql = [
  "INSERT OR REPLACE INTO activity (id, user, guild, date_active)",
  "VALUES (@id, @user, @guild, @date_active)"
].join(" ")

export const SET_ACTIVITY = sql.prepare(`${activeSql}`)
export const GET_PREFIX = sql.prepare("SELECT prefix FROM guild_prefix WHERE guild = ?")
export const SET_PREFIX = sql.prepare("INSERT OR REPLACE INTO guild_prefix (id, guild, prefix) VALUES (@id, @guild, @prefix)")
export const REMOVE_ACTIVITY = sql.prepare("DELETE FROM activity WHERE user = ? AND guild = ?")
export const USER_ACTIVITY = sql.prepare("SELECT * FROM activity WHERE guild = ?")
export const GET_ACTIVITY = sql.prepare("SELECT * FROM activity WHERE user = ? AND guild = ?")
export const GET_USER = sql.prepare("SELECT * FROM users WHERE user = ? AND guild = ?")
export const SET_USER = sql.prepare("INSERT OR REPLACE INTO users (id, user, guild, note) VALUES (@id, @user, @guild, @note)")