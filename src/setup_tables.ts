import * as SQLite from "better-sqlite3"

const sql = new SQLite('./scores.sqlite');

export function setup() {
  const table = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scores';`).get();
  if(!table['count(*)']) {
    sql.prepare(`CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);`).run();
    sql.prepare(`CREATE UNIQUE INDEX idx_scores_id ON scores (id);`).run();
    sql.pragma("synchronous = 1");
    sql.pragma('journal_mode = wal');
  }
  const timeTable = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='timely_money';`).get();
  if(!timeTable['count(*)']) {
    sql.prepare(`CREATE TABLE timely_money (id TEXT PRIMARY KEY, user TEXT, guild TEXT, daily TEXT, weekly TEXT);`).run();
    sql.prepare(`CREATE UNIQUE INDEX idx_timely_id ON timely_money (id);`).run();
    sql.pragma("synchronous = 1");
    sql.pragma('journal_mode = wal');
  }
}

setup();

export const GUILD_SCORE = sql.prepare(`SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 5;`);
export const GET_SCORE = sql.prepare(`SELECT * FROM scores WHERE user = ? AND guild = ?`);
export const SET_SCORE = sql.prepare(`INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points)`);

export const GET_DAILY = sql.prepare(`SELECT * FROM timely_money WHERE user = ? AND guild = ?`);
export const GET_WEEKLY = sql.prepare(`SELECT * FROM timely_money WHERE user = ? AND guild = ?`);
export const SET_DAILY = sql.prepare(`INSERT OR REPLACE INTO timely_money (id, user, guild, daily, weekly) VALUES (@id, @user, @guild, @daily, @weekly)`);
export const SET_WEEKLY = sql.prepare(`INSERT OR REPLACE INTO timely_money (id, user, guild, daily, weekly) VALUES (@id, @user, @guild, @daily, @weekly)`);


