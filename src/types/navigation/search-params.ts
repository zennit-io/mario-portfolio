export type SearchParams<T extends string> = {
  [K in T]: string | string[] | undefined;
};
