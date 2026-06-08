import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Stareezy Playground — Interactive UI Sandbox",
  description:
    "Explore and preview Stareezy UI components in real time. Tweak patterns, themes, and layout options — then export production-ready code.",
  openGraph: {
    title: "Stareezy Playground — Interactive UI Sandbox",
    description:
      "Explore and preview Stareezy UI components in real time. Tweak patterns, themes, and layout options — then export production-ready code.",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
