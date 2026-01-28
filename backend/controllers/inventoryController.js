import catchSync from "../utils/catchSync.js";
import * as inventoryModel from "./../models/inventoryModel.js";


/**
 * 获取历史库存
 * @route GET /api/v1/inventory/history
 * @param {string} steamId - steam id
 * @returns {Promise} - 包含历史库存的 JSON 响应
 */
export const historyInventory = catchSync((req, res) => {
  const { steamId } = req.query;
  const history = inventoryModel.getInventory.all(steamId);
  res.json(history);
})

/**
 * 通过 SSE 获取实时库存数据
 * @route GET /api/v1/inventory/realTime
 * @param {string} steamId - steam id
 * @param {timestamp} time - 时间戳
 * @returns {Promise} - 包含实时库存数据的 JSON 响应
 */
export const realTimeInventory = catchSync((req, res) => {
  // SSE响应头
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
  
  const { steamId } = req.query;
  const inventories = inventoryModel.getInventory.all(steamId);

  // 定时发送数据
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    res.write(`data: ${JSON.stringify(inventories)}\n\n`);
  }, 5000);

  // 监听客户端断开连接
  res.on("close", () => {
    clearInterval(interval);
    console.log("sse close");
    res.end();
  })
})