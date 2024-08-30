import "./view-transitions.css";
import { getAllPosts } from "@/actions/blog";
import { BlurFade } from "@/components/animations/blur-fade";
import { formatDate } from "@/utils";
import { Link } from "next-view-transitions";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-8 font-medium text-2xl tracking-tighter">blog</h1>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="mb-4 flex flex-col space-y-1"
              href={`/blog/${post.slug}`}
            >
              <div className="title flex w-full flex-col">
                <p className="font-medium text-2xl tracking-tight">
                  {post.metadata.title}
                </p>
                <p className="h-6 text-muted-foreground text-xs">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
