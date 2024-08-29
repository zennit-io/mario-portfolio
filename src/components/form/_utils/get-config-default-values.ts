import type { FormConfig, InferredRawShape } from "../_types";

export const getConfigDefaultValues = <T extends FormConfig>(
  config: T,
): Partial<InferredRawShape<T>> => {
  const configDefaultValuesArray = Object.entries(config)
    .filter(([, { defaultValue }]) => defaultValue !== undefined)
    .map(([key, { defaultValue }]) => [key, defaultValue]);

  return Object.fromEntries(configDefaultValuesArray);
};
