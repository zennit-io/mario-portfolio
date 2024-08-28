import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils";
import { type ComponentProps, createContext, useContext, useId } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { Label } from "../label";

export type FormProps = ComponentProps<typeof FormProvider> &
  ComponentProps<"form">;

// todo: merge FormProvider with html form

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export type FormItemProps = ComponentProps<"div">;

export const FormItem = ({ className, ...props }: FormItemProps) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("flex flex-col gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};

export type FormLabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && "text-error", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};

export type FormControlProps = ComponentProps<typeof Slot>;

export const FormControl = ({ ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

export type FormDescriptionProps = ComponentProps<"p">;

export const FormDescription = ({
  className,
  ...props
}: FormDescriptionProps) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-foreground-dimmed", className)}
      {...props}
    />
  );
};

export type FormMessageProps = ComponentProps<"p">;

export const FormMessage = ({
  className,
  children,
  ...props
}: FormMessageProps) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  return (
    <p
      id={formMessageId}
      className={cn("h-3 font-body font-medium text-2xs text-error", className)}
      {...props}
    >
      {body ?? " "}
    </p>
  );
};
