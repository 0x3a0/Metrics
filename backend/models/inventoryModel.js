import database from './../database.js'


export const getInventory = database.prepare(`
    SELECT market_name, sell_price
    FROM inventory_item_price
    WHERE crawl_time = (SELECT(MAX(crawl_time)) FROM inventory_item_price)
      AND steam_id = ?
    LIMIT ? OFFSET ?
`)