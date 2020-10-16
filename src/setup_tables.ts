import * as SQLite from "better-sqlite3"

const sql = new SQLite('./scores.sqlite');

export function setup() {
  /**
   * Some people wanted a separate thing for counting rather than overall points which included counting.
   */
  const countTable = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scores';`).get();
  if (!countTable['count(*)']) {
    sql.prepare(`CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);`).run();
    sql.prepare(`CREATE UNIQUE INDEX idx_scores_id ON scores (id);`).run();
    sql.pragma("synchronous = 1");
    sql.pragma('journal_mode = wal');
  }
  const pointTable = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='points';`).get();
  if (!pointTable['count(*)']) {
    sql.prepare(`CREATE TABLE points (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);`).run();
    sql.prepare(`CREATE UNIQUE INDEX idx_points_id ON scores (id);`).run();
    sql.pragma("synchronous = 1");
    sql.pragma('journal_mode = wal');
  }
  const timeTable = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='timely_money';`).get();
  if (!timeTable['count(*)']) {
    sql.prepare(`CREATE TABLE timely_money (id TEXT PRIMARY KEY, user TEXT, guild TEXT, daily TEXT, weekly TEXT);`).run();
  }
  const userReport = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='user_report';`).get();
  if (!userReport['count(*)']) {
    sql.prepare(`CREATE TABLE user_report (id TEXT PRIMARY KEY, user_id TEXT, opt_in INTEGER);`).run();
  }
  const channelReport = sql.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='channel_report';`).get();
  if (!channelReport['count(*)']) {
    sql.prepare(`CREATE TABLE channel_report (user_id TEXT, channel_id TEXT, count TEXT, date TEXT, PRIMARY KEY (user_id, channel_id, date));`).run();
  }
}

setup();

export const OPT_OUT = (user_id: string) => {
  sql.prepare(`DELETE FROM user_report WHERE user_id=@user_id`)
    .run({ user_id });
  sql.prepare(`DELETE FROM channel_report WHERE user_id=@user_id`)
    .run({ user_id });
}
export const SET_OPT = (user_id: string, opt_in: number) => sql.prepare(
  `INSERT OR REPLACE INTO user_report (user_id, opt_in) VALUES (@user_id, @opt_in)`
).run({ user_id, opt_in });
export const GET_OPT = (user_id: string) => sql.prepare(
  `SELECT opt_in FROM user_report WHERE user_id = @user_id;`
).get({ user_id });

export const SET_CHANNEL_COUNT = (user_id: string, channel_id: string, date: string) => {
  const data = sql.prepare(
    ` 
    INSERT OR IGNORE INTO channel_report (user_id, channel_id, count, date) VALUES (@user_id, @channel_id, 1, @date)
    `
  ).run({ user_id, channel_id, date });

  // Changes being equal to 0 means the user is already in the DB with the prim key pair of (user_id, channel_id)
  if (!data.changes) {
    sql.prepare(`UPDATE channel_report SET count = count + 1 WHERE user_id=@user_id AND channel_id=@channel_id AND date=@date`)
      .run({ user_id, channel_id, date });
  }
}

export const GET_COUNT_RANGE = (user_id: string, weekStart: string, today: string) => sql.prepare(
  `SELECT * FROM channel_report WHERE user_id = @user_id AND date BETWEEN @weekStart AND @today ORDER BY date DESC`
).all({ user_id, weekStart, today });


// Modulate baby
export const GUILD_SCORE = (guild: string, type = 'scores') => sql.prepare(
  `SELECT * FROM ${type} WHERE guild = @guild ORDER BY points DESC LIMIT 5;`
).all({ guild });
export const GET_SCORE = (user: string, guild: string, type = 'scores'): {
  id: string, user: string, guild: string, points: number
} => sql.prepare(
  `SELECT * FROM ${type} WHERE user = @user AND guild = @guild`
).get({ user, guild });
export const SET_SCORE = (score: { id: string, user: string, guild: string, points: number }, type: 'scores' | 'points') =>
  sql.prepare(`INSERT OR REPLACE INTO ${type} (id, user, guild, points) VALUES (@id, @user, @guild, @points)`)
    .run({ ...score });

// Keep track of when users can claim points
export const GET_DAILY = sql.prepare(`SELECT * FROM timely_money WHERE user = ? AND guild = ?`);
export const GET_WEEKLY = sql.prepare(`SELECT * FROM timely_money WHERE user = ? AND guild = ?`);
export const SET_DAILY = sql.prepare(`INSERT OR REPLACE INTO timely_money (id, user, guild, daily, weekly) VALUES (@id, @user, @guild, @daily, @weekly)`);
export const SET_WEEKLY = sql.prepare(`INSERT OR REPLACE INTO timely_money (id, user, guild, daily, weekly) VALUES (@id, @user, @guild, @daily, @weekly)`);