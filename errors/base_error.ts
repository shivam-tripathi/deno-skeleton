/**
 * Base Error class
 * @param code http status code, eg 500, 404, 401, 429.
 * @param short this is short error code to quickly identify the error class, eg. user.TOO_MANY_REQUESTS.
 * @param details this goes to sentry or other such service for error tracing.
 * @param data this is sent to the frontend.
 */
export default class BaseError extends Error {
  constructor(
    public msg?: string,
    public code?: number,
    public short?: string,
    public details?: any,
    public data?: any,
  ) {
    super(msg);
  }
}
