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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stareezy UI — Build Cross-Platform UIs with Quasar Design Tokens",
    template: "%s | Stareezy UI",
  },
  description:
    "A fully typed, cross-platform design token system and component library for React Native and web. 31+ components, 300+ typed tokens, 5 themes, O(1) runtime, tree-shakeable.",
  keywords: [
    "design tokens",
    "react native",
    "component library",
    "typescript",
    "cross-platform",
    "react",
    "design system",
    "UI library",
    "stareezy",
    "quasar ui",
    "token system",
    "typed tokens",
    "expo",
    "mobile UI",
    "web UI",
    "plasma orange",
    "deep space theme",
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
    title: "Stareezy UI — Build Cross-Platform UIs with Quasar Design Tokens",
    description:
      "A fully typed, cross-platform design token system and component library for React Native and web. 31+ components, 300+ typed tokens, 5 themes.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Stareezy UI — Cross-Platform UI Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stareezy UI — Build Cross-Platform UIs with Quasar",
    description:
      "A fully typed, cross-platform design token system and component library for React Native and web.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Stareezy UI",
      url: SITE_URL,
      description:
        "A fully typed, cross-platform design token system and component library for React Native and web.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "300+ typed design tokens",
        "31+ cross-platform components",
        "O(1) style registry",
        "Babel/Vite build compiler",
        "5 premium themes",
        "Tree-shakeable",
        "React Native + Web + Expo support",
      ],
      creator: {
        "@type": "Organization",
        name: "Stareezy",
        url: "https://stareezy.tech",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Stareezy UI",
      description: "Typed design token system and component library",
      publisher: {
        "@type": "Organization",
        name: "Stareezy",
        url: "https://stareezy.tech",
      },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('szr-docs-theme')||'quasar';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
