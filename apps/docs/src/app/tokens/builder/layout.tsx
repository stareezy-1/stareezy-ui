import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Theme Builder — Stareezy UI",
  description:
    "Interactive theme builder for Stareezy UI. Customize colors, preview live, and export your theme as CSS variables.",
};

export default function BuilderLayout({ children }: { children: ReactNode }) {
  return children;
}
