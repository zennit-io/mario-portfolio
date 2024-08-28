export type Result<T, E = Error> =
  | {
      data: T;
      success: true;
    }
  | {
      success: false;
      error: E;
    };
