import * as SQLite from "sqlite3"

const db = new SQLite.Database('db');

/* Idk what I want to do with this bot and storing info yet */
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    num_msg INTEGER DEFAULT 0, 
    date_active INTEGER,
    guild_id TEXT,
    note TEXT
  )`);
});