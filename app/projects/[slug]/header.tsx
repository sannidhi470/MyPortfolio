"use client";
import { ArrowLeft, Eye, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
	};

	views: number;
};
export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden"
		>
			{/* subtle page-specific glow (matches global aesthetic, but keeps header readable) */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-44 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-indigo-500/15 to-cyan-500/15 blur-3xl" />
				<div className="absolute -bottom-52 left-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-3xl" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
			</div>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/70 border-zinc-800"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${
								isIntersecting
									? " text-zinc-400 hover:text-zinc-100"
									: "text-zinc-300 hover:text-white"
							} `}
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
						<Link target="_blank" href="https://linkedin.com/in/sannidhishetty9">
							<Linkedin
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-300 hover:text-white"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/sannidhi470">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-300 hover:text-white"
								} `}
							/>
						</Link>
					</div>

					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-300 hover:text-white"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{project.description}
						</p>
					</div>

					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<Link
									target="_blank"
									key={link.label}
									href={link.href}
									className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/30 px-4 py-2 text-sm text-zinc-200 hover:text-white hover:border-zinc-600 transition"
								>
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
