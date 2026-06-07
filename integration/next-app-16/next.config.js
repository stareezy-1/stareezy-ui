/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal Next.js 16 App Router config for compiler integration validation.
  // The quasify-ui Vite plugin is used during post-build CSS extraction,
  // but the primary build validation here is that quasify-ui components
  // import and compile cleanly under Next.js 16's webpack pipeline.
  experimental: {},
};

module.exports = nextConfig;
