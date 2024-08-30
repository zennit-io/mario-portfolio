import type { RefinedFieldProps } from "@/components/form";
import type { PartialFields, RequiredFields, Tuple } from "@/types";
import type { z } from "zod";
import type { CoreType } from "./core-type";
import type {
  BaseFieldShapeConfigMap,
  FieldProps,
  FieldShape,
  FieldShapePropsMap,
} from "./field-shape";

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
    description?: string;
  } & (CoreType<T> extends z.ZodEnum<Tuple<string>>
    ? {
        optionLabels?: Partial<Record<NonNullable<z.infer<T>>, string>>;
      }
    : Record<never, never>) &
  (S extends "date" ? InferredCalendarProps<M, T> : Record<never, never>);

type InferredCalendarProps<
  M extends FieldShapePropsMap,
  T extends z.ZodType,
> = PartialFields<
  Extract<
    RequiredFields<M["date"], "type">,
    {
      type: CalendarType<T>;
    }
  >,
  "type"
>;

type CalendarType<T extends z.ZodType> = NonNullable<
  Pick<
    Extract<BaseFieldShapeConfigMap["date"], { constraint: CoreType<T> }>,
    "type"
  >["type"]
>;
