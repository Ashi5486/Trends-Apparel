const CustomError = require('../utils/customError.js');

// Function to handle operational errors (errors expected by the application)
const prodError = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong, please try again later.',
    });
  }
};

// Function to handle development-specific error details (detailed error stack)
const devError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    err,
  });
};

// Handling CastError (invalid values in MongoDB queries)
const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}!`;
  return new CustomError(msg, 400);
};

// Handling duplicate key errors (for example, trying to insert a duplicate value)
const duplicateKeyErrorHandler = (err) => {
  const name = err.keyValue.name;
  const msg = `There is already an entry with the name ${name}. Please use another name!`;
  return new CustomError(msg, 400);
};

// Handling validation errors (incorrect or missing input data)
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessages = errors.join('. ');
  const msg = `Invalid input data: ${errorMessages}`;
  return new CustomError(msg, 400);
};

// Main error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devError(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') err = castErrorHandler(err);
    if (err.code === 11000) err = duplicateKeyErrorHandler(err);
    if (err.name === 'ValidationError') err = validationErrorHandler(err);
    prodError(res, err);
  }
};
