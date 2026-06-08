"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type ComponentPattern =
  | "hero"
  | "dashboard"
  | "form"
  | "card-grid"
  | "navbar"
  | "modal";
type ThemeMode = "quasar" | "aurora" | "steins-gate";
type RefinementAction =
  | "darker"
  | "lighter"
  | "more-spacing"
  | "less-spacing"
  | "larger-text"
  | "smaller-text"
  | "add-cta"
  | "remove-cta"
  | "change-layout";

interface ComponentConfig {
  pattern: ComponentPattern;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecondary: string;
  dark: boolean;
  spacing: "compact" | "normal" | "spacious";
  textSize: "small" | "medium" | "large";
  layout: "center" | "split" | "grid";
  showCode: boolean;
  accent: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  config?: ComponentConfig;
  code?: string;
  isTyping?: boolean;
}

function defaultConfig(pattern: ComponentPattern): ComponentConfig {
  const base: Record<ComponentPattern, ComponentConfig> = {
    hero: {
      pattern: "hero",
      title: "Build Cross-Platform UIs",
      subtitle:
        "A fully typed design token system for React Native and web. Five themes, O(1) runtime, tree-shakeable.",
      ctaText: "Get Started",
      ctaSecondary: "Learn More",
      dark: true,
      spacing: "normal",
      textSize: "large",
      layout: "center",
      showCode: true,
      accent: "#ff6a1a",
    },
    dashboard: {
      pattern: "dashboard",
      title: "Dashboard",
      subtitle: "Monitor your metrics and manage your application",
      ctaText: "View Details",
      ctaSecondary: "Refresh",
      dark: true,
      spacing: "spacious",
      textSize: "medium",
      layout: "grid",
      showCode: false,
      accent: "#22c55e",
    },
    form: {
      pattern: "form",
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      ctaText: "Sign In",
      ctaSecondary: "Create Account",
      dark: true,
      spacing: "normal",
      textSize: "medium",
      layout: "center",
      showCode: false,
      accent: "#dc143c",
    },
    "card-grid": {
      pattern: "card-grid",
      title: "Features",
      subtitle: "Everything you need to build great UIs",
      ctaText: "Learn More",
      ctaSecondary: "Get Started",
      dark: true,
      spacing: "spacious",
      textSize: "medium",
      layout: "grid",
      showCode: false,
      accent: "#ff6a1a",
    },
    navbar: {
      pattern: "navbar",
      title: "Stareezy",
      subtitle: "Navigation",
      ctaText: "Sign Up",
      ctaSecondary: "Log In",
      dark: true,
      spacing: "compact",
      textSize: "medium",
      layout: "split",
      showCode: false,
      accent: "#ff6a1a",
    },
    modal: {
      pattern: "modal",
      title: "Confirm Action",
      subtitle: "Are you sure you want to proceed?",
      ctaText: "Confirm",
      ctaSecondary: "Cancel",
      dark: true,
      spacing: "normal",
      textSize: "medium",
      layout: "center",
      showCode: false,
      accent: "#dc143c",
    },
  };
  return { ...base[pattern] };
}

