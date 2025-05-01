/* eslint-disable no-unused-vars */
// route not found middleware

const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `🔍 Route not found: ${req.originalUrl}`,
  });
};

export default notFoundMiddleware;
