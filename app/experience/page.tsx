import React from "react";
import { Navigation } from "../components/nav";

export const revalidate = 60;

export default function ExperiencePage() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-5xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
						Experience
					</h1>
					<p className="mt-4 text-zinc-400">
						Recent roles and the kind of impact I’ve delivered.
					</p>
				</div>

				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-4">
					{[
						{
							role: "Software Developer",
							company: "Kampus Media",
							location: "Montreal, Canada",
							dates: "May 2025 – Present",
							highlights: [
								"Building and maintaining an end-to-end audiobook pipeline with Java/Spring Boot, Node.js, and Angular.",
								"Architecting AWS infrastructure (Lambda, S3, API Gateway, DynamoDB) for scalable REST APIs.",
								"Implementing monitoring/telemetry (Grafana), performance tuning, and CI/CD for resiliency.",
								"Integrating AI model APIs for text extraction and chapter detection improvements.",
							],
						},
						{
							role: "Backend Developer",
							company: "Deloitte",
							location: "Bangalore, India",
							dates: "Mar 2022 – Aug 2023",
							highlights: [
								"Developed and enhanced enterprise web applications using Java 8 and Spring Boot (microservices).",
								"Built and tested REST APIs with MySQL integration and strong unit test coverage.",
								"Migrated backend services to AWS to improve scalability and integration.",
								"Deployed microservices on Kubernetes for fault isolation and scale.",
							],
						},
						{
							role: "Software Engineer",
							company: "Newgen Software",
							location: "Mumbai, India",
							dates: "Aug 2020 – Feb 2022",
							highlights: [
								"Revamped a bank account opening platform with React.js, TypeScript, and Java.",
								"Built Kafka/MQ-based real-time pipelines for reliable service-to-service communication.",
								"Streamlined CI/CD automation on Jenkins and improved release cycles.",
								"Optimized PostgreSQL schemas and queries to improve throughput and latency.",
							],
						},
					].map((job) => (
						<div
							key={`${job.company}-${job.role}`}
							className="rounded-xl border border-zinc-700/70 bg-zinc-900/30 p-5"
						>
							<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
								<div>
									<div className="text-zinc-100 font-medium">
										{job.role} · {job.company}
									</div>
									<div className="text-sm text-zinc-400">{job.location}</div>
								</div>
								<div className="text-sm text-zinc-400">{job.dates}</div>
							</div>
							<ul className="mt-4 list-disc pl-5 text-sm text-zinc-300 space-y-1">
								{job.highlights.map((h) => (
									<li key={h}>{h}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}


