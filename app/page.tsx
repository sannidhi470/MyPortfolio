import Link from "next/link";
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Resume", href: "/Sannidhi_Resume.pdf" },
];

export default function Home() {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Aurora / animated glow layer */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/25 via-indigo-500/20 to-cyan-500/20 blur-3xl animate-aurora" />
        <div className="absolute -bottom-64 left-[10%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-3xl animate-blob" />
        <div className="absolute top-[18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-orange-500/10 via-fuchsia-500/10 to-indigo-500/10 blur-3xl animate-blob [animation-delay:6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <nav className="my-8 md:my-10 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.href.endsWith(".pdf") ? "_blank" : undefined}
              className="text-base md:text-lg duration-500 text-zinc-300 hover:text-zinc-100"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <main className="px-6 pb-10 mx-auto max-w-6xl">
        <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/40 to-zinc-300/0" />

        {/* Single-screen layout (desktop): hero + skills + education */}
        <section className="min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-160px)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 md:py-10">
          {/* Hero */}
          <div className="md:col-span-6 lg:col-span-7 text-center md:text-left">
            <h1 className="z-10 text-4xl sm:text-6xl md:text-7xl font-display whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-indigo-200 to-cyan-200 text-edge-outline animate-title [text-shadow:0_0_28px_rgba(99,102,241,0.18)]">
                Sannidhi Shetty
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg leading-7 text-zinc-300/90 max-w-xl mx-auto md:mx-0">
              Full Stack Developer (Java/Spring Boot, Node.js, TypeScript) building
              reliable systems and clean UI. Based in Montreal, Canada.
            </p>

            <div
              id="contact"
              className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <Link
                href="mailto:sannidhishetty9@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-950/30 px-4 py-2 text-sm text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
              >
                <Mail className="h-4 w-4" />
                Email
              </Link>
              <Link
                href="https://linkedin.com/in/sannidhishetty9"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-950/30 px-4 py-2 text-sm text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/sannidhi470"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-950/30 px-4 py-2 text-sm text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-950/30 p-5 md:p-7">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 font-display">
                  Skills
                </h2>
                <span className="text-xs text-zinc-500">Quick snapshot</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Languages",
                    items: ["TypeScript", "JavaScript", "Java", "Python", "SQL"],
                  },
                  {
                    label: "Backend",
                    items: ["Spring Boot", "Node.js", "Express", "REST", "GraphQL"],
                  },
                  {
                    label: "Frontend",
                    items: ["React", "Angular", "Vue", "Tailwind"],
                  },
                  {
                    label: "Cloud/DevOps",
                    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Kafka"],
                  },
                ].map((group) => (
                  <div key={group.label} className="min-w-0">
                    <div className="text-sm font-medium text-zinc-200/90">
                      {group.label}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs leading-6 text-zinc-200/95 border border-zinc-700/80 rounded-full px-3 py-0.5 bg-zinc-950/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-950/30 p-5 md:p-7">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 font-display">
                Education
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-medium text-zinc-200">
                      Concordia University
                    </div>
                    <div className="text-sm text-zinc-400">
                      M.S., Applied Computer Science · Montreal, Canada
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500 whitespace-nowrap">
                    2023–2025
                  </div>
                </div>

                <div className="h-px bg-zinc-800/70" />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-medium text-zinc-200">
                      SIES Graduate School of Technology
                    </div>
                    <div className="text-sm text-zinc-400">
                      B.E., Computer Engineering · Mumbai, India
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500 whitespace-nowrap">
                    2016–2020
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/40 to-zinc-300/0" />
      </main>
    </div>
  );

}
