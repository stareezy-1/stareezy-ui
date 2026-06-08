import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RootShell } from "../components/RootShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ui.stareezy.tech";

const TITLE_DEFAULT =
  "Stareezy UI — Typed Design Token System for React Native & Web";
const DESCRIPTION =
  "The typed design token system and cross-platform component library for React Native and web. One token API, every platform — 31+ components, 300+ typed tokens, 5 themes, O(1) runtime, Babel/Vite/Metro compiler, tree-shakeable. Works with React 18/19, Next.js 14–16, Expo 54–56, Vite 4–7.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Stareezy UI",
  },
  description: DESCRIPTION,
  keywords: [
    // core identity
    "stareezy ui",
    "stareezy",
    "design token system",
    "typed design tokens",
    "Token<T>",
    // platform & framework
    "react native",
    "react native web",
    "expo",
    "next.js",
    "vite",
    "cross-platform UI",
    "cross-platform component library",
    // technology
    "typescript",
    "typescript ui library",
    "react 19",
    "react server components",
    "rsc safe components",
    // library characteristics
    "component library",
    "design system",
    "ui library",
    "theme reactive components",
    "theme switching",
    "zero re-renders",
    "o(1) runtime",
    "tree shakeable",
    "atomic css",
    // features
    "createUi",
    "BoxLayoutProps",
    "responsive design tokens",
    "quasar theme",
    "aurora theme",
    "steins gate theme",
    "dark mode",
    "light mode",
    // tooling
    "babel plugin ui",
    "vite plugin ui",
    "metro transformer",
    "stareezy cli",
    "mcp server design tokens",
    "claude mcp ui",
    // discovery
    "open source ui library",
    "free component library",
    "mobile ui",
    "web ui",
  ],
  authors: [{ name: "Stareezy", url: "https://stareezy.tech" }],
  creator: "Stareezy",
  publisher: "Stareezy",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Stareezy UI",
    title: TITLE_DEFAULT,
    description:
      "The typed design token system for React Native and web. One token API, every platform. 31+ theme-reactive components, 300+ typed tokens, O(1) runtime, build-time compiler. Works with Next.js, Expo, Vite.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Stareezy UI — Typed Design Token System for React Native & Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stareezy UI — Typed Design Tokens for React Native & Web",
    description:
      "One token API, every platform. 31+ cross-platform components, 300+ typed tokens, 5 themes, O(1) runtime. Works with Next.js, Expo, Vite, React Native.",
    images: ["/og-image.svg"],
    creator: "@Stareezy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
      { url: "/icon-512.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/icon-192.svg", sizes: "192x192" },
      { url: "/icon-512.svg", sizes: "512x512" },
    ],
    other: [{ rel: "mask-icon", url: "/favicon.svg", color: "#020205" }],
  },
  other: {
    "google-site-verification": "76720285c6e99e6d",
    "theme-color": "#020205",
    "color-scheme": "dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Stareezy UI",
  },
};

// ── JSON-LD structured data ────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Primary: SoftwareApplication
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Stareezy UI",
      url: SITE_URL,
      description: DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "UI Component Library",
      operatingSystem: "Any",
      programmingLanguage: ["TypeScript", "JavaScript"],
      runtimePlatform: ["React", "React Native", "Expo", "Next.js", "Vite"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "300+ typed design tokens — colors, spacing, typography, radius, shadow, motion",
        "31+ cross-platform UI components for React Native and web",
        "O(1) style registry — token resolution is a single Map.get() call",
        "Babel/Vite/Metro build-time compiler — zero runtime cost",
        "5 premium themes: Quasar, Aurora, Steins;Gate, Dark, Light",
        "createUi() config-driven responsive type system",
        "BoxLayoutProps on every component — responsive spacing/sizing/flex",
        "React Server Components safe via ./server entry",
        "Tree-shakeable — import only what you use",
        "First-party CLI: stareezy create / add / init",
        "MCP server for Claude, Cursor, and AI tool integration",
        "TypeScript 5.9 strict mode throughout",
      ],
      softwareVersion: "1.1.0",
      license: "https://opensource.org/licenses/MIT",
      codeRepository: "https://github.com/stareezy-1/stareezy-ui",
      creator: {
        "@type": "Organization",
        name: "Stareezy",
        url: "https://stareezy.tech",
      },
    },
    // WebSite for sitelinks search box eligibility
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Stareezy UI",
      description:
        "The typed design token system and cross-platform component library for React Native and web.",
      publisher: {
        "@type": "Organization",
        name: "Stareezy",
        url: "https://stareezy.tech",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/docs/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    // BreadcrumbList for the docs section
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Stareezy UI",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Documentation",
          item: `${SITE_URL}/docs/installation`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Components",
          item: `${SITE_URL}/docs/components`,
        },
      ],
    },
    // FAQPage for common developer questions (rich result eligibility)
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Stareezy UI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stareezy UI is a fully typed, object-based design token system and cross-platform component library for React Native and web. Every design value — color, spacing, radius, typography, shadow, motion — is a typed Token<T> object. Theme switching is pure CSS variables with zero JavaScript re-renders.",
          },
        },
        {
          "@type": "Question",
          name: "Does Stareezy UI work with React Native and Expo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Stareezy UI works identically on web (React 18/19, Next.js 14–16, Vite 4–7) and React Native (0.81–0.86) including Expo SDK 54, 55, and 56. The same component code renders on all platforms without modification.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started with Stareezy UI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The fastest way is the CLI: run `npx stareezy create my-app --template next` for Next.js, `--template vite` for Vite, or `--template expo` for Expo. Each template ships pre-wired with stareezy.config.ts, compiler setup, and ThemeProvider.",
          },
        },
        {
          "@type": "Question",
          name: "Is Stareezy UI free and open source?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Stareezy UI is MIT licensed and completely free. All packages are published to npm under the @stareezy-ui scope.",
          },
        },
        {
          "@type": "Question",
          name: "What makes Stareezy UI different from other component libraries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stareezy UI uniquely combines: (1) a fully typed Token<T> object system for every design value, (2) true cross-platform parity between React Native and web with zero platform-specific code, (3) O(1) runtime token resolution via a Map-based registry, (4) a build-time Babel/Vite/Metro compiler that extracts tokens to atomic CSS, and (5) a config-driven responsive type system where BoxLayoutProps flow through every component automatically.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="quasar"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Theme hydration — must run before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('szr-docs-theme')||'quasar';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* PWA service worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker'in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});})}`,
          }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Canonical hint for crawlers on the root */}
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
