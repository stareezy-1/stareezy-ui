import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Stareezy AI — AI-Powered UI Builder",
  description:
    "Describe the UI you want to build in plain English. Stareezy AI generates production-ready components using your design tokens.",
  openGraph: {
    title: "Stareezy AI — AI-Powered UI Builder",
    description:
      "Describe the UI you want to build. Stareezy AI generates production-ready Stareezy UI components.",
  },
};

export default function AILayout({ children }: { children: ReactNode }) {
  return children;
}