function generateCode(config: ComponentConfig): string {
  const {
    pattern,
    title,
    subtitle,
    ctaText,
    ctaSecondary,
    spacing,
    dark,
    textSize,
    layout,
  } = config;
  const p = spacing === "compact" ? 16 : spacing === "spacious" ? 48 : 24;
  const fs = textSize === "large" ? "H1" : textSize === "small" ? "H3" : "H2";
  const bg = dark ? "t.backgrounds.primaryBlack" : "t.backgrounds.primary";

  const snippets: Record<ComponentPattern, string> = {
    hero: `import { Box, Text, Button } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'

export function HeroSection() {
  return (
    <Box
      bg={${bg}}
      p={{ base: ${p}, md: ${p * 2} }}
      style={{ textAlign: '${layout === "center" ? "center" : "left"}' }}
    >
      <Text type="${fs}" color={t.text.primary}>
        ${title}
      </Text>
      <Text
        type="${fs === "H1" ? "M-body" : "M-body"}"
        color={t.text.importantBrand}
        style={{ marginBottom: 16 }}
      >
        ${subtitle}
      </Text>
      <Text
        type="M-body"
        color={t.text.secondary}
        style={{ maxWidth: 520, margin: '0 auto 32px' }}
      >
        Your description here.
      </Text>
      <Box flexDirection="row" gap={12} justifyContent="center">
        <Button type="Primary" text="${ctaText}" size="LG" />
        <Button type="Ghost" text="${ctaSecondary}" size="LG" />
      </Box>
    </Box>
  )
}`,
    dashboard: `import { Box, Text, Card } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'

const STATS = [
  { label: 'Users', value: '12.5K', change: '+12%' },
  { label: 'Revenue', value: '$48.2K', change: '+8%' },
  { label: 'Active', value: '3.2K', change: '+23%' },
  { label: 'Bounce', value: '2.1%', change: '-5%' },
]

export function Dashboard() {
  return (
    <Box flex={1} bg={${bg}} p={${p}}>
      <Text type="${fs}" color={t.text.primary} style={{ marginBottom: 24 }}>
        ${title}
      </Text>
      <Box flexDirection="row" flexWrap="wrap" gap={16} style={{ marginBottom: 32 }}>
        {STATS.map((s) => (
          <Card key={s.label} variant="border" style={{ flex: 1, minWidth: 180, padding: 20 }}>
            <Text type="M-caption" color={t.text.secondary}>{s.label}</Text>
            <Text type="H3" color={t.text.primary} style={{ marginVertical: 4 }}>{s.value}</Text>
            <Text type="M-body" color={t.text.success}>{s.change}</Text>
          </Card>
        ))}
      </Box>
      <Box flex={1} bg={t.backgrounds.primary} rounded={12} p={${p}}>
        <Text type="M-body" color={t.text.primary}>Chart Area</Text>
      </Box>
    </Box>
  )
}`,
    form: `import { Box, Text, Input, Button, Checkbox } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'

export function SignInForm() {
  return (
    <Box flex={1} bg={${bg}} justifyContent="center" alignItems="center" p={${p}}>
      <Box bg={t.backgrounds.primary} p={32} rounded={16} style={{ width: '100%', maxWidth: 400 }}>
        <Text type="${fs}" color={t.text.primary} style={{ marginBottom: 8 }}>
          ${title}
        </Text>
        <Text type="M-body" color={t.text.secondary} style={{ marginBottom: 24 }}>
          ${subtitle}
        </Text>
        <Input label="Email" placeholder="you@example.com" size="MD" style={{ marginBottom: 16 }} />
        <Input label="Password" placeholder="••••••••" size="MD" secureTextEntry style={{ marginBottom: 12 }} />
        <Checkbox label="Remember me" style={{ marginBottom: 24 }} />
        <Button type="Primary" text="${ctaText}" size="LG" fullWidth />
      </Box>
    </Box>
  )
}`,
    "card-grid": `import { Box, Text, Card } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'

const ITEMS = [
  { title: 'Design Tokens', desc: '300+ typed tokens', color: '#ff6a1a' },
  { title: 'Components', desc: '31+ cross-platform', color: '#22c55e' },
  { title: 'Themes', desc: '5 built-in themes', color: '#dc143c' },
]

export function CardGrid() {
  return (
    <Box p={${p}} bg={${bg}} alignItems="center">
      <Text type="${fs}" color={t.text.primary} style={{ marginBottom: 24, textAlign: 'center' }}>
        ${title}
      </Text>
      <Box flexDirection="row" flexWrap="wrap" gap={16} justifyContent="center">
        {ITEMS.map((item) => (
          <Card key={item.title} variant="border" style={{ width: 280, padding: 24 }}>
            <Box width={48} height={48} bg={item.color + '20'} rounded={12}
                 alignItems="center" justifyContent="center" style={{ marginBottom: 16 }}>
              <Text type="M-heading-bold" color={item.color}>✦</Text>
            </Box>
            <Text type="M-heading-bold" color={t.text.primary}>{item.title}</Text>
            <Text type="M-body" color={t.text.secondary}>{item.desc}</Text>
          </Card>
        ))}
      </Box>
    </Box>
  )
}`,
    navbar: `import { Box, Text, Button } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'
import { useState } from 'react'

export function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between"
         bg={t.backgrounds.primary} p={{ base: 12, md: 16 }}
         style={{ borderBottom: '1px solid ' + t.border.default }}>
      <Box flexDirection="row" alignItems="center" gap={8}>
        <Box width={32} height={32} bg={t.backgrounds.primaryBlack} rounded={8}
             alignItems="center" justifyContent="center">
          <Text type="M-heading-bold" color={t.text.importantBrand}>Q</Text>
        </Box>
        <Text type="M-heading-bold" color={t.text.primary}>${title}</Text>
      </Box>
      <Box flexDirection="row" gap={4} display={{ base: 'none', md: 'flex' }}>
        {['Docs', 'Components', 'Pricing'].map(l => (
          <Button key={l} type="Ghost" text={l} size="SM" />
        ))}
      </Box>
      <Box flexDirection="row" gap={8} alignItems="center">
        <Button type="Ghost" text="${ctaSecondary}" size="SM" />
        <Button type="Primary" text="${ctaText}" size="SM" />
      </Box>
    </Box>
  )
}`,
    modal: `import { Box, Text, Button } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'
import { useState } from 'react'

export function ConfirmModal() {
  const [open, setOpen] = useState(false)
  return (
    <Box flex={1} bg={${bg}} p={${p}} alignItems="center" justifyContent="center">
      <Button type="Primary" text="Open Modal" size="MD" onPress={() => setOpen(true)} />
      {open && (
        <Box position="fixed" inset={0} bg="rgba(0,0,0,0.6)" alignItems="center" justifyContent="center" style={{ zIndex: 1000 }}>
          <Box bg={t.backgrounds.primary} p={32} rounded={16} style={{ width: '90%', maxWidth: 420 }}>
            <Text type="${fs}" color={t.text.primary} style={{ marginBottom: 8 }}>${title}</Text>
            <Text type="M-body" color={t.text.secondary} style={{ marginBottom: 24 }}>
              ${subtitle}
            </Text>
            <Box flexDirection="row" gap={12} justifyContent="flex-end">
              <Button type="Ghost" text="${ctaSecondary}" onPress={() => setOpen(false)} />
              <Button type="Danger" text="${ctaText}" onPress={() => setOpen(false)} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}`,
  };
  return snippets[pattern];
}

