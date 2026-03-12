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
  const state = userModel.bindSteamAccount.run(
      req.body['steam_id'],
      req.body['account_id'].toString(),
      req.body['persona_name'],
      req.body['avatar_url']
  )
  res.status(200).json({
    status: "success",
    message: state
  })
})