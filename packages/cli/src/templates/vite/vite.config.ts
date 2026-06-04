import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

export default defineConfig(({ command }) => ({
  plugins: [
    // Only run the stareezy compiler during production builds.
    // @babel/traverse has CJS/ESM interop issues in Vite's dev transform
    // pipeline; Box's inline responsive style injection handles dev-time
    // styling without the compiler.
    ...(command === "build" ? [stareezyVitePlugin()] : []),
    react(),
  ],
}));
