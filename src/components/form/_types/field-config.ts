import type { Tuple } from "@/types";
import type { z } from "zod";
import type { CoreType } from "./core-type";
import type {
  BaseFieldShapeConfigMap,
  FieldProps,
  FieldShape,
  FieldShapePropsMap,
} from "./field-shape";
import type { RefinedFieldProps } from "./refined-field-props";

export type FieldConfig = {
  shape: FieldShape;
  constraint: z.ZodType;
  placeholder?: string;
  label?: string;
  description?: string;
} & FieldProps;

export type FormConfig = Record<string, FieldConfig>;

export type FieldValues = Record<string, unknown>;

type RefinedBaseFieldShapeConfig<S extends FieldShape> = Omit<
  BaseFieldShapeConfigMap[S],
  "constraint" | "optionLabels"
>;

export type InferredFieldConfig<
  M extends FieldShapePropsMap,
  S extends FieldShape,
  T extends z.ZodType,
> = RefinedBaseFieldShapeConfig<S> &
  RefinedFieldProps<M[S]> & {
    shape: S;
    constraint: CoreType<T> extends BaseFieldShapeConfigMap[S]["constraint"]
      ? T
      : BaseFieldShapeConfigMap[S]["constraint"];

    defaultValue?: z.infer<T>;
    label?: string;
    // hidden?: undefined extends z.infer<T> ? string : number;
    description?: string;
  } & (CoreType<T> extends z.ZodEnum<Tuple<string>>
    ? {
        optionLabels?: Partial<Record<NonNullable<z.infer<T>>, string>>;
      }
    : Record<never, never>);
