import fs from 'node:fs'
import path from 'node:path'

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatter = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  for (const line of frontMatter) {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(path: string) {
  const content = fs.readFileSync(path, "utf-8");
  return parseFrontmatter(content);
}

function getMDXData(dir: string) {
  const files = getMDXFiles(dir);
  return files.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getAllPosts() {
  return getMDXData(path.join(process.cwd(), "content"));
}

export function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  const { metadata, content } = readMDXFile(filePath);
  return {
    metadata,
    slug,
    content,
  };
}
