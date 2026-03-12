import express from 'express';
import * as userController from '../controllers/userController.js'


const userRouter = express.Router();

userRouter.get('/getAccount', userController.getAccount);
userRouter.get('/searchAccount', userController.searchAccount);
userRouter.post('/bindAccount', userController.bindAccount);

// 导出 userRouter
export default userRouter;