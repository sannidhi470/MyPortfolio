import type { NextPageContext } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  statusCode?: number;
};

export default function ErrorPage({ statusCode }: Props) {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 p-8">
        <div className="text-sm text-zinc-400">Something went wrong</div>
        <h1 className="mt-2 text-2xl font-semibold">Error {statusCode ?? ""}</h1>
        <p className="mt-3 text-zinc-400">
          An unexpected error occurred. Please try again, or go back home.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-950/30 px-4 py-2 text-sm text-zinc-200/90 hover:text-zinc-100 hover:border-zinc-500 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): Props => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};




