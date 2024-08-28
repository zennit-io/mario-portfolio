"use client";

import { ChevronDownIcon } from "@/icons";
import { cn } from "@/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";

export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root>;
export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;
export const AccordionItem = (props: AccordionItemProps) => (
  <AccordionPrimitive.Item {...props} />
);

export type AccordionTriggerProps = ComponentProps<
  typeof AccordionPrimitive.Trigger
>;
export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export type AccordionContentProps = ComponentProps<
  typeof AccordionPrimitive.Content
>;
export const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => (
  <AccordionPrimitive.Content
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
);
