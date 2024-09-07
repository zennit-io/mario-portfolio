import "../view-transitions.css";
import { getAllPosts, getPost } from "@/actions/blog";
import { CustomMDX } from "@/components/mdx";
import { RESUME } from "@/consts/resume";
import type { DynamicRouteProps } from "@/types";
import { formatDate } from "@/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: DynamicRouteProps<"slug">): Promise<Metadata | undefined> {
  const post = getPost(params.slug);

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const openGraphImageURL = image
    ? `${RESUME.url}${image}`
    : `${RESUME.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${RESUME.url}/blog/${post.slug}`,
      images: [
        {
          url: openGraphImageURL,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImageURL],
    },
  };
}

export default async ({ params }: DynamicRouteProps<"slug">) => {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <section id="blog">
      <Script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.metadata.title,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
          description: post.metadata.summary,
          image: post.metadata.image
            ? `${RESUME.url}${post.metadata.image}`
            : `${RESUME.url}/og?title=${post.metadata.title}`,
          url: `${RESUME.url}/blog/${post.slug}`,
          author: {
            "@type": "Person",
            name: RESUME.name,
          },
        })}
      </Script>
      <div className={"title flex flex-col"}>
        <h1 className="max-w-[650px] font-medium text-2xl tracking-tight">
          {post.metadata.title}
        </h1>
        <p className="text-neutral-600 text-sm dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose dark:prose-invert mt-8">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
};
