import { inject, injectable } from "inversify";
import { App, APP_TYPE } from "/app/app.ts";
import { Application, isHttpError, Router } from "oak";
import beans from "/core/beans.ts";
import Config from "/utils/config.ts";

@injectable()
export default class HttpServer implements App {
  type = APP_TYPE.http;
  app = new Application();

  constructor(@inject(beans.CONFIG) private config: Config) {}

  register(router: Router) {
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  async start() {
    console.log(
      `Starting Application on port ${this.config.port} with pid ${Deno.pid}`,
    );
    console.log(`
		\r███ ███ ███ ┼┼ ███ ███ ███ █▄█ ███ ███
		\r█▄█ █▄█ ┼█┼ ┼┼ █▄▄ █▄┼ █▄┼ ███ █▄┼ █▄┼
		\r█┼█ █┼┼ ▄█▄ ┼┼ ▄▄█ █▄▄ █┼█ ┼█┼ █▄▄ █┼█`);

    // Error handler
    this.app.use(async (context, next) => {
      try {
        await next();
      } catch (err) {
        if (isHttpError(err)) {
          context.response.status = err.status;
          const { message, status, stack } = err;
          if (context.request.accepts("json")) {
            context.response.body = { message, status, stack };
            context.response.type = "json";
          } else {
            context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
            context.response.type = "text/plain";
          }
        } else {
          console.log(err);
          throw err;
        }
      }
    });

    await this.app.listen({
      hostname: "127.0.0.1",
      port: this.config.port,
    }).then(() => {
      console.log("Running on ", Deno.pid);
    }).catch((err) => {
      console.log("***************", err);
    });
  }
}
