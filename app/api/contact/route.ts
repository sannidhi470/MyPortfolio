import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

type ContactPayload = {
	firstName?: string;
	lastName?: string;
	email?: string;
	message?: string;
	// Honeypot (should be empty). Bots often fill it.
	company?: string;
};

function isNonEmptyString(v: unknown): v is string {
	return typeof v === "string" && v.trim().length > 0;
}

function normalizeOneLine(v: string) {
	return v.replace(/\s+/g, " ").trim();
}

function sha256Hex(value: string) {
	return createHash("sha256").update(value).digest("hex");
}

function getClientIp(request: Request) {
	const xff = request.headers.get("x-forwarded-for");
	if (xff) return xff.split(",")[0]?.trim();
	const xri = request.headers.get("x-real-ip");
	if (xri) return xri.trim();
	return undefined;
}

async function applyRateLimit(request: Request) {
	const hasUpstashEnv =
		!!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
	if (!hasUpstashEnv) return { ok: true as const };

	let redis: Redis;
	try {
		redis = Redis.fromEnv();
	} catch {
		return { ok: true as const };
	}

	const ip = getClientIp(request);
	if (!ip) return { ok: true as const };

	// 5 requests / 10 minutes per (hashed) IP.
	const windowSeconds = 10 * 60;
	const limit = 5;
	const key = ["ratelimit", "contact", sha256Hex(ip)].join(":");

	const count = await redis.incr(key);
	if (count === 1) {
		await redis.expire(key, windowSeconds);
	}

	if (count > limit) {
		return { ok: false as const };
	}
	return { ok: true as const };
}

export async function POST(request: Request) {
	const contentType = request.headers.get("content-type") ?? "";
	if (!contentType.includes("application/json")) {
		return NextResponse.json(
			{ ok: false, error: "must_be_json" },
			{ status: 400 },
		);
	}

	const body = (await request.json().catch(() => null)) as ContactPayload | null;
	if (!body) {
		return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
	}

	// Honeypot triggered -> pretend success.
	if (isNonEmptyString(body.company)) {
		return NextResponse.json(
			{ ok: true, sent: false, reason: "honeypot" },
			{ status: 202 },
		);
	}

	if (!isNonEmptyString(body.email) || !isNonEmptyString(body.message)) {
		return NextResponse.json(
			{ ok: false, error: "missing_fields" },
			{ status: 400 },
		);
	}

	const email = normalizeOneLine(body.email);
	const message = body.message.trim();
	const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
	const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";

	if (email.length > 254 || !email.includes("@")) {
		return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
	}
	if (message.length < 2 || message.length > 5000) {
		return NextResponse.json(
			{ ok: false, error: "invalid_message_length" },
			{ status: 400 },
		);
	}

	const rl = await applyRateLimit(request);
	if (!rl.ok) {
		return NextResponse.json(
			{ ok: false, error: "rate_limited" },
			{ status: 429 },
		);
	}

	const resendApiKey = process.env.RESEND_API_KEY;
	if (!resendApiKey) {
		// Allow the site to run without email configured.
		return NextResponse.json(
			{ ok: true, sent: false, reason: "not_configured" },
			{ status: 202 },
		);
	}

	const to = process.env.CONTACT_TO_EMAIL ?? "sannidhishetty9@gmail.com";
	const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

	const name = normalizeOneLine(`${firstName} ${lastName}`.trim());
	const subject = `Portfolio contact${name ? ` from ${name}` : ""}`;
	const text = [
		`Name: ${name || "-"}`,
		`Email: ${email}`,
		"",
		"Message:",
		message,
	].join("\n");

	const resp = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from,
			to,
			subject,
			text,
			reply_to: email,
		}),
	});

	if (!resp.ok) {
		const detail = await resp.text().catch(() => "");
		return NextResponse.json(
			{ ok: false, error: "send_failed", detail: detail.slice(0, 1000) },
			{ status: 502 },
		);
	}

	return NextResponse.json({ ok: true, sent: true }, { status: 200 });
}


