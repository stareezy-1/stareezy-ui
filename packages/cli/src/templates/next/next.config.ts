import type { NextConfig } from "next";
import { quasifyVitePlugin } from "@quasify-ui/compiler";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(quasifyVitePlugin());
    return config;
  },
};

export default nextConfig;
