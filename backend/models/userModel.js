import database from '../database.js'


const getBindSteamAccount = database.prepare(`SELECT * FROM users`);

const bindSteamAccount = database.prepare(`
    INSERT INTO users(steam_id, account_id, persona_name, avatar_url)
    VALUES (?, ?, ?, ?)
`)

export {
  getBindSteamAccount,
  bindSteamAccount,
};