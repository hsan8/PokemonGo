const { ErrorException } = require('../errorsHandler/ErrorException');
const { ErrorInvalidRequest } = require('../errorsHandler/ErrorInvalidRequest');
const { ErrorTranslated } = require('../errorsHandler/errorTranslated');
const { writeLogs } = require('../utility/loggers');

const errorHandlerMiddleware = (err, req, res) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  writeLogs(req, err);
  if (err instanceof ErrorException) {
    return res.status(statusCode).json({ status: 'failed', message: err.message, data: null });
  }
  if (err instanceof ErrorInvalidRequest) {
    return res.status(200).json({ response: 'error', message: err.message });
  }
  if (err instanceof ErrorTranslated) {
    return res.status(200).json({ response: err.response, errMessage: err.errMessage });
  }
  return res.status(statusCode).json({ status: 'failed', message: 'something went wrong', data: null });
};

module.exports = { errorHandlerMiddleware };
