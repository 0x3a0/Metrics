import Database from 'better-sqlite3';


const database = new Database('../data/userVal.db');
database.exec(`
    CREATE TABLE IF NOT EXISTS users
    (
        steam_id     TEXT UNIQUE,
        account_id   TEXT,
        persona_name TEXT,
        avatar_url   TEXT
    )
`);
console.log('[backend] Successfully connection database');

export default database;