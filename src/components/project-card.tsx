import { Badge } from "@/components/ui/badge";
import type { Project } from "@/consts/resume";
import Image from "next/image";
import Markdown from "react-markdown";

export type ProjectCardProps = Project & {
  className?: string;
};

export const ProjectCard = ({
  title,
  description,
  tags,
  link,
  image,
  video,
}: ProjectCardProps) => {
  return (
    <div
      key={title}
      className={
        "flex h-full text-left flex-col gap-2 overflow-hidden rounded-xl border border-border pb-3 transition-all duration-300 ease-out hover:shadow-lg"
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
          <h3 className="mt-1 font-semibold text-lg ">{title}</h3>
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
    </div>
  );
};
