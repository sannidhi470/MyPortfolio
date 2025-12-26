import React from "react";

type Skill = {
  name: string;
  logoSrc: string;
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
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "h-12 w-12 rounded-2xl border flex items-center justify-center",
          "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
          toneClasses(skill.tone),
        ].join(" ")}
      >
        <img
          src={skill.logoSrc}
          alt={`${skill.name} logo`}
          title={skill.name}
          className="h-6 w-6 object-contain"
          loading="lazy"
          decoding="async"
        />
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
    { name: "Java", logoSrc: "https://cdn.simpleicons.org/openjdk/ffffff", tone: "amber" },
    { name: "Spring Boot", logoSrc: "https://cdn.simpleicons.org/springboot/ffffff", tone: "emerald" },
    { name: "Python", logoSrc: "https://cdn.simpleicons.org/python/ffffff", tone: "emerald" },
    {
      name: "AWS",
      logoSrc:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      tone: "amber",
    },
    { name: "PostgreSQL", logoSrc: "https://cdn.simpleicons.org/postgresql/ffffff", tone: "indigo" },
    { name: "MongoDB", logoSrc: "https://cdn.simpleicons.org/mongodb/ffffff", tone: "emerald" },
  ];

  const frontend: Skill[] = [
    { name: "HTML", logoSrc: "https://cdn.simpleicons.org/html5/ffffff", tone: "amber" },
    { name: "CSS", logoSrc: "https://cdn.simpleicons.org/css/ffffff", tone: "cyan" },
    { name: "JavaScript", logoSrc: "https://cdn.simpleicons.org/javascript/ffffff", tone: "amber" },
    { name: "TypeScript", logoSrc: "https://cdn.simpleicons.org/typescript/ffffff", tone: "indigo" },
    { name: "React", logoSrc: "https://cdn.simpleicons.org/react/ffffff", tone: "cyan" },
    { name: "Tailwind", logoSrc: "https://cdn.simpleicons.org/tailwindcss/ffffff", tone: "fuchsia" },
  ];

  const testing: Skill[] = [
    { name: "JUnit", logoSrc: "https://cdn.simpleicons.org/junit5/ffffff", tone: "indigo" },
    {
      name: "Mockito",
      logoSrc:
        "https://cdn.jsdelivr.net/gh/mockito/mockito@main/config/javadoc/resources/org/mockito/logo.png",
      tone: "emerald",
    },
    { name: "Pytest", logoSrc: "https://cdn.simpleicons.org/pytest/ffffff", tone: "amber" },
    { name: "Jest", logoSrc: "https://cdn.simpleicons.org/jest/ffffff", tone: "fuchsia" },
    { name: "Postman", logoSrc: "https://cdn.simpleicons.org/postman/ffffff", tone: "orange" },
    { name: "JMeter", logoSrc: "https://cdn.simpleicons.org/apachejmeter/ffffff", tone: "cyan" },
  ];

  const tools: Skill[] = [
    { name: "Git", logoSrc: "https://cdn.simpleicons.org/git/ffffff", tone: "amber" },
    { name: "Docker", logoSrc: "https://cdn.simpleicons.org/docker/ffffff", tone: "cyan" },
    { name: "Jira", logoSrc: "https://cdn.simpleicons.org/jira/ffffff", tone: "emerald" },
    { name: "IntelliJ", logoSrc: "https://cdn.simpleicons.org/intellijidea/ffffff", tone: "fuchsia" },
    {
      name: "VS Code",
      logoSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/vscode/vscode-original.svg",
      tone: "cyan",
    },
    { name: "Redis", logoSrc: "https://cdn.simpleicons.org/redis/ffffff", tone: "orange" },
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


