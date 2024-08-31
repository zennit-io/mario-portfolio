import type { ReactNode } from "react";

export type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: {
    icon: ReactNode;
    type: string;
    href: string;
  }[];
};
