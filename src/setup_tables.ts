import * as SQLite from "better-sqlite3"

const sql = new SQLite('./scores.sqlite');

export function setup() {
  /**
   * Some people wanted a separate thing for counting rather than overall points which included counting.
   */
  const countTable = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scores';`).get();
  if(!countTable['count(*)']) {
    sql.prepare(`CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);`).run();
    sql.prepare(`CREATE UNIQUE INDEX idx_scores_id ON scores (id);`).run();
    sql.pragma("synchronous = 1");
    sql.pragma('journal_mode = wal');
  }
  const pointTable = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='points';`).get();
  if(!pointTable['count(*)']) {
    sql.prepare(`CREATE TABLE points (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);`).run();
    sql.prepare(`CREATE UNIQUE INDEX idx_points_id ON scores (id);`).run();
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

// Modulate baby
export const GUILD_SCORE = (guild: string, type = 'scores') => sql.prepare(
  `SELECT * FROM ${type} WHERE guild = @guild ORDER BY points DESC LIMIT 5;`
).all({ guild });
export const GET_SCORE = (user: string, guild: string, type = 'scores'): {
  id: string, user: string, guild: string, points: number
} => sql.prepare(
  `SELECT * FROM ${type} WHERE user = @user AND guild = @guild`
).get({ user, guild });
export const SET_SCORE = (score: {id: string, user: string, guild: string, points: number}, type = 'scores') =>
  sql.prepare(`INSERT OR REPLACE INTO ${type} (id, user, guild, points) VALUES (@id, @user, @guild, @points)`)
    .run({ ...score });

// Keep track of when users can claim points
export const GET_DAILY = sql.prepare(`SELECT * FROM timely_money WHERE user = ? AND guild = ?`);
export const GET_WEEKLY = sql.prepare(`SELECT * FROM timely_money WHERE user = ? AND guild = ?`);
export const SET_DAILY = sql.prepare(`INSERT OR REPLACE INTO timely_money (id, user, guild, daily, weekly) VALUES (@id, @user, @guild, @daily, @weekly)`);
export const SET_WEEKLY = sql.prepare(`INSERT OR REPLACE INTO timely_money (id, user, guild, daily, weekly) VALUES (@id, @user, @guild, @daily, @weekly)`);