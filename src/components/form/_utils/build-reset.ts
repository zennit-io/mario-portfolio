import type { FieldShape, FormConfig } from "../_types";

export const buildReset = <T extends FormConfig>(config: T) => {
  return Object.fromEntries(
    Object.entries(config).map(([key, field]) => {
      if (field.defaultValue !== undefined) {
        return [key, field.defaultValue];
      }
      return [key, getFieldDefaultValueFromShape(field.shape)];
    }),
  );
};

const getFieldDefaultValueFromShape = (shape: FieldShape) => {
  switch (shape) {
    case "text":
    case "textarea":
      return "";
    case "select":
    case "radio-group":
      return null;
    case "switch":
    case "checkbox":
      return false;
    case "slider":
      return 0;
    case "date":
      return new Date();
    case "phone-number":
      return "";
  }
};
