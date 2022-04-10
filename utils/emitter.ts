import beans from "/core/beans.ts";
import { inject, injectable } from "inversify";
import Logger from "/core/logger.ts";
import ErrorHandler from "/errors/error_handler.ts";
import { Context } from "../domain/controller.ts";
import InternalServerError from "../errors/internal_server_error.ts";

export interface EmittedError {
  message: string;
  details?: {
    error?: Error;
  };
  context: Context;
}

/**
 * Event emitter for the application. It's primary use cases is capture any events from any resource
 * and to relay global errors to event handler.
 */
@injectable()
export default class Emitter {
  constructor(
    @inject(beans.LOGGER) private logger: Logger,
    @inject(beans.ERROR_HANDLER) private errorHandler: ErrorHandler,
  ) {}

  log(payload: any) {
    this.logger.info("log", payload);
  }

  success(payload: any) {
    this.logger.info("success", payload);
  }

  error(msg: string, payload: EmittedError) {
    this.logger.error(msg, payload);
    const { message, details, context } = payload;
    this.handleError(context, new InternalServerError(message, details));
  }

  handleError(ctx: Context, error?: Error) {
    this.errorHandler.handle(ctx, error);
  }
}
