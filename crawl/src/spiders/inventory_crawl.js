import { DatabaseSync } from 'node:sqlite'

// connection to a Sqlite database
const database = new DatabaseSync(`./data/userdata.db`)
database.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
        appid INTEGER,
        classid TEXT,
        instanceid TEXT,
        icon_url TEXT,
        name TEXT,
        name_color TEXT,
        type TEXT,
        market_name TEXT,
        market_hash_name TEXT
    )
`)


function getResp(url) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
    };
    return fetch(url, {
        method: 'GET',
        headers: headers
    })
}

function parseResp(result) {
    return result
        .then(resp => resp.text())
        .then(respText => JSON.parse(respText)['descriptions']);
}

function save2Sqlite(item) {
    const insert = database.prepare(`
        INSERT INTO inventory (
            appid, classid, instanceid, icon_url, name, name_color, type,
            market_name, market_hash_name
        ) VALUES (?,?,?,?,?,?,?,?,?)
    `)
    insert.run(
        item.appid,
        item.classid,
        item.instanceid,
        item.icon_url,
        item.name,
        item.name_color,
        item.type,
        item.market_name,
        item.market_hash_name
    )
}

function main() {
    const url = 'https://my.steamchina.com/inventory/76561199405541900/730/2?l=sc_schinese&count=100&preserve_bbcode=1&raw_asset_properties=1';
    const resp = getResp(url)

    parseResp(resp)
        .then(result => {
            result.forEach(item => {
                save2Sqlite({
                    appid: item.appid,
                    classid: item.classid,
                    instanceid: item.instanceid,
                    icon_url: item.icon_url,
                    name: item.name,
                    name_color: item.name_color,
                    type: item.type,
                    market_name: item.market_name,
                    market_hash_name: item.market_hash_name,
                });
            })
        })
}

export function start() {
    main()
}