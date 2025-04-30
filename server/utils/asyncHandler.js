const asyncHandler = (func) => {
    // This function is called by Express when we hit an API, so we have access to req, res, next
    return (req, res, next) => {
      func(req, res, next).catch((err) => next(err));
    };
  };
  
  module.exports = asyncHandler;
  
  