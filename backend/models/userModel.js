import database from '../database.js'


export const getBindAccount = database.prepare(`SELECT * FROM users`);

export const checkAccountExists = database.prepare(`
    SELECT COUNT(*) as count FROM users WHERE steam_id = ?
`);

export const bindSteamAccount = database.prepare(`
    INSERT INTO users(steam_id, account_id, persona_name, avatar_url)
    VALUES (?, ?, ?, ?)
`)