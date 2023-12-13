const { StatusCodes } = require('http-status-codes');

  class BaseError extends Error {
    constructor(name, statusCode, description) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this);
    }
  }
  
  // 500 Internal Error
  class APIError extends BaseError {
    constructor(description = "api error") {
      super(
        "api internal server error",
        StatusCodes.INTERNAL_SERVER_ERROR,
        description
      );
    }
  }
  
  // 400 Validation Error
  class ValidationError extends BaseError {
    constructor(description = "bad request") {
      super("bad request", StatusCodes.BAD_REQUEST, description);
    }
  }
  
  // 403 Authorize error
  class AuthorizeError extends BaseError {
    constructor(description = "access denied") {
      super("access denied", StatusCodes.UNAUTHORIZED, description);
    }
  }
  
  // 404 Not Found
  class NotFoundError extends BaseError {
    constructor(description = "not found") {
      super("not found", StatusCodes.NOT_FOUND, description);
    }
  }
  
  module.exports = {
    APIError,
    ValidationError,
    AuthorizeError,
    NotFoundError,
  };
  