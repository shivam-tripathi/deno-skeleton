export default {
  CONFIG: Symbol.for("env"),
  LOGGER: Symbol.for("logger"),
  EMITTER: Symbol.for("emitter"),
  APP_FACTORY: Symbol.for("factory_app"),
  ERROR_HANDLER: Symbol.for("error_handler"),
  HTTP_SERVER_FACTORY: Symbol.for("factory_http_server"),
  HTTP_SERVER: Symbol.for("http_server"),
  CONTROLLER_FACTORY: Symbol.for("factory_controller"),
  META_CONTROLLER: Symbol.for("meta_controller"),
  API_SERVER: Symbol.for("api_server"),
};
