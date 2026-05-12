import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground — Stareezy UI",
  description: "Live code playground for Stareezy UI components and tokens.",
};

// Re-export the playground page component
// The full implementation lives here to keep it co-located with the docs app
export { default } from "./PlaygroundClient";
