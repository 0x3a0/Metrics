import express from 'express';
import * as userController from '../controllers/userController.js'


const userRouter = express.Router();

userRouter.get('/getBindSteamAccount', userController.getBindSteamAccount);

userRouter.get('/searchSteamAccount', userController.searchSteamAccount);

userRouter.post('/bindSteamAccount', userController.bindSteamAccount);

// 导出 userRouter
export default userRouter;