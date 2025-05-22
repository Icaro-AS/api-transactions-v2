import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.simple(),
    format.colorize({ all: true }),
  ),
  transports: [new transports.Console()],
});
