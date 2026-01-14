import axios from 'axios'

import * as crawlModel from './../model.js'


const getResp = async function(marketHashNameList) {
  const url = `https://openapi.c5game.com//merchant/market/v2/item/stat/hash/name?app-key=${process.env.C5GAME_APP_KEY}`
  const resp = await axios.post(url, {
    'appId': 730,
    'marketHashNames': marketHashNameList
  })
  return resp.data
}

const getMarketHashNameList = function(inventoryList) {
  return inventoryList.map(item => item['market_hash_name'])
}

const saveInventoryPrice = function(inventoryPriceList) {
  for (const item of inventoryPriceList) {
    try {
      const state = crawlModel.saveInventoryPrice.run(
          item['classid'],
          item['instanceid'],
          item['name'],
          item['market_name'],
          item['market_hash_name'],
          item['sell_price'],
          item['sell_count'],
          item['price_source'],
          item['steam_id'],
          item['account_id'],
          item['crawl_time']
      )
    } catch (err) {
      console.log(err)
    }
  }
}

const main = async function() {
  console.log(`${new Date().toLocaleString()}: inventoryPriceCrawl任务开始执行.`)

  // 获取库存
  const inventoryList = crawlModel.inquireInventory.all();

  const batchSize = 100;
  const inventoryListLength = inventoryList.length;
  const total = Math.ceil(inventoryListLength / batchSize);
  console.log(`${new Date().toLocaleString()}: 总共${inventoryListLength}件饰品, 需请求${total}次`)

  const crawlTime = new Date().toLocaleString();
  let inventoryPriceList = [];
  for (let i = 0; i < total; i++) {
    const start = i * batchSize;
    const end = start + batchSize;
    const batchItems = inventoryList.slice(start, end);
    console.log(`${new Date().toLocaleString()}: 正获取第${i + 1}批饰品价格, 共${batchItems.length}件`)

    const marketHashNameList = getMarketHashNameList(inventoryList);
    const resp = await getResp(marketHashNameList);
    const inventoryPriceData = resp['data'];

    let count = 0;
    for (const inventoryItem of batchItems) {
      const inventoryMarketHashName = inventoryItem['market_hash_name'];

      try {
        inventoryItem['sell_price'] = inventoryPriceData[inventoryMarketHashName]['sellPrice'];
        inventoryItem['sell_count'] = inventoryPriceData[inventoryMarketHashName]['sellCount'];
        count++;
      } catch (e) {
        inventoryItem['sell_price'] = 0;
        inventoryItem['sell_count'] = 0;
      }
      inventoryItem['price_source'] = 'c5Game';
      inventoryItem['crawl_time'] = crawlTime;

      inventoryPriceList.push(inventoryItem);
    }
    console.log(`${new Date().toLocaleString()}: 第${i + 1}批饰品, 共${batchItems.length}件饰品, 已获取${count}件饰品价格`);
  }

  saveInventoryPrice(inventoryPriceList);
  console.log(`${new Date().toLocaleString()}: inventoryPriceCrawl任务执行结束.`)
}

const inventoryPriceCrawlStart = async function() {
  await main()
}

export {inventoryPriceCrawlStart}