import database from './database.js'


const inquireSteamAccount = database.prepare(`SELECT steam_id, account_id
                                              FROM users`);

const saveInventory = database.prepare(`
    INSERT INTO inventory (appid, classid, instanceid, background_color, icon_url, descriptions, name, name_color, type,
                           market_name, market_hash_name, tag, steam_id, account_id, crawl_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const inquireInventory = database.prepare(`
    SELECT classid,
           instanceid,
           name,
           market_name,
           market_hash_name,
           steam_id,
           account_id
    FROM inventory
    WHERE crawl_time = (SELECT(MAX(crawl_time)) FROM inventory)
`)

const saveInventoryPrice = database.prepare(`
    INSERT INTO inventory_item_price (classid, instanceid, name, market_name, market_hash_name, sell_price, sell_count,
                                      price_source, steam_id, account_id, crawl_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

export {
  inquireSteamAccount,
  saveInventory,
  inquireInventory,
  saveInventoryPrice,
};