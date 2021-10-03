export const errorHandler = (error, req, res, next) => {
  if (!res.headersSent) {
    console.log(error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode || 500;
    const message = error.message || 'An unknown error occured';
    const stack = error.stack;
    res.status(statusCode).json({ message, stack });
  }
  next(error);
};
