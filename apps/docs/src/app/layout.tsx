import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { RootShell } from "../components/RootShell";

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://stareezy-ui.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stareezy UI",
    template: "%s | Stareezy UI",
  },
  description:
    "A fully typed, cross-platform design token system and component library for React Native and web.",
  keywords: [
    "design tokens",
    "react native",
    "component library",
    "typescript",
    "cross-platform",
  ],
  authors: [{ name: "Stareezy UI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Stareezy UI",
    title: "Stareezy UI",
    description:
      "A fully typed, cross-platform design token system and component library for React Native and web.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stareezy UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stareezy UI",
    description:
      "A fully typed, cross-platform design token system and component library for React Native and web.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
