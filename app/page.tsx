import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { ExperienceTimeline, type TimelineItem } from "./components/experience-timeline";
import { SkillsSection } from "./components/skills";
import { CertificationsSection } from "./components/certifications";
import { ContactSection } from "./components/contact-section";
import { ProjectsSection } from "./components/projects-section";
import { HomeNavigation } from "./components/home-nav";
import ConcordiaLogo from "../CONCORDIA.png";
import KampusMediaLogo from "../KAMPUS MEDIA.png";
import NewgenLogo from "../NEWGEN.png";
import SiesLogo from "../SIES.png";
import DeloitteLogo from "../Screenshot 2025-12-26 at 10.40.37 am.png";
import Image from "next/image";
import ProfilePhoto from "../1739052285758.jpeg";

export default function Home() {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      {/* Aurora / animated glow layer */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/25 via-indigo-500/20 to-cyan-500/20 blur-3xl animate-aurora" />
        <div className="absolute -bottom-64 left-[10%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-3xl animate-blob" />
        <div className="absolute top-[18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-orange-500/10 via-fuchsia-500/10 to-indigo-500/10 blur-3xl animate-blob [animation-delay:6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <HomeNavigation />

      <main className="px-6 pb-16 mx-auto max-w-6xl">
        <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/40 to-zinc-300/0" />

        {/* Hero */}
        <section className="md:min-h-[calc(100vh-160px)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-5 md:py-8">
          {/* Hero */}
          <div className="md:col-span-6 lg:col-span-7 text-center md:text-left">
            <h1 className="z-10 text-4xl sm:text-6xl md:text-7xl font-display whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-indigo-200 to-cyan-200 text-edge-outline animate-title [text-shadow:0_0_28px_rgba(99,102,241,0.18)]">
                Sannidhi Shetty
              </span>
            </h1>
            <div className="mt-6 space-y-4 max-w-2xl mx-auto md:mx-0">
              <p className="text-base md:text-lg leading-7 text-zinc-300/90">
                I am a Full-Stack Software Engineer with over 4 years of experience
                building modern, scalable web applications. Always curious and
                experimenting with new tech, I enjoy creating software that truly
                helps users and businesses.
              </p>
              <p className="text-base md:text-lg leading-7 text-zinc-300/90">
                I love crafting smooth user experiences, designing robust backend
                systems, and seeing projects evolve from “just a concept” to fully
                production-ready systems. Driven by a passion for building reliable,
                user-focused applications, I excel at tackling challenging problems
                and turning ideas into real-world solutions that make a difference.
              </p>
            </div>

            <div className="mt-8 max-w-2xl mx-auto md:mx-0">
              <Link
                href="/Sannidhi_Resume.pdf"
                target="_blank"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Link>
            </div>

            <div className="mt-10 max-w-2xl mx-auto md:mx-0">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-950/20 px-7 py-3 text-sm md:text-base font-semibold text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950/40 p-3 md:p-4 border border-zinc-900/80">
              {/* subtle glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <div className="absolute -top-24 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/15 via-indigo-500/12 to-cyan-500/12 blur-3xl" />
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black">
                <Image
                  src={ProfilePhoto}
                  alt="Portrait"
                  priority
                  quality={95}
                  placeholder="blur"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 460px"
                  className="h-full w-full object-cover object-center rounded-2xl scale-[1.02] transform-gpu"
                />
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />

        <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/40 to-zinc-300/0" />

        {/* Experience + Education timeline (scrollable) */}
        <section id="experience" className="scroll-mt-24">
          <ExperienceTimeline
            items={
              [
              {
                id: "kampus-2025",
                kind: "work",
                org: "Kampus Media",
                title: "Software Developer",
                when: "May 2025 – Present",
                side: "right",
                logo: KampusMediaLogo,
                summary:
                  "Kampus Media is a company with a digital repository of ethically modeled voices, making high‑quality audio easier to access for audiobook production and distribution.\n\nIn this role, I’m building an end-to-end platform that transforms multilingual documents into finished audiobooks. I own both the user experience and the backend workflow, with a focus on reliability, security, and consistent delivery at scale. I collaborate closely with leadership—sharing progress through demos and regular updates—which has strengthened my communication, ownership, and product thinking. The work continues to broaden my technical range and deepen how I design scalable, production-ready systems.",
                tech: [
                  "React",
                  "TypeScript",
                  "Cloudflare Workers",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                ],
              },
              {
                id: "concordia-2023",
                kind: "edu",
                org: "Concordia University",
                title: "M.S., Applied Computer Science",
                when: "Sept 2023 – Apr 2025",
                side: "left",
                logo: ConcordiaLogo,
                summary:
                  "With a strong foundation in backend development, I pursued a Master’s degree in Applied Computer Science to broaden my skill set and transition into a full-stack role. Exposure to modern frontend technologies during this journey sparked a growing interest in building complete, user-facing solutions alongside robust backend systems. This advanced degree has strengthened my ability to design and manage complex, end-to-end software projects, reflecting my commitment to continuous learning and my ambition to excel across all areas of software engineering.",
              },
              {
                id: "deloitte-2022",
                kind: "work",
                org: "Deloitte",
                title: "Full Stack Developer",
                when: "Mar 2022 – Aug 2023",
                side: "right",
                logo: DeloitteLogo,
                summary:
                  "I worked as a Full-Stack Developer on two major US-based enterprise projects for Northwell Health (healthcare) and Kroger (e-commerce), collaborating closely with client stakeholders to understand real-world business and domain requirements. I leveraged Java and Spring Boot to design, develop, and test scalable RESTful APIs within a microservices architecture, supporting the modernization of legacy systems and their transition to a cloud-native environment. This role strengthened my Java expertise and provided hands-on experience with AWS, Docker-based deployments, and CI/CD pipeline maintenance, enabling the delivery of reliable, production-ready solutions.",
                tech: ["Java 8", "Spring Boot", "MySQL", "AWS", "Docker", "JUnit"],
              },
              {
                id: "newgen-2020",
                kind: "work",
                org: "Newgen Software",
                title: "Software Engineer",
                when: "Aug 2020 – Feb 2022",
                side: "left",
                logo: NewgenLogo,
                summary:
                  "Revamped a bank account opening platform using React, TypeScript, and Java by actively addressing evolving client change requests and translating business requirements into functional enhancements. Enhanced and extended multiple account opening forms, introduced new UI components and action buttons, and implemented additional client-side and server-side validations to improve data accuracy and overall user experience. Gained hands-on experience with Kafka and MQ for real-time inter-service communication, PostgreSQL and Oracle database management, and CI/CD automation using Jenkins to streamline deployments.",
                tech: ["React", "TypeScript", "Java", "Kafka", "Jenkins", "PostgreSQL"],
              },
              {
                id: "sies-2016",
                kind: "edu",
                org: "SIES Graduate School of Technology",
                title: "B.Tech., Computer Science and Engineering",
                when: "Feb 2016 – Oct 2020",
                side: "right",
                logo: SiesLogo,
                summary:
                  "I completed my Bachelor of Technology in Computer Science and Engineering, building a strong foundation in core areas such as databases, networks, operating systems, algorithms and data structures, and software engineering. During my final year, I worked on two major projects: a sentiment analysis system for code-mixed movie reviews using a WordNet-based approach, and a COVID-19 data analysis project utilizing datasets published by Johns Hopkins University. These experiences not only strengthened my technical skills but also fueled my interest in applying computer science concepts to solve real-world problems.",
              },
              ] as TimelineItem[]
            }
          />
        </section>

        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </div>
  );

}
