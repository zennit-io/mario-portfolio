import type { UseInferredFormWithHideField } from "../../form";
import { cn } from "@/utils";
import type { ReactNode } from "react";
import type { z } from "zod";
import {
  type FieldShape,
  Form,
  type FormConfig,
  InferredFormControl,
  type InferredFormControlProps,
  type InferredRawShape,
  type UseInferredFormParams,
  useInferredForm,
} from ".";
import { Button, type ButtonProps } from "../button";
import { useFormContext, type UseFormReturn } from "react-hook-form";

export type InferredFormProps<T extends FormConfig> = {
  onSubmit: (
    data: InferredRawShape<T>,
    form: UseFormReturn<InferredRawShape<T>>,
  ) => void;
  config: UseInferredFormParams<T>[0];
  defaultValues?: NonNullable<UseInferredFormParams<T>[1]>["defaultValues"];
  hideFormFields?: NonNullable<UseInferredFormParams<T>[1]>["hideFormFields"];
  props?: NonNullable<UseInferredFormParams<T>[1]>["props"];
  children?: ReactNode;
  className?: string;
  shouldHideFormField?: (fieldName: string, data: unknown) => boolean;
};

export const InferredForm = <T extends FormConfig>({
  config,
  onSubmit,
  props = {},
  defaultValues,
  hideFormFields,
  children,
  className,
}: InferredFormProps<T>) => {
  const form = useInferredForm<T>(config, {
    defaultValues,
    hideFormFields,
    ...props,
  });

  // const shouldHideField = hideFormFields
  //   ? (form as UseInferredFormWithHideField<T>).shouldHideField
  //   : undefined;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((fields) => onSubmit(fields, form))}
        className={cn("flex flex-col gap-2.5", className)}
      >
        {Object.entries(config).map(([key, field]) => (
          <InferredFormControl
            {...(field as InferredFormControlProps<FieldShape, z.ZodType>)}
            // shouldHideFormField={shouldHideField}
            key={key}
            name={key}
          />
        ))}
        <div className={"flex w-full justify-end"}>{children}</div>
      </form>
    </Form>
  );
};

export type FormSubmitButtonProps<T extends FormConfig> = {
  onSubmit?: (
    data: InferredRawShape<T>,
    form: UseFormReturn<InferredRawShape<T>>,
  ) => void;
} & ButtonProps;

export const FormSubmitButton = <T extends FormConfig>({
  variant = "default",
  color = "primary",
  children,
  ...props
}: FormSubmitButtonProps<T>) => {
  const form = useFormContext<InferredRawShape<T>>();
  if (!form) throw new Error("FormSubmitButton should be used within <Form>");
  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      type={"submit"}
      data-loading={form.formState.isSubmitting}
    >
      {children}
    </Button>
  );
};
