import type { Props, Tuple } from "@/types";
import { z } from "zod";
import type { RefinedFieldProps } from "./refined-field-props";

type ZodFile = z.ZodType<File, z.ZodTypeDef, File>;

const zodDateRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});
type ZodDateRange = typeof zodDateRangeSchema;

export type BaseFieldShapeConfigMap = {
  text: {
    constraint: z.ZodString | z.ZodNumber;
    type?: "text" | "number" | "password";
  };
  textarea: {
    constraint: z.ZodString;
  };
  phone: {
    constraint: z.ZodString;
  };
  select: {
    constraint: z.ZodEnum<Tuple<string>>;
    placeholder?: string;
    optionLabels?: Partial<Record<string, string>>;
  };
  "radio-group": {
    constraint: z.ZodEnum<Tuple<string>>;
    optionLabels?: Partial<Record<string, string>>;
  };
  switch: {
    constraint: z.ZodBoolean;
  };
  checkbox: {
    constraint: z.ZodBoolean;
  };
  slider: {
    constraint: z.ZodNumber | z.ZodTuple<[z.ZodNumber, z.ZodNumber]>;
    min: number;
    max: number;
  };
  file: {
    constraint: z.ZodArray<ZodFile>;
  };
  date:
    | {
        constraint: z.ZodDate;
        type?: "date";
      }
    | {
        constraint: ZodDateRange;
        type?: "date-range";
        // hello: string;
      };
};

export type FieldShape = keyof BaseFieldShapeConfigMap;
export type FieldProps = Props;
export type FieldShapePropsMap = Record<FieldShape, FieldProps>;

export type FieldShapeConfigMap<M extends FieldShapePropsMap> = {
  [key in FieldShape]: RefinedFieldProps<M[key]> &
    BaseFieldShapeConfigMap[key] & {
      shape: key;
      label?: string;
      description?: string;
    };
};

export type FieldShapeConfig<T extends FieldShapePropsMap> =
  FieldShapeConfigMap<T>[keyof FieldShapeConfigMap<T>];

export type FormShapeConfig<T extends FieldShapePropsMap> = Record<
  string,
  FieldShapeConfig<T>
>;
