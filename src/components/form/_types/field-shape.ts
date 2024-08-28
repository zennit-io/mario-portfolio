import type {Tuple} from "@/types";
import type {z} from "zod";
import type {RefinedFieldProps} from "./refined-field-props";

type ZodFile = z.ZodType<File, z.ZodTypeDef, File>;
type ZodDateRange = z.ZodObject<{
  start: z.ZodDate;
  end: z.ZodDate;
}>;

export type BaseFieldShapeConfigMap = {
  text: {
    constraint: z.ZodString | z.ZodNumber;
    type?: "text" | "number" | "password";
  };
  textarea: {
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
  date: {
    constraint: z.ZodDate | ZodDateRange;
  };
  "phone-number": {
    constraint: z.ZodString;
  };
};

export type FieldShape = keyof BaseFieldShapeConfigMap;
// biome-ignore lint/suspicious/noExplicitAny: this is okay, there are no other types that better describe this
export type FieldProps = Record<string, any>;
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
