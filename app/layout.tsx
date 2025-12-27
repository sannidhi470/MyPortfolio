import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Background } from "./components/background";
import Particles from "./components/particles";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Sannidhi Shetty",
    template: "%s | Sannidhi Shetty",
  },
  description:
    "Full Stack Developer specializing in Java/Spring Boot, Node.js, and modern frontend frameworks (React/Angular). Based in Montreal, Canada.",
  openGraph: {
    title: "Sannidhi Shetty",
    description:
      "Full Stack Developer specializing in Java/Spring Boot, Node.js, and modern frontend frameworks (React/Angular).",
    siteName: "Sannidhi Shetty",
    images: [
      {
        url: "https://chronark.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Sannidhi Shetty",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <Background />
        <Particles
          className="fixed inset-0 -z-10 opacity-70"
          quantity={100}
          staticity={70}
          ease={70}
        />
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
