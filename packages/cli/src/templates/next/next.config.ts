import type { NextConfig } from "next";
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(stareezyVitePlugin());
    return config;
  },
};

export default nextConfig;
