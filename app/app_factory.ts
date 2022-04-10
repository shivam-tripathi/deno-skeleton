import { inject, injectable, interfaces } from "inversify";
import { App, APP_TYPE } from "/app/app.ts";
import beans from "/core/beans.ts";
import HttpServer from "/app/http_server.ts";
import Config from "/utils/config.ts";

/** App Factory */
@injectable()
export default class AppFactory {
  constructor(
    @inject(beans.HTTP_SERVER_FACTORY) private httpFactory: interfaces.Factory<
      HttpServer
    >,
    @inject(beans.CONFIG) private config: Config,
  ) {}

  /** Get app based on type specified in Env */
  getApp(): App {
    switch (this.config.type) {
      case APP_TYPE.http:
        return this.httpFactory() as HttpServer;
      default:
        throw new Error("Invalid App Type");
    }
  }

  getHttpApp(): HttpServer {
    return this.httpFactory() as HttpServer;
  }
}
