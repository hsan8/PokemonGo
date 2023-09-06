const { ErrorException } = require('./ErrorException');

class ErrorTranslated extends ErrorException {
  constructor(errMessage) {
    super(200, '');
    this.response = 'success';
    this.errMessage = errMessage;
  }
}

module.exports = { ErrorTranslated };
