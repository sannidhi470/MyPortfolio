import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  let views = 0;
  const hasUpstashEnv =
    !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
  if (hasUpstashEnv) {
    try {
      const redis = Redis.fromEnv();
      views =
        (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;
    } catch {
      views = 0;
    }
  }

  return (
    <div className="relative min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <main className="px-6 py-10 mx-auto max-w-4xl lg:py-14">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/30 p-6 md:p-10">
          <article className="prose prose-invert prose-zinc prose-quoteless max-w-none">
            <Mdx code={project.body.code} />
          </article>
        </div>
      </main>
    </div>
  );
}
