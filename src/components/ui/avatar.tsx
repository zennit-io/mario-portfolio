"use client";

import { cn } from "@/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import * as React from "react";

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root>;

export const Avatar = ({ className, ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border",
      className,
    )}
    {...props}
  />
);
export type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>;
export const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <AvatarPrimitive.Image
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);

export type AvatarFallbackProps = ComponentProps<
  typeof AvatarPrimitive.Fallback
>;
export const AvatarFallback = ({
  className,
  ...props
}: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-accent",
      className,
    )}
    {...props}
  />
);
