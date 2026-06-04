import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

export default defineConfig({
  plugins: [react(), stareezyVitePlugin()],
});
