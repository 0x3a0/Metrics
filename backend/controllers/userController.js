import axios from "axios";

import catchAsync from "../utils/catchAsync.js"
import catchSync from "../utils/catchSync.js";
import * as userModel from "../models/userModel.js";


export const getAccount = catchSync((req, res) => {
  const selectValue = userModel.getBindAccount.all();
  res.status(200).json({
    status: 'success',
    message: {
      'accounts': selectValue
    }
  })
})

export const searchAccount = catchAsync(async (req, res) => {
  const steam_id = req.query.steam_id;

  // 查询账号
  const url = `https://my.steamchina.com/actions/ajaxresolveusers?steamids=${steam_id}`
  const resp = await axios.get(url);

  res.status(200).json({
    status: 'success',
    message: resp.data
  });
})

export const bindAccount = catchSync((req, res) => {
  const { steam_id, account_id, persona_name, avatar_url } = req.body;
  
  // 检查账号是否已存在
  const checkResult = userModel.checkAccountExists.get(steam_id);
  if (checkResult && checkResult.count > 0) {
    return res.status(400).json({
      status: "error",
      message: "账号已绑定",
      code: "ACCOUNT_ALREADY_BOUND"
    });
  }
  
  try {
    // 绑定账号
    const state = userModel.bindSteamAccount.run(
      steam_id,
      account_id.toString(),
      persona_name,
      avatar_url
    );
    
    res.status(200).json({
      status: "success",
      message: state
    });
  } catch (error) {
    // 捕获数据库唯一性约束错误（处理竞争条件）
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({
        status: "error",
        message: "账号已绑定",
        code: "ACCOUNT_ALREADY_BOUND"
      });
    }
    // 其他错误重新抛出，由catchSync处理
    throw error;
  }
})