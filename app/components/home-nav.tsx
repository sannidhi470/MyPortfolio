"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

type Item = {
  label: string;
  id: string;
};

const DEFAULT_OFFSET_PX = 140;

export function HomeNavigation() {
  const items: Item[] = useMemo(
    () => [
      { label: "Projects", id: "projects" },
      { label: "Experience", id: "experience" },
      { label: "Skills", id: "skills" },
      { label: "Certifications", id: "certifications" },
      { label: "Recommendations", id: "recommendations" },
      { label: "Contact", id: "contact" },
    ],
    [],
  );

  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "projects");

  const computeActive = useCallback(() => {
    let best: { id: string; score: number } | null = null;
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      const score = DEFAULT_OFFSET_PX - top;
      if (score >= 0 && (best === null || score < best.score)) {
        best = { id: it.id, score };
      }
    }
    setActiveId(best?.id ?? (items[0]?.id ?? "projects"));
  }, [items]);

  useEffect(() => {
    // Prevent "refresh resumes at old scroll position" on the home page.
    // If the page is reloaded, force top and clear any hash from prior tab clicks.
    try {
      const navEntry = performance.getEntriesByType?.("navigation")?.[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (navEntry?.type === "reload") {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
          );
        }
      }
    } catch {
      // ignore
    }

    // init from hash if present (fresh deep links)
    const hash = window.location.hash?.replace("#", "");
    if (hash && items.some((i) => i.id === hash)) {
      setActiveId(hash);
    } else {
      computeActive();
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [computeActive, items]);

  const onClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="my-8 md:my-10 animate-fade-in">
      <div className="mx-auto w-fit rounded-2xl border border-zinc-800/80 bg-zinc-950/20 backdrop-blur px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <ul className="flex flex-wrap items-center justify-center gap-1">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onClick(item.id)}
                  className={[
                    "px-4 py-2 rounded-xl text-sm md:text-base font-medium transition",
                    active
                      ? "text-zinc-100 bg-white/10 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                      : "text-zinc-300 hover:text-zinc-100 hover:bg-white/5",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}


