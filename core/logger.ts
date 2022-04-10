import { injectable } from "inversify";

@injectable()
export default class Logger {
  private readonly logger = console;

  info(message: string, payload?: any): void {
    this.logger.info(message, payload);
  }

  error(message: string, payload?: any): void {
    this.logger.error(message, payload);
  }

  debug(message: string, payload?: any): void {
    this.logger.debug(message, payload);
  }

  warn(message: string, payload?: any): void {
    this.logger.warn(message, payload);
  }
}
