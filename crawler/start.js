import dotenv from 'dotenv';
import { CronJob } from 'cron'

import database from './database.js'
import * as crawlModel from './model.js'
import  {inventoryCrawlStart} from "./crawls/inventory.js";
import {inventoryPriceCrawlStart} from "./crawls/inventoryPrice.js";


dotenv.config({ path: './.env' });

let crawlInventoryJob;
let crawlInventoryPriceJob;
const checkAccountJob = new CronJob(
    '*/5 * * * * *',
    async () => {
      const accountList = crawlModel.inquireSteamAccount.all();
      if (accountList.length > 0) {
        await checkAccountJob.stop()
        console.log('检测到绑定账号, checkAccountJob任务将暂停.')

        // 立即执行一次爬虫
        await inventoryCrawlStart()
        await inventoryPriceCrawlStart()

        crawlInventoryJob = new CronJob(
            '0 */30 * * * *',    // 每隔十分钟更新一次库存
            inventoryCrawlStart
        );

        crawlInventoryPriceJob = new CronJob(
            '0 */5 * * * *',    // 五分钟获取一次库存价格
            inventoryPriceCrawlStart
        )

        crawlInventoryJob.start();
        console.log('crawlInventoryJob定时任务启动.')

        crawlInventoryPriceJob.start();
        console.log('crawlInventoryPriceJob定时任务启动.')
      } else {
        console.log(`${new Date().toLocaleString()}: 未检测到绑定账号.`);
      }
    }
);

checkAccountJob.start()
console.log('checkAccountJob任务启动')

process.on('SIGINT', async () => {
  database.close()

  if (checkAccountJob) {
    await checkAccountJob.stop()
    console.log('checkAccountJob stopped.')
  }

  if (crawlInventoryJob) {
    await crawlInventoryJob.stop()
    console.log('crawlJob stopped.')
  }

  if (crawlInventoryPriceJob) {
    await crawlInventoryPriceJob.stop()
    console.log('crawlPriceJob stopped.')
  }

  console.log('SIGINT');
})