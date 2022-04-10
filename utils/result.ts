import is from "is_js";
import { Context } from "/domain/controller.ts";

class QError extends Error {}

/**
 * Contains result which can be error or ok
 */
export default class Result<T> {
  private readonly value?: T;
  private readonly error?: QError;
  private readonly context?: Context;
  constructor(
    { err: error, ok: value, ctx }: { err?: string; ok?: T; ctx?: Context },
  ) {
    if (
      (is.existy(error) && is.existy(value)) ||
      (is.not.existy(error) && is.not.existy(value))
    ) {
      throw new QError(
        "Incorrect Result initialization" + "result.INITIALIZE" + {
          error,
          value,
        },
      );
    }
    this.error = error ? new Error(error) : undefined;
    this.value = value;
    this.context = ctx;
  }

  /** Checks if this is an error result */
  isErr(): boolean {
    return is.existy(this.error);
  }

  /** Checks if this is an ok result */
  isOk(): boolean {
    return is.existy(this.value);
  }

  /** Extracts the error if present */
  err(): Error {
    if (is.not.existy(this.error)) {
      throw new QError(
        "Cannot extract error when it is not present" + "result.ERROR" + {
          error: this.error,
          value: this.value,
        },
      );
    }
    return this.error as Error;
  }

  /** Extracts the result if it is ok */
  ok(): T {
    if (is.not.existy(this.value)) {
      throw new QError(
        "Cannot extract ok when it is not present" + "result.OK" + {
          error: this.error,
          value: this.value,
        },
      );
    }
    return this.value as T;
  }

  /** Returns the context */
  ctx(): Context | undefined {
    return this.context;
  }

  /** Static factory to create an ok result */
  static ok<T>(val: T, ctx?: Context): Result<T> {
    return new Result<T>({ ok: val, ctx });
  }

  /** Static factory to create an err result */
  static err<T>(msg: string, ctx?: Context): Result<T> {
    return new Result<T>({ err: msg, ctx });
  }
}
