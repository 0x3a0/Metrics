import axios from 'axios';

import * as crawlModel from './../model.js';


const getResp = async function(steamId) {
  const url = `https://my.steamchina.com/inventory/${steamId}/730/2?l=sc_schinese&count=100&preserve_bbcode=1&raw_asset_properties=1`;
  const response = await axios.get(url);
  return response.data
}

const saveInventory = function(inventoryList, steamId, accountId, crawlTime) {
  let count = 0;
  for (const inventory of inventoryList) {
    try {
      const state = crawlModel.saveInventory.run(
          inventory['appid'],
          inventory['classid'],
          inventory['instanceid'],
          inventory['background_color'],
          inventory['icon_url'],
          JSON.stringify(inventory['descriptions']),
          inventory['name'],
          inventory['name_color'],
          inventory['type'],
          inventory['market_name'],
          inventory['market_hash_name'],
          JSON.stringify(inventory['tags']),
          steamId,
          accountId,
          crawlTime
      );
      count++;
    } catch (err) {
      console.error(err);
      console.log(inventory)
    }
  }

  console.log(`${new Date().toLocaleString()}: 库存入库共${count}件`);
}

const main = async function() {
  console.log(`${new Date().toLocaleString()}: inventoryCrawl任务开始执行.`)

  // 查询绑定的steam账号
  const accountList = crawlModel.inquireSteamAccount.all()
  for (const account of accountList) {
    const steamId = account['steam_id'];
    const accountId = account['account_id'];
    const crawlTime = new Date().toLocaleString();

    const resp = await getResp(steamId);
    const inventoryList = resp['descriptions'];
    console.log(`${new Date().toLocaleString()}: 获取库存共${inventoryList.length}件.`)

    saveInventory(inventoryList, steamId, accountId, crawlTime);
    console.log(`${new Date().toLocaleString()}: InventoryCrawl任务执行结束.`)
  }
}

const inventoryCrawlStart = async function() {
  await main()
}

export {inventoryCrawlStart};