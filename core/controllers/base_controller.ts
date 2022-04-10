import { Context, ControllerResponse } from "/domain/controller.ts";

export interface ValidationResult {
  error?: string | string[];
}

export default interface BaseController {
  sanitize?: (input: Context) => void | Promise<void>;
  validate?: (
    ctx: Context,
  ) => void | ValidationResult | Promise<ValidationResult>;
  exec(
    ctx?: Context,
  ):
    | void
    | Promise<void>
    | ControllerResponse<unknown>
    | Promise<ControllerResponse<unknown>>
    | never;
}
