const { ErrorException } = require('../errorsHandler/ErrorException');
const { ErrorInvalidRequest } = require('../errorsHandler/ErrorInvalidRequest');
const { ErrorTranslated } = require('../errorsHandler/errorTranslated');
const { writeLogs } = require('../utility/loggers');

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  if (err instanceof ErrorInvalidRequest) {
    writeLogs(req, err);
    return res
      .status(statusCode)
      .json({ response: 'error', message: err.message, errorsMsg: err.errorsMsg || [] });
  }
  if (err instanceof ErrorTranslated) {
    writeLogs(req, err);
    return res.status(200).json({ response: err.response, errMessage: err.errMessage });
  }
  if (err instanceof ErrorException) {
    writeLogs(req, err);
    return res
      .status(statusCode)
      .json({ status: 'failed', message: err.message, data: null });
  }
  writeLogs(req, err);
  return res
    .status(statusCode)
    .json({ status: 'failed', message: 'something went wrong', data: null });
};

module.exports = errorHandlerMiddleware;
