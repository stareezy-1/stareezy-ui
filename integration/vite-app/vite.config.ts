import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

export default defineConfig({
  plugins: [react(), stareezyVitePlugin()],
  build: {
    rollupOptions: {
      // Keep external packages out of the integration bundle so the build
      // works without installing React from npm during CI matrix runs.
      external: [],
    },
  },
});
