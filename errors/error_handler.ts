import { inject, injectable } from "inversify";
import { Context } from "../domain/controller.ts";
import beans from "/core/beans.ts";
import Config from "/utils/config.ts";

@injectable()
export default class ErrorHandler {
  constructor(@inject(beans.CONFIG) private config: Config) {
  }
  async handle(ctx: Context, err: any) {
    console.log(err);
  }
}
