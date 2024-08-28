type ObjectPlaceholder = Record<string, unknown>;

export type Override<
  T1 extends ObjectPlaceholder,
  T2 extends ObjectPlaceholder,
> = Omit<T1, keyof T2> & T2;
