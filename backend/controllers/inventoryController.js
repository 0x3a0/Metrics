import catchSync from "../utils/catchSync.js";
import * as inventoryModel from "./../models/inventoryModel.js";


// 创建一个SSE端点，用于实时发送库存数据
export const inventoryInfo = catchSync((req, res) => {
  // 设置SSE响应头
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  const { steam_id, page, pageSize } = req.query;
  const offset = (page - 1) * pageSize;

  const inventories = inventoryModel.getInventory.all(steam_id, pageSize, offset);

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