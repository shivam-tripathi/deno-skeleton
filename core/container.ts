import { Container } from "inversify";
import MetaController from "/api/controllers/meta.ts";
import AppFactory from "/app/app_factory.ts";
import HttpServer from "/app/http_server.ts";
import ErrorHandler from "/errors/error_handler.ts";
import Config from "/utils/config.ts";
import beans from "/core/beans.ts";
import { ControllerFactory } from "/core/controllers/factory_controller.ts";
import ApiServer from "/api/server.ts";
import Logger from "/core/logger.ts";
import Emitter from "/utils/emitter.ts";

export default function getContainer() {
  const container = new Container();
  container.bind(beans.CONFIG).to(Config).inSingletonScope();
  container.bind(beans.LOGGER).to(Logger).inSingletonScope();
  container.bind(beans.EMITTER).to(Emitter).inSingletonScope();
  container.bind(beans.APP_FACTORY).to(AppFactory).inSingletonScope();
  container.bind(beans.META_CONTROLLER).to(MetaController).inSingletonScope();
  container.bind(beans.ERROR_HANDLER).to(ErrorHandler).inSingletonScope();
  container.bind(beans.CONTROLLER_FACTORY).to(ControllerFactory)
    .inSingletonScope();
  container.bind(beans.HTTP_SERVER_FACTORY).toAutoFactory(beans.HTTP_SERVER);
  container.bind(beans.HTTP_SERVER).to(HttpServer).inSingletonScope();
  container.bind(beans.API_SERVER).to(ApiServer).inSingletonScope();
  return container;
}
