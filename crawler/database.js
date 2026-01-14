import sqlite from 'node:sqlite';


const database = new sqlite.DatabaseSync('../data/userVal.db');
console.log('[crawler] Successfully connected database');

// 初始化表
const createInventoryTable = database.prepare(`
    CREATE TABLE IF NOT EXISTS inventory
    (
        appid            INTEGER,
        classid          TEXT NOT NULL,
        instanceid       TEXT NOT NULL,
        background_color TEXT,
        icon_url         TEXT,
        descriptions     TEXT,
        name             TEXT,
        name_color       TEXT,
        type             TEXT,
        market_name      TEXT,
        market_hash_name TEXT,
        tag              TEXT,
        steam_id         TEXT,
        account_id       TEXT,
        crawl_time       TEXT
    )
`)

const createInventoryItemPriceTable = database.prepare(`
    CREATE TABLE IF NOT EXISTS inventory_item_price
    (
        classid          TEXT,
        instanceid       TEXT,
        name             TEXT,
        market_name      TEXT,
        market_hash_name TEXT,
        sell_price       TEXT,
        sell_count       INTEGER,
        price_source     TEXT,
        steam_id         TEXT,
        account_id       TEXT,
        crawl_time       TEXT
    )
`)
try {
  const createInventoryTableState = createInventoryTable.run();
  const createInventoryItemPriceTableState = createInventoryItemPriceTable.run();
} catch (err) {
  console.log(err);
}

export default database;