const { ErrorException } = require('./ErrorException');

class ErrorInvalidRequest extends ErrorException {
  constructor(errors = [], statusCode = 422, message = 'invalid request body values') {
    super(statusCode, message);
    this.errorsMsg = errors;
  }
}

module.exports = { ErrorInvalidRequest };
