import "/utils/reflect.ts";
import { injectable } from "inversify";
import { APP_TYPE } from "/app/app.ts";
import { Env } from "/domain/env.ts";

@injectable()
export default class Config {
  type: APP_TYPE;
  env: Env;
  service: string;
  port: number;
  constructor() {
    this.type = Deno.env.get("APP_TYPE") as APP_TYPE ?? APP_TYPE.http;
    this.env = Deno.env.get("APP_ENV") as Env ?? "dev";

    this.service = Deno.env.get("APP_SERVICE") ?? "api";
    this.port = parseInt(Deno.env.get("APP_SERVER_PORT") ?? "3000", 10);
  }
}
