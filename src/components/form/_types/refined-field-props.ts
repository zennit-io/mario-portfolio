type OmittableKeys =
  | "name"
  | "ref"
  | "value"
  | "type"
  | "defaultValue"
  | "children"
  | "onChange"
  | "onBlur";
export type RefinedFieldProps<T> = Omit<T, OmittableKeys>;
