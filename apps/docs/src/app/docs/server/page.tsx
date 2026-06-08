import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "React Server Components",
  description:
    "Use Stareezy UI layout primitives in Next.js App Router Server Components via the ./server entry — no use client boundary required.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/server" },
};

export default function ServerPage() {
  return (
    <DocPage
      title="React Server Components"
      description="Import RSC-safe layout primitives from the ./server entry for use in Next.js App Router Server Components, with a client boundary pattern for interactive components."
      badge="Guide"
      icon="⬢"
      badgeColor="#22c55e"
    >
      <h2 className="gradient-text">Overview</h2>
      <p>
        Next.js App Router renders Server Components (RSC) by default. React
        hooks, context, and <code>&quot;use client&quot;</code> are not allowed
        in Server Components. Stareezy UI ships a dedicated{" "}
        <code>&quot;./server&quot;</code> entry that exports hook-free layout
        primitives safe for use in RSC.
      </p>

      <Callout type="info">
        The <code>&quot;./server&quot;</code> entry contains no{" "}
        <code>useState</code>, <code>useEffect</code>, <code>useContext</code>,
        or any other React hook. It also has no{" "}
        <code>&quot;use client&quot;</code> directive — it is fully server-safe.
      </Callout>

      {/* ── What is in the server entry ──────────────────────────────────── */}
      <h2 className="gradient-text">Server-safe primitives</h2>
      <p>
        The following primitives are exported from the{" "}
        <code>&quot;./server&quot;</code> entry. They resolve theme tokens via
        CSS custom properties (<code>var(--token-id)</code>) instead of React
        hooks:
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {["Box", "View", "Stack", "Text", "Divider"].map((name) => (
          <code
            key={name}
            style={{
              background: "var(--brand-500)",
              color: "white",
              border: "1px solid var(--brand-500)",
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {name}
          </code>
        ))}
      </div>
      <pre>
        <code>{`// Import from the server entry — safe in any Server Component
import { Box, View, Stack, Text, Divider } from '@stareezy-ui/components/server'`}</code>
      </pre>

      {/* ── Client entry unchanged ───────────────────────────────────────── */}
      <h2 className="gradient-text">Client entry — interactive components</h2>
      <p>
        The default <code>&quot;.&quot;</code> client entry is unchanged and
        continues to export all interactive components with their{" "}
        <code>&quot;use client&quot;</code> boundaries:
      </p>
      <pre>
        <code>{`// Default client entry — use inside Client Components
import { Button, Input, Modal, Tabs, Dropdown } from '@stareezy-ui/components'`}</code>
      </pre>

      {/* ── Next.js App Router example ───────────────────────────────────── */}
      <h2 className="gradient-text">Next.js App Router example</h2>
      <p>
        Here is a complete example of a page that uses both RSC-safe primitives
        and interactive client components:
      </p>

      <Step n={1} title="Server Component page (no use client needed)">
        <pre>
          <code>{`// app/page.tsx — Server Component (default in App Router)
import { Box, Stack, Text } from '@stareezy-ui/components/server'
import { HeroActions } from './HeroActions'  // Client Component below

export default function HomePage() {
  // Server-side data fetch — no useEffect, no useState
  const data = await fetchData()

  return (
    <Box p={{ base: 16, md: 32 }}>
      <Stack gap={16}>
        <Text style={{ fontSize: 32, fontWeight: 800 }}>
          Welcome
        </Text>
        <Text style={{ fontSize: 16, opacity: 0.7 }}>
          {data.tagline}
        </Text>

        {/* Client Component wrapped in a boundary */}
        <HeroActions />
      </Stack>
    </Box>
  )
}`}</code>
        </pre>
      </Step>

      <Step n={2} title="Client Component with interactive elements">
        <pre>
          <code>{`// app/HeroActions.tsx — Client Component
'use client'

import { Button, Modal } from '@stareezy-ui/components'
import { useState } from 'react'

export function HeroActions() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setOpen(true)} variant="primary">
        Get started
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Get started">
        {/* Modal content */}
      </Modal>
    </>
  )
}`}</code>
        </pre>
      </Step>

      <Step n={3} title="Layout with server primitives and client nav">
        <pre>
          <code>{`// app/layout.tsx
import { Box, Stack } from '@stareezy-ui/components/server'
import { ThemeProvider } from '@stareezy-ui/tokens'
import { NavBar } from '@/components/NavBar'  // 'use client'
import './stareezy.config'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme="aurora">
          {/* Server primitive wraps everything */}
          <Stack minH="100vh">
            {/* Client boundary for interactive nav */}
            <NavBar />

            {/* Page content (may be Server or Client Components) */}
            <Box flex={1} p={{ base: 16, md: 32 }}>
              {children}
            </Box>
          </Stack>
        </ThemeProvider>
      </body>
    </html>
  )
}`}</code>
        </pre>
      </Step>

      {/* ── Client boundary pattern ──────────────────────────────────────── */}
      <h2 className="gradient-text">Client boundary pattern</h2>
      <p>
        The recommended pattern is to push <code>&quot;use client&quot;</code>{" "}
        as deep as possible — only the components that actually need hooks or
        browser APIs need to be Client Components.
      </p>
      <pre>
        <code>{`// ✅ Good — boundary is at the interactive leaf
// Server Component:
import { Box, Stack, Text } from '@stareezy-ui/components/server'
import { LikeButton } from './LikeButton'  // 'use client'

export default function Post({ post }) {
  return (
    <Box p={20}>
      <Text style={{ fontWeight: 700 }}>{post.title}</Text>
      <Text>{post.body}</Text>
      <LikeButton postId={post.id} />  {/* Only this needs client */}
    </Box>
  )
}

// ❌ Avoid — marking the whole page as client
'use client'
import { Box, Stack, Text } from '@stareezy-ui/components'  // ← not needed
...`}</code>
      </pre>

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--brand-500)",
          borderRadius: 10,
          padding: "0.5rem",
          margin: "1.5rem 0",
        }}
      >
        <Callout type="tip">
          Server primitives (<code>Box</code>, <code>Stack</code>, etc.) from the{" "}
          <code>&quot;./server&quot;</code> entry can be used as wrappers around
          Client Components. Props including <code>BoxLayoutProps</code> work
          exactly as on the client entry.
        </Callout>
      </div>

      {/* ── ThemeProvider in App Router ──────────────────────────────────── */}
      <h2 className="gradient-text">ThemeProvider in App Router</h2>
      <p>
        <code>ThemeProvider</code> from <code>@stareezy-ui/tokens</code> is a{" "}
        <code>&quot;use client&quot;</code> component because it manages theme
        state. Wrap it in a client component shell when used in the root layout:
      </p>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--brand-500)",
          borderRadius: 10,
          padding: "0.5rem",
          margin: "1.5rem 0",
        }}
      >
        <pre>
          <code>{`// app/Providers.tsx
'use client'

import { ThemeProvider } from '@stareezy-ui/tokens'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme="aurora">{children}</ThemeProvider>
}

// app/layout.tsx — import Providers, keep layout a Server Component
import { Providers } from './Providers'
import { Box } from '@stareezy-ui/components/server'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box minH="100vh">{children}</Box>
        </Providers>
      </body>
    </html>
  )
}`}</code>
        </pre>
      </div>

      <Callout type="info">
        On web, the server-entry primitives resolve token values through CSS
        custom properties injected by <code>ThemeProvider</code>. As long as{" "}
        <code>ThemeProvider</code> is an ancestor in the component tree, the
        server primitives render with the correct theme colors — even though
        they have no React hooks themselves.
      </Callout>
    </DocPage>
  );
}
