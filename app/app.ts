/** Allowed App types */
export enum APP_TYPE {
  http = "http",
  kafka = "kafka",
}

/** App interface */
export interface App {
  type: APP_TYPE;
  start(): Promise<void>;
}
