import { Status } from "oak";
import BaseError from "./base_error.ts";

export default class ValidationError extends BaseError {
  constructor(
    public details?: any,
    public data?: any,
  ) {
    super(
      "Validation Error",
      Status.BadRequest,
      "error.VALIDATION",
      details,
      data,
    );
  }
}
