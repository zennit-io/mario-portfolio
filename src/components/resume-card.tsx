"use client";

import { AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRightIcon } from "@/icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

type ResumeCardProps = {
  logo: string;
  alt: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  description?: string;
  start: string;
  end: string;
};
export const ResumeCard = ({
  logo,
  alt,
  title,
  subtitle,
  href,
  badges,
  description,
  start,
  end,
}: ResumeCardProps) => {
  return (
    <AccordionItem value={title}>
      <AccordionPrimitive.AccordionTrigger
        className={
          "!no-underline group w-full justify-start [&[data-state=open]_svg]:rotate-90"
        }
      >
        <div className="flex w-full items-center gap-x-2 text-base">
          <Avatar className="size-12 border bg-muted-background dark:bg-foreground">
            <AvatarImage src={logo} alt={alt} className="object-contain" />
            <AvatarFallback>{alt[0]}</AvatarFallback>
          </Avatar>
          <div className={"flex flex-col items-start"}>
            <div className={"flex items-center gap-2"}>
              <h3 className={"font-medium text-lg leading-4"}>{title}</h3>
              <ChevronRightIcon className="size-4 shrink-0 opacity-0 transition-all duration-200 duration-300 group-hover:opacity-100" />
            </div>
            <h5 className={"text-foreground-dimmed text-xs tracking-tight"}>
              {subtitle}
            </h5>
          </div>
          <h3
            className={
              "md:flex hidden ml-auto font-mono text-foreground-dimmed text-sm"
            }
          >
            {start} - {end}
          </h3>
        </div>
      </AccordionPrimitive.AccordionTrigger>
      <AccordionContent className={"pt-4 pl-2 text-sm"}>
        {description ?? subtitle}
      </AccordionContent>
    </AccordionItem>
  );
};
