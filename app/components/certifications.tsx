"use client";

import React, { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import AzureCertScreenshot from "../../Screenshot 2025-12-26 at 12.22.13 pm.png";
import AwsCertScreenshot from "../../Screenshot 2025-12-26 at 12.34.03 pm.png";

type Cert = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  skills: string[];
  image?: StaticImageData;
  imageScale?: number;
  verifyUrl?: string;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700/70 bg-zinc-950/30 px-3 py-1 text-xs text-zinc-200/90">
      {children}
    </span>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
      {children}
    </div>
  );
}

export function CertificationsSection() {
  const certs: Cert[] = useMemo(
    () => [
      {
        id: "aws-saa",
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services Training and Certification",
        issued: "Nov 02, 2025",
        expires: "Nov 02, 2028",
        skills: [
          "Amazon Web Services",
          "AWS",
          "AWS Certification",
          "AWS Cloud",
          "Cloud Architecture",
          "Cloud Infrastructure",
          "Cloud Services",
        ],
        image: AwsCertScreenshot,
        imageScale: 1.12,
      },
      {
        id: "azure-fundamentals",
        title: "Microsoft Certified: Azure Fundamentals",
        issuer: "Microsoft",
        issued: "June 24, 2022",
        skills: [
          "Azure",
          "Cloud Data",
          "Cloud Networking",
          "Cloud Security",
          "Cloud Services",
          "Cloud Storage",
          "Virtualization",
        ],
        image: AzureCertScreenshot,
        imageScale: 1.0,
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const active = certs[idx]!;

  const prev = () => setIdx((i) => (i - 1 + certs.length) % certs.length);
  const next = () => setIdx((i) => (i + 1) % certs.length);

  return (
    <section id="certifications" className="scroll-mt-24 pt-14 md:pt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
          Certifications
        </h2>
      </div>

      <div className="mt-10">
        <div className="relative mx-auto max-w-6xl">
          <Frame>
            <div className="relative">
              <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-800/70 bg-zinc-950/20">
                <div className="min-w-0">
                  <div className="truncate text-sm md:text-base text-zinc-200/90 font-medium">
                    {active.title}
                  </div>
                  <div className="truncate text-xs md:text-sm text-zinc-500">
                    {active.issuer} · Issued {active.issued}
                    {active.expires ? ` · Expires ${active.expires}` : ""}
                  </div>
                </div>
                {active.verifyUrl ? (
                  <a
                    href={active.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-4 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-200/90 hover:border-zinc-700 hover:text-zinc-100 transition"
                  >
                    Verify <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <div className="relative w-full bg-white">
                {/* Image slide */}
                {active.image ? (
                  <div className="relative w-full aspect-[16/7] overflow-hidden">
                    <Image
                      src={active.image}
                      alt={`${active.title} certificate`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 95vw, 1100px"
                      style={{
                        transform: `scale(${active.imageScale ?? 1})`,
                        transformOrigin: "center",
                      }}
                      priority
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Frame>

          {/* arrows */}
          <button
            type="button"
            aria-label="Previous certification"
            onClick={prev}
            className="hidden md:inline-flex absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-200 hover:text-zinc-50 hover:border-zinc-700 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next certification"
            onClick={next}
            className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-200 hover:text-zinc-50 hover:border-zinc-700 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* dots */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {certs.map((c, i) => (
              <button
                key={c.id}
                type="button"
                aria-label={`Show ${c.title}`}
                onClick={() => setIdx(i)}
                className={[
                  "h-3 w-3 rounded-full transition",
                  i === idx ? "bg-indigo-300" : "bg-zinc-600 hover:bg-zinc-400",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


