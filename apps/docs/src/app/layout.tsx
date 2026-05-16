import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { RootShell } from "../components/RootShell";

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ui.stareezy.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stareezy UI — Typed Design Token System & Component Library",
    template: "%s | Stareezy UI",
  },
  description:
    "A fully typed, cross-platform design token system and component library for React Native and web. 17 beautiful components, 300+ typed tokens, O(1) runtime, tree-shakeable.",
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
    "token system",
    "typed tokens",
    "expo",
    "mobile UI",
    "web UI",
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
    title: "Stareezy UI — Typed Design Token System & Component Library",
    description:
      "A fully typed, cross-platform design token system and component library for React Native and web. 17 beautiful components, 300+ typed tokens.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Stareezy UI — Typed Design Token System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stareezy UI — Typed Design Token System",
    description:
      "A fully typed, cross-platform design token system and component library for React Native and web.",
    images: ["/og-image.svg"],
    creator: "@stareezy",
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
    icon: "/favicon.svg",
    apple: "/icon-192.svg",
  },
  other: {
    "theme-color": "#0d1117",
    "color-scheme": "dark light",
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
        "17 cross-platform components",
        "O(1) style registry",
        "Babel/Vite build compiler",
        "Light/dark theme system",
        "Tree-shakeable",
        "React Native + Web support",
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
    <html lang="en">
      <head>
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
