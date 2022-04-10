import "/utils/reflect.ts";
import BaseController from "/core/controllers/base_controller.ts";
import { injectable } from "inversify";

@injectable()
export default class MetaController {
  meta(): BaseController {
    return {
      exec() {
        return { data: { name: "meta" } };
      },
    };
  }
}
