import BaseController from "/core/controllers/base_controller.ts";
import ErrorHandler from "/errors/error_handler.ts";
import { RouterContext, Status } from "oak";
import is from "is_js";

import { Context } from "/domain/controller.ts";
import ValidationError from "../../errors/validation_error.ts";

export default class HttpController {
  constructor(
    private controller: BaseController,
    private errorHandler: ErrorHandler,
  ) {}

  async exec(ctx: RouterContext<any, any, any>) {
    // request context
    const req: Context = {
      requestId: crypto.randomUUID(),
      route: ctx.request.url,
    };

    try {
      const body = await ctx.request.body().value;
      const params = ctx.params;
      const query: { [key: string]: string } = {};
      for (const [key, value] of ctx.request.url.searchParams.entries()) {
        query[key] = value;
      }

      req.request = {
        body,
        params,
        query,
      };

      // sanitize
      if (this.controller.sanitize) {
        await this.controller.sanitize(req);
      }

      // validation
      if (this.controller.validate) {
        const validationResult = await this.controller.validate(req);
        if (is.not.empty(validationResult?.error ?? [])) {
          const msgs = Array.isArray(validationResult?.error)
            ? validationResult?.error
            : [validationResult?.error];
          throw new ValidationError({
            request: req.request,
          }, msgs);
        }
      }

      const response = await this.controller.exec(req);

      // body
      if (response?.data) {
        ctx.response.body = { success: true, data: response.data };
      }

      // headers
      ctx.response.headers = new Headers(
        Object.entries(response?.headers ?? {}),
      );

      // Cookies
      response?.cookies?.forEach((cookie) => {
        ctx.cookies.set(cookie.name, cookie.value, cookie.options);
      });
    } catch (err) {
      this.errorHandler.handle(req, err);
      console.log({
        desc: err?.desc,
        code: err?.code,
        msg: err?.msg,
        details: err?.details,
        data: err?.data,
      });
      ctx.response.status = err.status ?? Status.InternalServerError;
      ctx.response.body = JSON.stringify({
        data: {
          cause: err?.msg ?? err?.message,
          code: err?.short ?? "error.UKW",
          details: err?.data ?? {},
        },
        time: new Date(),
        success: false,
      });
    }
  }
}
