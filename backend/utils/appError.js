class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);    // 报错堆栈中将不包含AppError此处代码行
  }
}

export default AppError;