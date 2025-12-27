import Link from "next/link";
import React from "react";
import { Quote } from "lucide-react";

type Recommendation = {
  name: string;
  title: string;
  date: string;
  context?: string;
  text: string;
};

const RECOMMENDATIONS: Recommendation[] = [
  {
    name: "Ankit Patni",
    title: "Manager at Deloitte, CSM",
    date: "September 16, 2023",
    context: "Ankit managed Sannidhi directly",
    text:
      'I highly recommend Sannidhi for her exceptional problem solving abilities. She was always willing to collaborate and support her colleagues, fostering a positive and collaborative work environment. In a short span of time she built a strong reputation with the Client. It was great to hear from the client "we have requirement of another role but we need someone like Sannidhi".\n\nShe was able to quickly learn and adapt to new technologies/tools, making her a valuable asset in a rapidly evolving field. During her time with the company, she consistently demonstrated exceptional attention to detail.',
  },
  {
    name: "Eileen Hirsch",
    title:
      "Manager of Software Development, Engineering and Services at Northwell Health",
    date: "September 6, 2023",
    context: "Eileen managed Sannidhi directly",
    text:
      "As a Deloitte consultant Sannidhi reported directly to me working on the Northwell Health Revenue Cycle Robitic Processing Automation team. Sannidhi from day 1 of training was eager and engeretic to learn our Python-like programming language as well our the host systems we develop against. Sannidhi was never afraid to ask questions when she had a doubt, and always worked hard to complete her assignments on time. It was a pleasure to work with her, and is always welcome back. She will be a welcome addition to any team.",
  },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export function RecommendationsSection() {
  return (
    <section id="recommendations" className="scroll-mt-24 pt-14 md:pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Recommendations
          </h2>
          <p className="mt-3 text-sm md:text-base text-zinc-300/80">
            Kind words from managers and collaborators on LinkedIn.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/20 p-6 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          {/* subtle glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/12 via-indigo-500/10 to-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-emerald-500/8 via-cyan-500/8 to-indigo-500/8 blur-3xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {RECOMMENDATIONS.map((r) => (
              <figure
                key={r.name}
                className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/20 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-200 font-semibold">
                    {initials(r.name)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-base font-semibold text-zinc-100">
                          {r.name}
                        </div>
                        <div className="mt-0.5 text-sm text-zinc-400 truncate">
                          {r.title}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          {r.date}
                          {r.context ? ` · ${r.context}` : ""}
                        </div>
                      </div>
                      <Quote className="h-6 w-6 text-zinc-600/80 shrink-0" />
                    </div>

                    <blockquote className="mt-4 space-y-4 text-sm md:text-[15px] leading-7 text-zinc-200/90">
                      {r.text.split("\n\n").map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </blockquote>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Link
              href="https://linkedin.com/in/sannidhishetty9"
              target="_blank"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-950/20 px-6 py-3 text-sm font-semibold text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
            >
              View more on LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


