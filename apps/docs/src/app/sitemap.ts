import type { MetadataRoute } from "next";

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ui.stareezy.tech";

const DOC_SLUGS = [
  "installation",
  "quick-start",
  "usage",
  "components",
  "theming",
  "compiler",
  "create-ui",
  "use-ui-config",
  "architecture",
  "migration",
  "cdn",
  "about",
  "thanks",
];

const TOKEN_SLUGS = ["aurora", "motion", "glow"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const top: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tokens`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/playground`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/storybook`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const docRoutes: MetadataRoute.Sitemap = DOC_SLUGS.map((slug) => ({
    url: `${SITE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const tokenRoutes: MetadataRoute.Sitemap = TOKEN_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tokens/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...top, ...docRoutes, ...tokenRoutes];
}
