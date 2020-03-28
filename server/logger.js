const winston = require('winston');

const errorStackFormat = winston.format(info => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

module.exports = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    errorStackFormat(),
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp(),
  ),
});
