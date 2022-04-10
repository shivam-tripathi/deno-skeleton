import is from "is_js";

export class Option<T> {
  constructor(public value: T) {
  }

  static none() {
    return None.getInstance();
  }

  static some<I>(item: I) {
    return Some.getInstance(item);
  }

  static match<I, N, S>(
    args: {
      option: Option<I>;
      whenNone: () => N;
      whenSome: () => S;
    },
  ) {
    if (None.isNone(args.option)) {
      return args.whenNone();
    }
    return args.whenSome();
  }
}

export class None extends Option<undefined> {
  private static instance?: None;
  private constructor() {
    super(undefined);
  }

  static getInstance() {
    if (is.not.existy(None.instance)) {
      None.instance = new None();
    }
    return None.instance;
  }

  static isNone(obj: any) {
    if (is.not.existy(None.instance)) {
      None.instance = new None();
    }
    return obj === None.instance;
  }
}

export class Some<T> extends Option<T> {
  private constructor(value: T) {
    super(value);
  }

  static getInstance<I>(item: I) {
    return new Some(item);
  }

  static isSome(obj: any) {
    return obj instanceof Some;
  }
}
