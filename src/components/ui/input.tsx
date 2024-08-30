"use client";

import { EyeClosedIcon, EyeIcon } from "@/icons";
import type { ClassList, Icon, Override } from "@/types";
import { cn } from "@/utils";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, useState } from "react";

export const inputRootVariants = cva(
  "flex h-9 w-full items-center justify-between gap-2 overflow-hidden rounded-lg border border-border px-2",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      variant: {
        border: "group/input p-0.5 transition duration-300",
      },
    },
  },
);

export const inputVariants = cva(
  "h-full min-w-0 flex-1 border-0 bg-transparent placeholder:text-foreground-dimmed/40 focus-visible:outline-none",
  {
    variants: {
      variant: {
        border:
          "!size-[calc(100%-theme(spacing.[1]))] flex rounded-md px-3 py-2 text-foreground text-sm shadow-input transition duration-500 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:placeholder-neutral-600 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600",
      },
    },
  },
);

type InputClassListKey = "root" | "input" | "decorator";
export type InputProps = {
  StartDecorator?: Icon;
  EndDecorator?: Icon;
  onTextChange?: (text: string) => void;
  classList?: ClassList<InputClassListKey>;
} & Override<
  ComponentProps<"input">,
  {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
  }
> &
  VariantProps<typeof inputRootVariants>;

export const Input = ({
  StartDecorator,
  EndDecorator,
  className,
  classList,
  disabled,
  onTextChange,
  variant,
  type,
  onChange,
  defaultValue = "",
  value: inheritedValue,
  ...props
}: InputProps) => {
  const [value = "", setValue] = useControllableState({
    prop: inheritedValue,
    defaultProp: defaultValue,
    onChange: (value) => {
      onChange?.(value);
      onTextChange?.(value);
    },
  });
  const [passwordHidden, setPasswordHidden] = useState(type === "password");

  return (
    <div
      className={cn(
        inputRootVariants({ disabled, variant }),
        className,
        classList?.root,
      )}
    >
      {StartDecorator && <StartDecorator className={"size-5"} />}
      <input
        {...props}
        onChange={(event) => setValue(event.target.value)}
        type={
          type === "password" ? (passwordHidden ? "password" : "text") : type
        }
        value={value}
        disabled={disabled}
        className={cn(inputVariants({ variant }), classList?.input)}
      />

      <div className={"ml-auto flex"}>
        {EndDecorator && <EndDecorator className={"size-5"} />}
        {type === "password" &&
          (passwordHidden ? (
            <EyeIcon
              className={"size-5"}
              onClick={() => setPasswordHidden(false)}
            />
          ) : (
            <EyeClosedIcon
              className={"size-5"}
              onClick={() => setPasswordHidden(true)}
            />
          ))}
      </div>
    </div>
  );
};
