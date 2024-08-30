type OmittableKeys =
  | "name"
  | "ref"
  | "value"
  | "defaultValue"
  | "children"
  | "onChange"
  | "onBlur";
export type RefinedFieldProps<T> = Omit<T, OmittableKeys>;
