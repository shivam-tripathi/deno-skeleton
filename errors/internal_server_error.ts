import { Status } from "oak";
import BaseError from "./base_error.ts";

export default class InternalServerError extends BaseError {
  constructor(message: string, details?: any, data?: any) {
    super(
      message,
      Status.InternalServerError,
      "error.INTERNAL_SERVER_ERROR",
      details,
      data,
    );
  }
}
