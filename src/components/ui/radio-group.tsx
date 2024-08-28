"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ClassList } from "@/types";
import { cn } from "@/utils";
import { CheckIcon } from "@/icons";
import type { ComponentProps } from "react";

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex gap-5", className)}
      {...props}
    />
  );
};

type RadioGroupItemClassList = "root" | "icon";
type RadioGroupItemProps = {
  classList?: ClassList<RadioGroupItemClassList>;
} & ComponentProps<typeof RadioGroupPrimitive.Item>;

export const RadioGroupItem = ({
  className,
  classList,
  ...props
}: RadioGroupItemProps) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
        classList?.root,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className={cn("size-3.5", classList?.icon)} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};
