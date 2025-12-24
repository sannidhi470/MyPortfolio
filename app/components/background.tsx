import React from "react";

/**
 * Global ambient background that sits on top of the base black body background.
 * Kept subtle so page-specific backgrounds (like the homepage aurora) can still override it.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* soft top glow */}
      <div className="absolute -top-56 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-cyan-500/10 blur-3xl" />
      {/* bottom-left glow */}
      <div className="absolute -bottom-64 left-[-10%] h-[640px] w-[640px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-3xl" />
      {/* right glow */}
      <div className="absolute top-[20%] right-[-12%] h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-orange-500/10 via-fuchsia-500/10 to-indigo-500/10 blur-3xl" />

      {/* subtle highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_55%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
}