function generateViteProject(config: ComponentConfig): Record<string, string> {
  const appCode = generateCode(config);
  return {
    "src/App.tsx": appCode,
    "src/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@stareezy-ui/tokens'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="quasar">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)`,
    "package.json": JSON.stringify(
      {
        name: "stareezy-app",
        private: true,
        version: "0.0.0",
        type: "module",
        scripts: {
          dev: "vite",
          build: "tsc && vite build",
          preview: "vite preview",
        },
        dependencies: {
          react: "^18.2.0",
          "react-dom": "^18.2.0",
          "@stareezy-ui/components": "^0.1.0",
          "@stareezy-ui/tokens": "^0.1.0",
        },
        devDependencies: {
          "@types/react": "^18.2.0",
          "@types/react-dom": "^18.2.0",
          "@vitejs/plugin-react": "^4.2.0",
          typescript: "^5.2.0",
          vite: "^5.0.0",
        },
      },
      null,
      2,
    ),
    "vite.config.ts": `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { stareezyPlugin } from '@stareezy-ui/vite-plugin'

export default defineConfig({
  plugins: [react(), stareezyPlugin()],
})`,
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stareezy App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
  };
}

const SPACING_MAP = { compact: 12, normal: 24, spacious: 48 };

function LivePreview({
  config,
  theme,
}: {
  config: ComponentConfig;
  theme: ThemeMode;
}) {
  const p = SPACING_MAP[config.spacing];
  const fs =
    config.textSize === "large"
      ? "clamp(1.5rem,3vw,2rem)"
      : config.textSize === "small"
      ? "0.95rem"
      : "1.15rem";
  const bg = config.dark ? "var(--color-bg)" : "var(--color-surface)";

  if (config.pattern === "hero") {
    return (
      <div
        style={{
          background: bg,
          padding: `${p}px`,
          textAlign: config.layout === "center" ? "center" : "left",
          borderRadius: 8,
        }}
      >
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          <span className="pill-tag orange" style={{ fontSize: "0.55rem" }}>
            v2.0
          </span>
          <span className="pill-tag teal" style={{ fontSize: "0.55rem" }}>
            AI Generated
          </span>
        </div>
        <div
          style={{
            fontSize: fs,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            marginBottom: 8,
          }}
        >
          {config.title}
        </div>
        <div
          style={{
            fontSize: "0.9rem",
            color: config.accent,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {config.subtitle}
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--color-text-2)",
            maxWidth: 400,
            margin: config.layout === "center" ? "0 auto 20px" : "0 0 20px",
            lineHeight: 1.6,
          }}
        >
          Your description here. This component uses theme tokens — switch
          themes and every color updates automatically.
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent:
              config.layout === "center" ? "center" : "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              background:
                "linear-gradient(135deg, " + config.accent + ", #e05010)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {config.ctaText} →
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "1px solid rgba(255,106,26,0.2)",
              color: "var(--color-text-2)",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {config.ctaSecondary}
          </div>
        </div>
      </div>
    );
  }

  if (config.pattern === "dashboard") {
    return (
      <div style={{ background: bg, padding: `${p}px`, borderRadius: 8 }}>
        <div
          style={{
            fontSize: fs,
            fontWeight: 800,
            color: "var(--color-text)",
            marginBottom: 16,
          }}
        >
          {config.title}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {[
            ["Users", "12.5K", "+12%"],
            ["Revenue", "$48.2K", "+8%"],
            ["Active", "3.2K", "+23%"],
            ["Bounce", "2.1%", "-5%"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                background: "var(--color-surface)",
                borderRadius: 8,
                padding: 12,
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--color-text-2)",
                  marginBottom: 4,
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--color-text)",
                  marginBottom: 2,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: (c ?? "").startsWith("+") ? "#22c55e" : "#dc143c",
                  fontWeight: 600,
                }}
              >
                {c ?? ""}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 8,
            padding: 16,
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 80,
          }}
        >
          <div
            style={{
              width: "60%",
              height: 4,
              borderRadius: 2,
              background: "var(--color-surface-2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "65%",
                height: "100%",
                background:
                  "linear-gradient(90deg, " + config.accent + ", #dc143c)",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (config.pattern === "form") {
    return (
      <div
        style={{
          background: bg,
          padding: `${p}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          minHeight: 200,
        }}
      >
        <div
          style={{
            background: "var(--color-surface)",
            padding: 24,
            borderRadius: 12,
            width: "100%",
            maxWidth: 320,
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              fontSize: fs,
              fontWeight: 800,
              color: "var(--color-text)",
              marginBottom: 4,
            }}
          >
            {config.title}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-2)",
              marginBottom: 20,
            }}
          >
            {config.subtitle}
          </div>
          {["Email", "Password"].map((f) => (
            <div key={f} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--color-text-2)",
                  marginBottom: 4,
                }}
              >
                {f}
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                }}
              >
                {f === "Email" ? "you@example.com" : "••••••••"}
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                border: "2px solid rgba(255,106,26,0.3)",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-2)" }}>
              Remember me
            </span>
          </div>
          <div
            style={{
              padding: "10px",
              borderRadius: 8,
              background:
                "linear-gradient(135deg, " + config.accent + ", #e05010)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.85rem",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 0 10px " + config.accent + "30",
            }}
          >
            {config.ctaText}
          </div>
        </div>
      </div>
    );
  }

  if (config.pattern === "card-grid") {
    const items = [
      { title: "Design Tokens", desc: "300+ typed tokens", color: "#ff6a1a" },
      { title: "Components", desc: "31+ cross-platform", color: "#22c55e" },
      { title: "Themes", desc: "5 built-in themes", color: "#dc143c" },
    ];
    return (
      <div
        style={{
          background: bg,
          padding: `${p}px`,
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: fs,
            fontWeight: 800,
            color: "var(--color-text)",
            marginBottom: 20,
          }}
        >
          {config.title}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--color-surface)",
                borderRadius: 10,
                padding: 16,
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: item.color + "20",
                  border: "1px solid " + item.color + "30",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                  fontSize: "0.85rem",
                  color: item.color,
                }}
              >
                ✦
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--color-text)",
                  marginBottom: 4,
                }}
              >
                {item.title}
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--color-text-2)" }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (config.pattern === "navbar") {
    return (
      <div style={{ background: bg, borderRadius: 8, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background:
                  "linear-gradient(135deg, " + config.accent + ", #dc143c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                color: "white",
                fontWeight: 800,
              }}
            >
              Q
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--color-text)",
              }}
            >
              {config.title}
            </span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <div
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: "0.72rem",
                color: "var(--color-text-2)",
                cursor: "pointer",
              }}
            >
              {config.ctaSecondary}
            </div>
            <div
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                background:
                  "linear-gradient(135deg, " + config.accent + ", #e05010)",
                color: "white",
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {config.ctaText}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "12px 16px",
            fontSize: "0.75rem",
            color: "var(--color-text-2)",
          }}
        >
          {["Docs", "Components", "Pricing", "Blog"].map((l) => (
            <span key={l} style={{ cursor: "pointer" }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (config.pattern === "modal") {
    return (
      <div
        style={{
          background: bg,
          padding: `${p}px`,
          borderRadius: 8,
          position: "relative",
          minHeight: 160,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              background: "var(--color-surface)",
              padding: 24,
              borderRadius: 12,
              width: "80%",
              maxWidth: 300,
              border: "1px solid var(--color-border)",
              animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            }}
          >
            <div
              style={{
                fontSize: fs,
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: 8,
              }}
            >
              {config.title}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--color-text-2)",
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              {config.subtitle}
            </div>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-2)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {config.ctaSecondary}
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background:
                    "linear-gradient(135deg, " + config.accent + ", #e05010)",
                  color: "white",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {config.ctaText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function applyRefinement(
  config: ComponentConfig,
  action: RefinementAction,
): ComponentConfig {
  const next = { ...config };
  switch (action) {
    case "darker":
      next.dark = true;
      break;
    case "lighter":
      next.dark = false;
      break;
    case "more-spacing":
      next.spacing = "spacious";
      break;
    case "less-spacing":
      next.spacing = "compact";
      break;
    case "larger-text":
      next.textSize = "large";
      break;
    case "smaller-text":
      next.textSize = "small";
      break;
    case "add-cta":
      next.ctaText = "Get Started";
      next.ctaSecondary = "Learn More";
      break;
    case "remove-cta":
      next.ctaText = "";
      next.ctaSecondary = "";
      break;
    case "change-layout":
      next.layout =
        next.layout === "center"
          ? "split"
          : next.layout === "split"
          ? "grid"
          : "center";
      break;
  }
  return next;
}

function parseRefinement(text: string): RefinementAction | null {
  const lower = text.toLowerCase();
  if (
    lower.includes("darker") ||
    lower.includes("dark mode") ||
    lower.includes("dark theme")
  )
    return "darker";
  if (
    lower.includes("lighter") ||
    lower.includes("light mode") ||
    lower.includes("light theme") ||
    lower.includes("brighter")
  )
    return "lighter";
  if (
    lower.includes("more space") ||
    lower.includes("more padding") ||
    lower.includes("spacious") ||
    lower.includes("wider")
  )
    return "more-spacing";
  if (
    lower.includes("less space") ||
    lower.includes("less padding") ||
    lower.includes("compact") ||
    lower.includes("tighter") ||
    lower.includes("narrower")
  )
    return "less-spacing";
  if (
    lower.includes("bigger text") ||
    lower.includes("larger text") ||
    lower.includes("bigger font") ||
    lower.includes("increase text") ||
    lower.includes("larger")
  )
    return "larger-text";
  if (
    lower.includes("smaller text") ||
    lower.includes("smaller font") ||
    lower.includes("decrease text") ||
    lower.includes("smaller")
  )
    return "smaller-text";
  if (
    lower.includes("add button") ||
    lower.includes("add cta") ||
    lower.includes("add call to action")
  )
    return "add-cta";
  if (
    lower.includes("remove button") ||
    lower.includes("remove cta") ||
    lower.includes("remove call")
  )
    return "remove-cta";
  if (
    lower.includes("change layout") ||
    lower.includes("different layout") ||
    lower.includes("rearrange") ||
    lower.includes("move")
  )
    return "change-layout";
  return null;
}

function getRefinementChips(
  config: ComponentConfig,
): Array<{ action: RefinementAction; label: string; icon: string }> {
  return [
    {
      action: config.dark ? "lighter" : "darker",
      label: config.dark ? "Lighten" : "Darken",
      icon: config.dark ? "○" : "◑",
    },
    {
      action:
        config.spacing === "compact"
          ? "more-spacing"
          : config.spacing === "spacious"
          ? "less-spacing"
          : "more-spacing",
      label:
        config.spacing === "compact"
          ? "More space"
          : config.spacing === "spacious"
          ? "Less space"
          : "More space",
      icon: "⊞",
    },
    {
      action: config.textSize === "large" ? "smaller-text" : "larger-text",
      label: config.textSize === "large" ? "Smaller text" : "Larger text",
      icon: "A",
    },
    { action: "change-layout", label: "Layout", icon: "◈" },
  ];
}

const QUICK_PROMPTS = [
  {
    label: "Landing Page Hero",
    icon: "◈",
    pattern: "hero" as ComponentPattern,
  },
  { label: "Dashboard", icon: "⊞", pattern: "dashboard" as ComponentPattern },
  { label: "Sign In Form", icon: "◻", pattern: "form" as ComponentPattern },
  { label: "Card Grid", icon: "⬡", pattern: "card-grid" as ComponentPattern },
  { label: "Navbar", icon: "≡", pattern: "navbar" as ComponentPattern },
  { label: "Modal Dialog", icon: "◻", pattern: "modal" as ComponentPattern },
];

const VITE_FILE_TREE = [
  { label: "src", icon: "📁", indent: 0, path: null },
  { label: "App.tsx", icon: "📄", indent: 1, path: "src/App.tsx" },
  { label: "main.tsx", icon: "📄", indent: 1, path: "src/main.tsx" },
  { label: "package.json", icon: "📄", indent: 0, path: "package.json" },
  { label: "vite.config.ts", icon: "📄", indent: 0, path: "vite.config.ts" },
  { label: "index.html", icon: "📄", indent: 0, path: "index.html" },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<ComponentConfig | null>(
    null,
  );
  const [previewTheme, setPreviewTheme] = useState<ThemeMode>("quasar");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeFile, setCodeFile] = useState("src/App.tsx");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateId = useCallback(
    () => Math.random().toString(36).slice(2, 9),
    [],
  );

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  function handlePrompt(pattern: ComponentPattern, label: string) {
    const config = defaultConfig(pattern);
    const code = generateCode(config);

    addMessage({
      id: generateId(),
      role: "user",
      text: `Create a ${label.toLowerCase()}`,
    });

    setGenerating(true);
    setCurrentConfig(null);
    setCodeFile("src/App.tsx");

    setTimeout(() => {
      setCurrentConfig(config);
      addMessage({
        id: generateId(),
        role: "assistant",
        text: `Here's your **${label}** component. It's fully theme-reactive — switch themes below to see it adapt automatically. You can refine it with the suggestion chips or type a modification.`,
        config,
        code,
      });
      setGenerating(false);
    }, 600);
  }

  function handleRefine(action: RefinementAction) {
    if (!currentConfig) return;
    const newConfig = applyRefinement(currentConfig, action);
    const newCode = generateCode(newConfig);
    setCurrentConfig(newConfig);

    const actionLabels: Record<RefinementAction, string> = {
      darker: "Made it darker",
      lighter: "Made it lighter",
      "more-spacing": "Added more spacing",
      "less-spacing": "Reduced spacing",
      "larger-text": "Increased text size",
      "smaller-text": "Decreased text size",
      "add-cta": "Added CTA button",
      "remove-cta": "Removed CTA button",
      "change-layout": "Changed layout",
    };

    const lastPattern = messages[messages.length - 1]?.config?.pattern;
    const label = lastPattern
      ? QUICK_PROMPTS.find((p) => p.pattern === lastPattern)?.label ||
        "Component"
      : "Component";

    addMessage({
      id: generateId(),
      role: "assistant",
      text: `${actionLabels[action]}. The ${label} now reflects your changes. Keep refining or copy the code to use it.`,
      config: newConfig,
      code: newCode,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const lower = input.trim().toLowerCase();
    const matchedPrompt = QUICK_PROMPTS.find(
      (p) => lower.includes(p.label.toLowerCase()) || lower.includes(p.pattern),
    );

    if (matchedPrompt) {
      handlePrompt(matchedPrompt.pattern, matchedPrompt.label);
    } else if (currentConfig) {
      const refinement = parseRefinement(lower);
      if (refinement) {
        addMessage({ id: generateId(), role: "user", text: input.trim() });
        handleRefine(refinement);
      } else {
        addMessage({ id: generateId(), role: "user", text: input.trim() });
        setGenerating(true);
        setTimeout(() => {
          addMessage({
            id: generateId(),
            role: "assistant",
            text: 'I understand you want to modify the component. Try using one of the refinement chips below, or describe a specific change like "make it darker" or "add more spacing".',
          });
          setGenerating(false);
        }, 500);
      }
    } else {
      addMessage({ id: generateId(), role: "user", text: input.trim() });
      setGenerating(true);
      setTimeout(() => {
        addMessage({
          id: generateId(),
          role: "assistant",
          text: 'Try one of the quick prompts above to generate a component, or describe what you want to build (e.g., "Create a landing page").',
        });
        setGenerating(false);
      }, 500);
    }

    setInput("");
  }

  const lastMessage = messages[messages.length - 1];
  const lastConfig = lastMessage?.config || currentConfig;
  const viteFiles = lastConfig ? generateViteProject(lastConfig) : {};
  const activeCode = viteFiles[codeFile] || "";

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - var(--header-height))",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* ── Left: Chat — hercules.app style ─────────────────────────── */}
      <div
        style={{
          width: "42%",
          minWidth: 380,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 2,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "linear-gradient(135deg, #ff6a1a, #dc143c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                color: "white",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              AI
            </div>
            <h1
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "var(--color-text)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Stareezy AI
            </h1>
            <span
              className="pill-tag orange"
              style={{ fontSize: "0.55rem", padding: "1px 6px" }}
            >
              Interactive
            </span>
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-2)",
              margin: 0,
            }}
          >
            Describe a UI component — I&apos;ll generate live previews and
            production-ready code.
          </p>
        </div>

        {/* Messages / Welcome */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, rgba(255,106,26,0.12), rgba(220,20,60,0.08))",
                  border: "1px solid rgba(255,106,26,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  marginBottom: 14,
                }}
              >
                ✦
              </div>
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  margin: "0 0 6px",
                }}
              >
                What do you want to build?
              </h2>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-2)",
                  maxWidth: 320,
                  lineHeight: 1.5,
                  margin: "0 0 24px",
                }}
              >
                Describe a UI component and I&apos;ll generate production-ready
                code.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                  maxWidth: 340,
                }}
              >
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    className="chip-button"
                    style={{
                      fontSize: "0.78rem",
                      padding: "7px 12px",
                      textAlign: "left",
                    }}
                    onClick={() => handlePrompt(p.pattern, p.label)}
                  >
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                gap: 8,
                animation: "slideUp 0.25s ease both",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #ff6a1a, #dc143c)"
                      : "rgba(255,106,26,0.08)",
                  color: msg.role === "user" ? "white" : "#ff6a1a",
                  border:
                    msg.role === "assistant"
                      ? "1px solid rgba(255,106,26,0.15)"
                      : "none",
                }}
              >
                {msg.role === "user" ? "U" : "AI"}
              </div>
              <div
                style={{
                  maxWidth: "82%",
                  padding: "8px 12px",
                  borderRadius: 10,
                  background:
                    msg.role === "user"
                      ? "rgba(255,106,26,0.06)"
                      : "var(--color-surface)",
                  border:
                    msg.role === "user"
                      ? "1px solid rgba(255,106,26,0.08)"
                      : "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color:
                      msg.role === "user"
                        ? "var(--color-text)"
                        : "var(--color-text-2)",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.role === "assistant" ? (
                    <>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--color-text)",
                          marginBottom: 4,
                          fontSize: "0.82rem",
                        }}
                      >
                        ✦ Generated
                      </div>
                      {msg.text}
                      {msg.config && (
                        <div
                          style={{
                            marginTop: 8,
                            display: "flex",
                            gap: 4,
                            flexWrap: "wrap",
                          }}
                        >
                          {getRefinementChips(msg.config).map((chip) => (
                            <button
                              key={chip.action}
                              onClick={() => handleRefine(chip.action)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 3,
                                padding: "3px 8px",
                                borderRadius: 6,
                                border: "1px solid rgba(255,106,26,0.12)",
                                background: "rgba(255,106,26,0.04)",
                                color: "var(--color-text-2)",
                                fontSize: "0.68rem",
                                cursor: "pointer",
                                fontFamily: "var(--font-sans)",
                                fontWeight: 500,
                                transition: "all 0.15s",
                              }}
                            >
                              {chip.icon} {chip.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <span style={{ color: "var(--color-text)" }}>
                      {msg.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {generating && (
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "8px 12px",
                color: "var(--color-text-2)",
                fontSize: "0.8rem",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ff6a1a",
                  animation: "glowPulse 0.8s ease-in-out infinite",
                }}
              />
              Generating component...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "10px 20px",
            borderTop: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div className="ai-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="ai-input"
              placeholder="Describe a UI component..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ fontSize: "0.85rem", padding: "8px 12px" }}
            />
            <button
              type="submit"
              className="ai-submit-btn"
              aria-label="Send"
              disabled={generating || !input.trim()}
              style={{
                width: 36,
                height: 36,
                fontSize: "0.95rem",
                opacity: generating || !input.trim() ? 0.5 : 1,
              }}
            >
              →
            </button>
          </div>
        </form>
      </div>

      {/* ── Right: Preview + Code ──────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Tabs + Theme switcher */}
        <div
          style={{
            padding: "0 20px",
            borderBottom: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 16px",
                border: "none",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #ff6a1a"
                    : "2px solid transparent",
                background: "transparent",
                color:
                  activeTab === tab
                    ? "var(--color-text)"
                    : "var(--color-text-2)",
                fontSize: "0.8rem",
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                transition: "all 0.15s",
              }}
            >
              {tab === "preview" ? "◈ Preview" : "⬡ Code"}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {lastConfig && (
            <div style={{ display: "flex", gap: 4 }}>
              {(["quasar", "aurora", "steins-gate"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setPreviewTheme(t)}
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    border:
                      previewTheme === t
                        ? "1px solid rgba(255,106,26,0.3)"
                        : "1px solid transparent",
                    background:
                      previewTheme === t
                        ? "rgba(255,106,26,0.1)"
                        : "transparent",
                    color:
                      previewTheme === t ? "#ff6a1a" : "var(--color-text-2)",
                    fontSize: "0.6rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                    textTransform: "capitalize",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: 20,
            background: "var(--color-bg)",
          }}
        >
          {lastConfig ? (
            <>
              {activeTab === "preview" && (
                <div
                  data-theme={previewTheme}
                  className="glass-card"
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(255,106,26,0.08)",
                    animation:
                      "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 14px",
                      background: "rgba(13,5,8,0.5)",
                      borderBottom: "1px solid rgba(255,106,26,0.06)",
                    }}
                  >
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                      <div
                        key={c}
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: c,
                        }}
                      />
                    ))}
                    <span
                      style={{
                        marginLeft: 6,
                        fontSize: "0.62rem",
                        color: "var(--color-muted)",
                      }}
                    >
                      Live Preview — {previewTheme} theme
                    </span>
                    <div style={{ flex: 1 }} />
                    <span
                      style={{
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        color: "#22c55e",
                        background: "rgba(34,197,94,0.1)",
                        padding: "1px 6px",
                        borderRadius: 4,
                        border: "1px solid rgba(34,197,94,0.2)",
                      }}
                    >
                      Interactive
                    </span>
                  </div>
                  <div
                    style={{
                      padding: 0,
                      background: "var(--color-bg)",
                    }}
                  >
                    <LivePreview config={lastConfig} theme={previewTheme} />
                  </div>
                </div>
              )}

              {activeTab === "code" && (
                <div
                  style={{
                    display: "flex",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    animation:
                      "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
                    height: "calc(100vh - 200px)",
                    maxHeight: "calc(100vh - 200px)",
                  }}
                >
                  {/* File Tree Sidebar — VS Code style */}
                  <div
                    style={{
                      width: 220,
                      flexShrink: 0,
                      background: "#0a0a0f",
                      borderRight: "1px solid rgba(255,106,26,0.06)",
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 14px",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        color: "var(--color-text-2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        borderBottom: "1px solid rgba(255,106,26,0.04)",
                      }}
                    >
                      EXPLORER
                    </div>
                    <div style={{ padding: "4px 0" }}>
                      {VITE_FILE_TREE.map((item) => (
                        <div
                          key={item.path || item.label}
                          onClick={() => item.path && setCodeFile(item.path)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "5px 14px",
                            paddingLeft: 14 + item.indent * 16,
                            cursor: item.path ? "pointer" : "default",
                            background:
                              item.path && codeFile === item.path
                                ? "rgba(255,106,26,0.08)"
                                : "transparent",
                            borderLeft:
                              item.path && codeFile === item.path
                                ? "2px solid #ff6a1a"
                                : "2px solid transparent",
                            fontSize: "0.78rem",
                            color:
                              item.path && codeFile === item.path
                                ? "#ff6a1a"
                                : "var(--color-text)",
                            fontWeight:
                              item.path && codeFile === item.path ? 600 : 400,
                            fontFamily: "var(--font-mono)",
                            transition: "all 0.1s",
                            userSelect: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (item.path)
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.03)";
                          }}
                          onMouseLeave={(e) => {
                            if (item.path)
                              e.currentTarget.style.background =
                                codeFile === item.path
                                  ? "rgba(255,106,26,0.08)"
                                  : "transparent";
                          }}
                        >
                          <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>
                            {item.icon}
                          </span>
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Content */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 14px",
                        background: "rgba(13,5,8,0.6)",
                        borderBottom: "1px solid rgba(255,106,26,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.62rem",
                          color: "var(--color-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {codeFile}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeCode);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          padding: "3px 8px",
                          borderRadius: 6,
                          border: "1px solid rgba(255,106,26,0.12)",
                          background: "transparent",
                          color: "var(--color-text-2)",
                          fontSize: "0.65rem",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                        }}
                      >
                        Copy
                      </button>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        padding: "14px 16px",
                        background: "#010103",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        lineHeight: 1.6,
                        color: "#e2e8f0",
                        overflow: "auto",
                        flex: 1,
                      }}
                    >
                      <code>{activeCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                color: "var(--color-muted)",
              }}
            >
              <div
                style={{ fontSize: "2.5rem", marginBottom: 12, opacity: 0.2 }}
              >
                ✦
              </div>
              <p
                style={{ fontSize: "0.85rem", maxWidth: 280, lineHeight: 1.5 }}
              >
                Select a prompt on the left to see a live preview and generated
                code here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
