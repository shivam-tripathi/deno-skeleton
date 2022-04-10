import { inject, injectable } from "inversify";
import ErrorHandler from "../../errors/error_handler.ts";
import beans from "../beans.ts";
import BaseController from "./base_controller.ts";
import HttpController from "./http_controller.ts";

@injectable()
export class ControllerFactory {
  constructor(@inject(beans.ERROR_HANDLER) private errorHandler: ErrorHandler) {
  }

  http(baseController: BaseController) {
    const controller = new HttpController(baseController, this.errorHandler);
    return controller.exec.bind(controller);
  }
}
