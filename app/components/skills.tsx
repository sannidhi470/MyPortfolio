import React from "react";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layout,
  Layers,
  Monitor,
  ShieldCheck,
  TestTube2,
  Wrench,
} from "lucide-react";

type Skill = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  tone?: "indigo" | "emerald" | "amber" | "cyan" | "fuchsia" | "orange";
};

function toneClasses(tone: Skill["tone"]) {
  switch (tone) {
    case "emerald":
      return "text-emerald-200 bg-emerald-500/10 border-emerald-400/20";
    case "amber":
      return "text-amber-200 bg-amber-500/10 border-amber-400/20";
    case "cyan":
      return "text-cyan-200 bg-cyan-500/10 border-cyan-400/20";
    case "fuchsia":
      return "text-fuchsia-200 bg-fuchsia-500/10 border-fuchsia-400/20";
    case "orange":
      return "text-orange-200 bg-orange-500/10 border-orange-400/20";
    case "indigo":
    default:
      return "text-indigo-200 bg-indigo-500/10 border-indigo-400/20";
  }
}

function SkillItem({ skill }: { skill: Skill }) {
  const Icon = skill.Icon;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "h-12 w-12 rounded-2xl border flex items-center justify-center",
          "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
          toneClasses(skill.tone),
        ].join(" ")}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-xs md:text-sm text-zinc-200/90">{skill.name}</div>
    </div>
  );
}

function SkillCard({
  title,
  skills,
}: {
  title: string;
  skills: Skill[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="text-center text-2xl md:text-3xl font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-cyan-200 to-fuchsia-200">
        {title}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-6 md:gap-x-10 md:gap-y-8">
        {skills.map((s) => (
          <SkillItem key={s.name} skill={s} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  // Source: Sannidhi_Resume.pdf (Technical Skills)
  const backend: Skill[] = [
    { name: "Java", Icon: Braces, tone: "amber" },
    { name: "Spring Boot", Icon: Layers, tone: "emerald" },
    { name: "Python", Icon: Braces, tone: "emerald" },
    { name: "AWS", Icon: Cloud, tone: "amber" },
    { name: "PostgreSQL", Icon: Database, tone: "indigo" },
    { name: "MongoDB", Icon: Database, tone: "emerald" },
  ];

  const frontend: Skill[] = [
    { name: "HTML", Icon: Code2, tone: "amber" },
    { name: "CSS", Icon: Layout, tone: "cyan" },
    { name: "JavaScript", Icon: Code2, tone: "amber" },
    { name: "TypeScript", Icon: Code2, tone: "indigo" },
    { name: "React", Icon: Monitor, tone: "cyan" },
    { name: "Tailwind", Icon: Wrench, tone: "fuchsia" },
  ];

  const testing: Skill[] = [
    { name: "JUnit", Icon: TestTube2, tone: "indigo" },
    { name: "Mockito", Icon: ShieldCheck, tone: "emerald" },
    { name: "Pytest", Icon: TestTube2, tone: "amber" },
    { name: "Jest", Icon: TestTube2, tone: "fuchsia" },
    { name: "Postman", Icon: Globe, tone: "orange" },
    { name: "JMeter", Icon: TestTube2, tone: "cyan" },
  ];

  const tools: Skill[] = [
    { name: "Git", Icon: GitBranch, tone: "amber" },
    { name: "Docker", Icon: Cloud, tone: "cyan" },
    { name: "Jira", Icon: Wrench, tone: "emerald" },
    { name: "IntelliJ", Icon: Code2, tone: "fuchsia" },
    { name: "VS Code", Icon: Monitor, tone: "cyan" },
    { name: "Redis", Icon: Database, tone: "orange" },
  ];

  return (
    <section id="skills" className="scroll-mt-24 pt-14 md:pt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
          Skills
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <SkillCard title="Backend" skills={backend} />
        <SkillCard title="Frontend" skills={frontend} />
        <SkillCard title="Testing" skills={testing} />
        <SkillCard title="Tools" skills={tools} />
      </div>
    </section>
  );
}


