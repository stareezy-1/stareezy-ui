import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quasify AI — AI-Powered UI Builder",
  description:
    "Describe the UI you want to build in plain English. Quasify AI generates production-ready components using your design tokens.",
  openGraph: {
    title: "Quasify AI — AI-Powered UI Builder",
    description:
      "Describe the UI you want to build. Quasify AI generates production-ready Quasify UI components.",
  },
};

export default function AILayout({ children }: { children: ReactNode }) {
  return children;
}
