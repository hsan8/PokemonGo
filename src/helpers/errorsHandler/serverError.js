const { logger } = require('../utility/loggers');

const serverError = (error) => {
  logger.log('error', {
    time: new Date().toUTCString(),
    error
  });
};
module.exports = serverError;
