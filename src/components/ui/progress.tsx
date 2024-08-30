"use client";

import type { ClassList } from "@/types";
import { cn } from "@/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { ComponentProps } from "react";

type ProgressClassListKey = "root" | "indicator";
export type ProgressProps = {
  classList?: ClassList<ProgressClassListKey>;
} & ComponentProps<typeof ProgressPrimitive.Root>;

export const Progress = ({
  className,
  value,
  ref,
  classList,
  ...props
}: ProgressProps) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className,
      classList?.root,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-primary transition-all",
        classList?.indicator,
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);
