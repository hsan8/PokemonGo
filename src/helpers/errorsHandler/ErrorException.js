class ErrorException extends Error {
  constructor(statusCode = 500, message = 'internal server error') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

module.exports = { ErrorException };
