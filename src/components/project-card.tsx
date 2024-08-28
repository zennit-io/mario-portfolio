import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import type {ReactNode} from "react";
import Markdown from "react-markdown";

type ProjectType = {
  title: string;
  href?: string;
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

export type ProjectCardProps = ProjectType & {
  className?: string;
};

export const ProjectCard = ({
  title,
  href,
  description,
  tags,
  link,
  image,
  video,
  links,
  className,
}: ProjectCardProps) => {
  return (
    <div
      key={title}
      className={
        "flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-border pb-3 transition-all duration-300 ease-out hover:shadow-lg"
      }
    >
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
        />
      )}
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-40 w-full overflow-hidden object-cover object-top"
        />
      )}

      <div className="px-3">
        <div className="space-y-1">
          <h3 className="mt-1 font-semibold text-lg">{title}</h3>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose dark:prose-invert max-w-full text-pretty font-sans text-muted-foreground text-xs">
            {description}
          </Markdown>
        </div>
      </div>
      <div className="mt-auto flex flex-col px-3">
        {!!tags.length && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge className="text-2xs" variant="soft" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {!!links?.length && (
        <div className="px-2 pb-2">
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link) => (
              <Link href={link?.href} key={link.href} target="_blank">
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
