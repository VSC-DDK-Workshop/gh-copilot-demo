/**
 * Error handling middleware
 */

/**
 * Handle 404 errors for routes that don't exist
 */
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

/**
 * Global error handler
 */
function errorHandler(err, req, res, next) {
  // Default error status and message
  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Development vs Production error handling
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Log error details (in production, consider using a proper logging service)
  console.error(`Error ${statusCode}: ${message}`);
  if (isDevelopment && err.stack) {
    console.error(err.stack);
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry';
  }

  // Rate limiting error
  if (err.status === 429) {
    statusCode = 429;
    message = 'Too many requests. Please try again later.';
  }

  // Prepare error response
  const errorResponse = {
    error: {
      status: statusCode,
      message: message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  // Include stack trace in development
  if (isDevelopment && err.stack) {
    errorResponse.error.stack = err.stack;
  }

  // Include validation details if available
  if (err.details) {
    errorResponse.error.details = err.details;
  }

  res.status(statusCode).json(errorResponse);
}

/**
 * Async error wrapper to catch errors in async route handlers
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Create a custom error with status code
 */
function createError(statusCode, message, details = null) {
  const error = new Error(message);
  error.status = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
}

module.exports = {
  notFoundHandler,
  errorHandler,
  asyncHandler,
  createError
};
