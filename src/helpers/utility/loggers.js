const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.File({ filename: 'error.log', level: 'error' })]
});
if (process.env.POKEMON_GO_ENVIRONNEMENT === 'PROD') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

function writeLogs(req, error) {
  logger.log(
    'error',
    `[${new Date().toUTCString()}] | fromIP: ${
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    } | method: ${req.method} | originalUri: ${req.originalUrl} | uri: ${
      req.url
    } | requestData: ${JSON.stringify(req.body)} | responseData:${error} | referer: ${
      req.headers.referer || ''
    } | ua: ${req.headers['user-agent']}`
  );
}

module.exports = { logger, writeLogs };
