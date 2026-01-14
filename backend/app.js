import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import AppError from './utils/appError.js';
import userRouter from './routers/userRouter.js';
import inventoryRouter from './routers/inventoryRouter.js';
import errorHandler from './controllers/errorController.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan('dev'));
}

// Routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/inventory', inventoryRouter);

// 处理未知请求
app.use((req, res, next) => {
  next(
      new AppError(`无法找到 ${req.originalUrl}!`, 404)
  );    // 错误传递给下一个中间件统一处理
})

app.use(errorHandler);

export default app;