const {
  createLogger,
  transports,
  format,
  config,
} = require('winston');
const {
  set,
  get,
  omit,
} = require('lodash');
const { logger } = require('koa2-winston');
const SlackHook = require('winston-slack-webhook-transport');

const winstonLogLevels = get(config, 'syslog.levels');

const {
  combine,
  colorize,
  splat,
  prettyPrint,
  json,
} = format;

const enumerateErrorFormat = format(info => {
  if (info.message instanceof Error) {
    info.stack = info.message.stack;
    info.message = info.message.message;
  }

  return info;
});

const enumerateErrorFormatSimple = format(info => {
  if (info.message instanceof Error) {
    info.message = `${info.message.message}\n${info.message.stack.split('\n')
      .map(e => e.trim())
      .join('\n')}`;
  }

  return info;
});

const timestamp = format(info => set(info, 'date', new Date().toISOString()));
const status = format(info => set(info, 'status', get(info, 'res.status')));
const skipper = format(info => omit(info, ['req', 'res', 'started_at']));

const devFormat = combine(
  enumerateErrorFormatSimple(),
  prettyPrint(),
  colorize(),
  timestamp(),
  splat(),
);

const prodFormat = combine(
  enumerateErrorFormat(),
  timestamp(),
  json(),
);

const koaFormat = sourceFormat => combine(
  status(),
  skipper(),
  sourceFormat,
);

const getFormat = () => process.env.NODE_ENV === 'production'
  ? prodFormat
  : devFormat;

const getTransport = () => new transports.Console({ format: getFormat() });
const getKoaTransport = () => new transports.Console({ format: koaFormat(getFormat()) });
const getSlackTransport = () => new SlackHook({ webhookUrl: process.env.SLACK_WEBHOOK, level: 'error' });

const initLogger = level => createLogger({
  level,
  levels: winstonLogLevels,
  transports: [getTransport(), ...(process.env.NODE_ENV === 'production' ? [getSlackTransport()] : [])],
});

const koaLogger = level => logger({
  level,
  levels: winstonLogLevels,
  transports: [getKoaTransport()],
});

module.exports = {
  initLogger,
  koaLogger,
};
