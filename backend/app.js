import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

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

// 404 - 处理未知请求
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "404 Not Found!",
  })
})

// 错误处理中间件
app.use(errorHandler);

export default app;