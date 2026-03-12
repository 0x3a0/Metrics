import database from '../database.js'


export const getBindAccount = database.prepare(`SELECT * FROM users`);

const bindSteamAccount = database.prepare(`
    INSERT INTO users(steam_id, account_id, persona_name, avatar_url)
    VALUES (?, ?, ?, ?)
`)