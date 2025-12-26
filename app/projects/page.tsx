import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";

export const revalidate = 60;
export default async function ProjectsPage() {
  const published = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    );

  const slugs = published.map((p) => p.slug);

  let views: Record<string, number> = {};
  const hasUpstashEnv =
    !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
  if (hasUpstashEnv) {
    try {
      const redis = Redis.fromEnv();
      const values = await redis.mget<number[]>(
        ...slugs.map((slug) => ["pageviews", "projects", slug].join(":")),
      );
      views = values.reduce((acc, v, i) => {
        acc[slugs[i]] = v ?? 0;
        return acc;
      }, {} as Record<string, number>);
    } catch {
      views = slugs.reduce((acc, slug) => {
        acc[slug] = 0;
        return acc;
      }, {} as Record<string, number>);
    }
  } else {
    views = slugs.reduce((acc, slug) => {
      acc[slug] = 0;
      return acc;
    }, {} as Record<string, number>);
  }

  return (
    <div className="relative pb-12">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-6 max-w-7xl lg:px-8 md:space-y-10 md:pt-24 lg:pt-28">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {published.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 p-8 text-zinc-400">
            No projects published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {published.map((project, idx) => (
              <Card key={project.slug}>
                <div className="relative">
                  <Article project={project} views={views[project.slug] ?? 0} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
