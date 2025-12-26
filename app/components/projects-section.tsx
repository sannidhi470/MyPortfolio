import Link from "next/link";
import React from "react";
import {
  BrainCircuit,
  ExternalLink,
  Github,
  Layout,
  Shield,
  Sparkles,
} from "lucide-react";

type Project = {
  title: string;
  description: string;
  repository: string; // owner/repo
  liveUrl?: string;
  accent: "indigo" | "cyan" | "fuchsia" | "emerald";
  Icon: React.ComponentType<{ className?: string }>;
};

const PROJECTS: Project[] = [
  {
    title: "Habit Tracker",
    description:
      "Full-stack habit tracking platform with a React (Vite) SPA and Spring Boot REST APIs secured with JWT, backed by PostgreSQL and deployed with Docker.",
    repository: "sannidhi470/HabitTracker",
    liveUrl: "https://habit-tracker-sooty-nine.vercel.app",
    accent: "indigo",
    Icon: Shield,
  },
  {
    title: "My Portfolio",
    description:
      "My personal portfolio website built with Next.js + React + Tailwind, featuring projects, experience, certifications, and contact.",
    repository: "sannidhi470/MyPortfolio",
    accent: "emerald",
    Icon: Layout,
  },
  {
    title: "Warzone (Risk Game)",
    description:
      "Command-line Risk game in Core Java implementing map management, order execution, and gameplay logic with multiple design patterns and JUnit tests.",
    repository: "sannidhi470/Defenders",
    accent: "cyan",
    Icon: Sparkles,
  },
  {
    title: "Sign Language Gesture Recognition",
    description:
      "Real-time gesture recognition using CNNs and transfer learning, trained and evaluated across multiple architectures to achieve high accuracy on hand-gesture datasets.",
    repository: "daivik1515/Sign-Language-Gesture-Classification",
    accent: "fuchsia",
    Icon: BrainCircuit,
  },
];

function accentClasses(accent: Project["accent"]) {
  switch (accent) {
    case "emerald":
      return {
        ring: "border-emerald-400/15",
        glow: "from-emerald-500/20 via-cyan-500/10 to-indigo-500/10",
        badge: "text-emerald-200 bg-emerald-500/10 border-emerald-400/20",
        icon: "text-emerald-200",
      };
    case "cyan":
      return {
        ring: "border-cyan-400/15",
        glow: "from-cyan-500/20 via-indigo-500/10 to-fuchsia-500/10",
        badge: "text-cyan-200 bg-cyan-500/10 border-cyan-400/20",
        icon: "text-cyan-200",
      };
    case "fuchsia":
      return {
        ring: "border-fuchsia-400/15",
        glow: "from-fuchsia-500/20 via-indigo-500/10 to-cyan-500/10",
        badge: "text-fuchsia-200 bg-fuchsia-500/10 border-fuchsia-400/20",
        icon: "text-fuchsia-200",
      };
    case "indigo":
    default:
      return {
        ring: "border-indigo-400/15",
        glow: "from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/10",
        badge: "text-indigo-200 bg-indigo-500/10 border-indigo-400/20",
        icon: "text-indigo-200",
      };
  }
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 pt-12 md:pt-14">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
          Projects
        </h2>
      </div>

      <div className="mt-10 space-y-6 md:space-y-8">
        {PROJECTS.map((p, i) => {
          const a = accentClasses(p.accent);
          const href = `https://github.com/${p.repository}`;
          const Icon = p.Icon;
          const reverse = i % 2 === 1;

          return (
            <div
              key={p.repository}
              className={[
                "rounded-3xl border bg-zinc-950/20 shadow-[0_20px_70px_rgba(0,0,0,0.45)] overflow-hidden",
                "border-zinc-800/80",
              ].join(" ")}
            >
              <div
                className={[
                  "grid grid-cols-1 md:grid-cols-2 gap-0",
                  reverse ? "md:[&>*:first-child]:order-2" : "",
                ].join(" ")}
              >
                {/* Visual panel */}
                <div className="relative min-h-[200px] md:min-h-[260px]">
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute inset-0",
                      "bg-gradient-to-br",
                      a.glow,
                    ].join(" ")}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]"
                  />
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute inset-0 border",
                      a.ring,
                    ].join(" ")}
                  />

                  <div className="relative h-full w-full p-6 md:p-8 flex items-end">
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          "h-12 w-12 rounded-2xl border flex items-center justify-center bg-zinc-950/20",
                          a.badge,
                        ].join(" ")}
                      >
                        <Icon className={["h-6 w-6", a.icon].join(" ")} />
                      </div>
                      <div className="text-zinc-100 font-semibold text-lg md:text-xl">
                        {p.title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="text-zinc-100 font-semibold text-xl md:text-2xl font-display">
                    {p.title}
                  </div>
                  <p className="mt-3 text-sm md:text-base text-zinc-300/90 leading-6">
                    {p.description}
                  </p>

                  <div className="mt-5">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={href}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700/80 bg-zinc-950/20 px-5 py-2.5 text-sm font-semibold text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
                      >
                        <Github className="h-5 w-5" />
                        GitHub Repo
                      </Link>

                      {p.liveUrl ? (
                        <Link
                          href={p.liveUrl}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Live
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



