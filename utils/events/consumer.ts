import { Context } from "/domain/controller.ts";
import Emitter from "/utils/emitter.ts";
import type Event from "/utils/events/base_event.ts";

export type EventCallback = (args: {
  eventName: string;
  data: any;
}) => Promise<any>;

/**
 * Consumer base class. Use by subscribers to react to event(s) by registering this in all the
 * events. For every consumer type, extend this class and make that injectable.
 */
export default class Consumer {
  id: string;
  watching: Event[];

  /** constructor */
  constructor(
    private emitter: Emitter,
    private name: string,
    private cb: EventCallback,
  ) {
    this.id = crypto.randomUUID();
    this.watching = [];
  }

  /** Subscribe to the given event */
  subscribedTo({ event }: { event: Event }) {
    this.watching.push(event);
  }

  /** Delete this consumer */
  delete() {
    this.watching.forEach((event) => {
      event.unsubscribe(this);
    });
    this.watching = [];
  }

  /** Utility method called by Event to notify this consumer of the occurrence */
  async notify<T>({
    eventName,
    data,
    context,
  }: {
    eventName: string;
    data: T;
    context: Context;
  }) {
    try {
      const response = await this.cb({ eventName, data });
      return { consumerName: this.name, consumerId: this.id, response };
    } catch (ex) {
      this.emitter.error(`${this.name} failed to consume`, {
        message: ex?.message,
        context,
      });
    }
  }
}
