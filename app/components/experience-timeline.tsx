"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

export type TimelineItem = {
  id: string;
  kind: "work" | "edu";
  org: string;
  title: string;
  when: string;
  side: "left" | "right";
  summary?: string;
  highlights?: string[];
  tech?: string[];
  logo?: StaticImageData;
};

export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const indexed = useMemo(() => items.map((it, i) => ({ ...it, _i: i })), [items]);
  const selected = useMemo(
    () => indexed.find((x) => x.id === selectedId) ?? null,
    [indexed, selectedId],
  );

  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [selectedId]);

  return (
    <section className="pt-10 md:pt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
          Experience
        </h2>
      </div>

      <div className="mt-8 md:mt-10">
        <div className="mx-auto max-w-6xl">
          <ol className="relative">
            {/* Continuous center pipe (desktop) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"
            />
            {indexed.map((item, idx) => {
              const fromX = item.side === "left" ? -48 : 48;

              const card = (
                <motion.div
                  initial={{ opacity: 0, x: fromX, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.04 }}
                >
                  <div className="w-full md:max-w-[460px] rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-4 md:p-5 transition hover:border-zinc-700 hover:bg-zinc-950/30 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className="w-full text-left group"
                    >
                      <div className="flex items-start gap-3">
                        {/* Logo placeholder */}
                        {item.logo ? (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40 p-1 overflow-hidden">
                            <Image
                              src={item.logo}
                              alt={`${item.org} logo`}
                              className="h-full w-full object-contain rounded-lg"
                              priority={idx < 2}
                            />
                          </div>
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40 text-[10px] font-semibold text-zinc-200/90">
                            {item.kind === "work" ? "CO" : "ED"}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <span className="inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-200">
                              {item.when}
                            </span>
                          </div>
                          <div className="mt-2 text-[15px] md:text-base font-semibold text-zinc-100 leading-snug">
                            {item.org}
                            <span className="text-zinc-500 font-normal"> {" | "} </span>
                            <span className="text-zinc-200/90 font-medium">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              );

              return (
                <li key={item.id} className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_72px_1fr] md:gap-6 items-center py-4 md:py-5">
                    {/* Left card */}
                    <div className="md:flex md:justify-end">
                      {item.side === "left" ? card : <div className="hidden md:block" />}
                    </div>

                    {/* Center line + dot */}
                    <div className="relative hidden md:flex justify-center">
                      <motion.span
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative z-10 mt-1.5 flex h-3 w-3 items-center justify-center"
                      >
                        <span className="absolute inset-0 rounded-full border border-indigo-400/60 bg-indigo-500/10" />
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                      </motion.span>
                    </div>

                    {/* Right card */}
                    <div>
                      {item.side === "right" ? (
                        <div className="mt-3 md:mt-0">{card}</div>
                      ) : (
                        <div className="hidden md:block" />
                      )}
                    </div>
                  </div>

                  {/* Mobile connector (compact) */}
                  <div className="md:hidden">
                    {idx !== indexed.length - 1 ? (
                      <div className="mx-auto h-4 w-px bg-gradient-to-b from-indigo-500/30 to-transparent" />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>

          <AnimatePresence>
            {selected ? (
              <motion.div
                key="timeline-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60]"
              >
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setSelectedId(null)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative mx-auto mt-[10vh] w-[min(720px,calc(100vw-2rem))] rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 md:p-6 shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {selected.logo ? (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40 p-1 overflow-hidden">
                          <Image
                            src={selected.logo}
                            alt={`${selected.org} logo`}
                            className="h-full w-full object-contain rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/40 text-xs font-semibold text-zinc-200/90">
                          {selected.kind === "work" ? "CO" : "ED"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-200">
                          {selected.when}
                        </div>
                        <div className="mt-2 text-lg md:text-xl font-semibold text-zinc-100 leading-snug">
                          {selected.org}
                        </div>
                        <div className="text-sm text-zinc-300/90">{selected.title}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Close modal"
                      onClick={() => setSelectedId(null)}
                      className="rounded-full border border-zinc-800 bg-zinc-950/40 p-2 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {selected.summary ? (
                    <p className="mt-4 text-sm leading-6 text-zinc-300/90">
                      {selected.summary}
                    </p>
                  ) : null}

                  {selected.highlights?.length ? (
                    <div className="mt-5">
                      <div className="text-xs font-semibold tracking-wide text-zinc-400">
                        Highlights
                      </div>
                      <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-zinc-200/90">
                        {selected.highlights.slice(0, 3).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {selected.tech?.length ? (
                    <div className="mt-5">
                      <div className="text-xs font-semibold tracking-wide text-zinc-400">
                        Tech
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selected.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] leading-5 text-zinc-200/90 border border-zinc-800 rounded-full px-3 py-0.5 bg-zinc-950/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


