import { BlurFade } from "@/components/animations/blur-fade";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, createElement } from "react";
import { highlight } from "sugar-high";

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};
const Table = ({ data }: TableProps) => {
  const headers = data.headers.map((header, index) => (
    <th key={header}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <tr key={index}>
      {row.map((cell, index) => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

type MDXLinkProps = ComponentProps<"a">;
const MDXLink = (props: MDXLinkProps) => {
  const { href } = props;

  if (!href) return <a {...props} />;

  if (href.startsWith("/"))
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );

  if (href.startsWith("#")) return <a {...props} />;

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

type MDXImageProps = ComponentProps<typeof Image>;
const MDXImage = (props: MDXImageProps) => {
  return <Image className="rounded-lg" {...props} />;
};

type MDXCodeProps = ComponentProps<"code">;
const MDXCode = ({ children, ...props }: MDXCodeProps) => {
  const HTML = highlight(children as string);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: no dangerous code
  return <code dangerouslySetInnerHTML={{ __html: HTML }} {...props} />;
};

const slugify = (string: string) => {
  return string
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with (-)
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for (-)
    .replace(/\-\-+/g, "-"); // Replace multiple – with single (-)
};

type MDXHeadingProps = ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
const createHeading = (level: number) => {
  const MDXHeading = ({ children }: MDXHeadingProps) => {
    const slug = slugify(children as string);
    return (
      <BlurFade>
        {createElement(
          `h${level}`,
          { id: slug },
          [
            createElement("a", {
              href: `#${slug}`,
              key: `link-${slug}`,
              className: "anchor",
            }),
          ],
          children,
        )}
      </BlurFade>
    );
  };
  MDXHeading.displayName = `Heading${level}`;
  return MDXHeading;
};

const MDX_COMPONENTS = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: MDXImage,
  a: MDXLink,
  code: MDXCode,
  Table,
};

export const CustomMDX = ({ components = {}, ...props }: MDXRemoteProps) => {
  return (
    <MDXRemote {...props} components={{ ...MDX_COMPONENTS, ...components }} />
  );
};
