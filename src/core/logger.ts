import config from '../config/env';
import createLogger from 'pino';

const logger = createLogger({
  prettyPrint: true,
  level: config.LOG_LEVEL,
});

export default logger;
