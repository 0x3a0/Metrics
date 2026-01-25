import AppError from '../utils/appError.js';


const sendErrorDev =  (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd =  (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {    // 程序内部未知错误的逻辑
    console.error('ERROR ', err);

    res.status(500).json({
      status: err.status,
      message: '未知错误'
    })
  }
}

const handleDuplicateFieldsDB = err => {
  const errField = err.message.split(":")[1].trim();
  const message = `重复提交${errField}，请使用其他${errField}值！`
  return new AppError(message, 400);
}

const errorHandler = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV.trim() === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
     err = handleDuplicateFieldsDB(err);
    }

    sendErrorProd(err, res);
  }
};

export default errorHandler;