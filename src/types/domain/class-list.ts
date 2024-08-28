import type { UnionToIntersection } from "../utilities";

type SubClassList<T extends string, U extends string> = Partial<Record<T, U>>;

export type ClassList<T extends string | SubClassList<string, string>> =
  UnionToIntersection<
    T extends string
      ? Partial<Record<T, string>>
      : T extends SubClassList<infer K, infer V>
        ? Partial<Record<K, SubClassList<V, string>>>
        : never
  >;
