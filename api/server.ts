import { inject, injectable } from "inversify";
import beans from "/core/beans.ts";
import AppFactory from "/app/app_factory.ts";
import { Router } from "oak";
import { ControllerFactory } from "../core/controllers/factory_controller.ts";
import MetaController from "./controllers/meta.ts";

@injectable()
export default class ApiServer {
  constructor(
    @inject(beans.APP_FACTORY) private appFactory: AppFactory,
    @inject(beans.CONTROLLER_FACTORY) private controllerFactory:
      ControllerFactory,
    @inject(beans.META_CONTROLLER) private metaController: MetaController,
  ) {}
  async start() {
    const app = this.appFactory.getHttpApp();
    const router = new Router();
    router.get(
      "/_meta",
      this.controllerFactory.http(this.metaController.meta()),
    );
    app.register(router);
    await app.start().catch((err) => {
      console.error("server error", err);
    });
  }
}
