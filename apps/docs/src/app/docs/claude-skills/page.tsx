import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Skills for Claude",
  description:
    "Teach Claude how to build UIs with Stareezy UI — install skills that give Claude deep knowledge of your design tokens, components, and theming system.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/claude-skills" },
};

const sectionHeader: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "2.5rem 0 0.75rem",
  color: "var(--color-text)",
};

const codeBlock: React.CSSProperties = {
  background: "var(--color-code-bg)",
  borderRadius: 12,
  padding: "1.5rem",
  overflowX: "auto" as const,
  margin: "1.5rem 0",
  border: "1px solid var(--brand-100)",
  boxShadow: "var(--shadow-md)",
};

const codeBlockInner: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.875rem",
  color: "var(--color-text)",
  lineHeight: 1.7,
  whiteSpace: "pre" as const,
};

const glassCard: React.CSSProperties = {
  background: "var(--color-surface-2)",
  backdropFilter: "blur(12px)",
  border: "1px solid var(--brand-100)",
  borderRadius: 16,
  padding: "1.5rem",
  boxShadow: "var(--shadow-md)",
};

const skillGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "1rem",
  margin: "1.5rem 0",
};

export default function ClaudeSkillsPage() {
  return (
    <DocPage
      title="Skills for Claude"
      description="Give Claude AI assistants deep knowledge of the Stareezy UI design system — tokens, components, themes, and best practices."
      badge="AI"
      badgeColor="#a855f7"
      icon="✦"
    >
      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Overview
      </h2>
      <p>
        Claude skills are curated instruction files that teach Claude AI
        assistants how to build UIs with Stareezy UI. When you install a skill,
        Claude gains deep knowledge of your design tokens, component APIs,
        theming capabilities, and architectural patterns — enabling it to
        generate accurate, on-brand code without hallucinations or guesswork.
      </p>

      <Callout type="tip">
        Skills work with both <strong>Claude Desktop</strong> and{" "}
        <strong>Claude Code</strong>. They are framework-agnostic — use them
        alongside any Stareezy UI project.
      </Callout>

      {/* ── Available Skills ─────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Available Skills
      </h2>
      <p>
        Four skills are available, each focused on a specific area of the
        Stareezy UI ecosystem. Install the ones most relevant to your workflow,
        or install all four for complete coverage.
      </p>

      <div style={skillGrid}>
        <div className="glass-card" style={glassCard}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
            }}
            className="gradient-text"
          >
            Design Token Expert
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Complete knowledge of the token system — color palette, spacing
            scale, typography hierarchy, breakpoints, shadows, and the{" "}
            <code style={{ fontSize: "0.82rem" }}>t.*</code> runtime accessor
            pattern.
          </p>
        </div>

        <div className="glass-card" style={glassCard}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
            }}
            className="gradient-text"
          >
            Component Library
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            All 31+ components — their props, type signatures, usage patterns,
            composition examples, and server/client rendering requirements.
          </p>
        </div>

        <div className="glass-card" style={glassCard}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
            }}
            className="gradient-text"
          >
            Theme Master
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Understanding of all 5 built-in themes (aurora, dark, light,
            steins-gate, quasar), how to create custom themes, theme
            inheritance, and dynamic theme switching.
          </p>
        </div>

        <div className="glass-card" style={glassCard}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
            }}
            className="gradient-text"
          >
            Best Practices
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Responsive design with the <code>sx</code> prop, server component
            patterns, performance optimization with the compiler, and
            accessibility guidelines.
          </p>
        </div>
      </div>

      <Callout type="info">
        All skill files are open source and available on GitHub. You can review,
        fork, or contribute to them directly.
      </Callout>

      {/* ── Installation ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Installation
      </h2>
      <p>
        Install skills in three steps. The process is identical for Claude
        Desktop and Claude Code.
      </p>

      <Step n={1} title="Download the skill files">
        <p style={{ marginBottom: "0.75rem" }}>
          Clone or download the{" "}
          <a href="https://github.com/stareezy-1/claude-skills">
            stareezy-ui/claude-skills
          </a>{" "}
          repository from GitHub:
        </p>
        <div style={codeBlock}>
          <code
            style={codeBlockInner}
          >{`git clone https://github.com/stareezy-1/claude-skills.git
cd claude-skills
# All skill files are in the ./skills/ directory`}</code>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-2)" }}>
          The repository contains four <code>.md</code> files, one per skill,
          plus a <code>stareezy-ui.json</code> manifest for Claude Desktop.
        </p>
      </Step>

      <Step n={2} title="Add to Claude Desktop / Claude Code config">
        <p style={{ marginBottom: "0.75rem" }}>
          <strong>Claude Desktop</strong> — edit{" "}
          <code style={{ fontSize: "0.82rem" }}>
            claude_desktop_config.json
          </code>{" "}
          (typically at{" "}
          <code style={{ fontSize: "0.82rem" }}>
            ~/Library/Application Support/Claude/
          </code>
          ):
        </p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`{
  "projectSettings": {
    "skills": [
      { "name": "stareezy-tokens", "file": "./skills/tokens.md" },
      { "name": "stareezy-components", "file": "./skills/components.md" },
      { "name": "stareezy-themes", "file": "./skills/themes.md" },
      { "name": "stareezy-best-practices", "file": "./skills/best-practices.md" }
    ]
  }
}`}</code>
        </div>

        <p style={{ margin: "1rem 0 0.75rem" }}>
          <strong>Claude Code</strong> — add the skills to your project&apos;s{" "}
          <code style={{ fontSize: "0.82rem" }}>.claude/settings.json</code>:
        </p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`{
  "skills": [
    "skills/tokens.md",
    "skills/components.md",
    "skills/themes.md",
    "skills/best-practices.md"
  ]
}`}</code>
        </div>

        <Callout type="tip">
          You do not need to install all four skills. Pick the ones relevant to
          your current task — for example, install only the Component Library
          skill when building new UI.
        </Callout>
      </Step>

      <Step n={3} title="Verify installation">
        <p style={{ marginBottom: "0.5rem" }}>
          Ask Claude a question to verify the skills are loaded correctly:
        </p>
        <div style={codeBlock}>
          <code
            style={codeBlockInner}
          >{`"What Stareezy UI tokens are available for spacing?"`}</code>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-2)",
            marginTop: "0.5rem",
          }}
        >
          If the skills are installed, Claude will reference the skill files and
          provide accurate token values from the Stareezy system.
        </p>
      </Step>

      {/* ── Usage Examples ──────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Usage Examples
      </h2>
      <p>
        Once skills are installed, you can prompt Claude with natural language
        to generate Stareezy UI code. Here are some example prompts:
      </p>

      <div
        style={{
          margin: "1.5rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {[
          {
            prompt:
              "Create a card component using Stareezy UI tokens for spacing and theming",
            desc: "Generates a themed card with proper padding, border radius, and shadow tokens",
            icon: "◈",
          },
          {
            prompt:
              "Show me how to use the Button component with all its variants",
            desc: "Returns complete Button API docs with Primary, Secondary, Outline, Ghost, Danger examples",
            icon: "◈",
          },
          {
            prompt:
              "Create a custom theme that extends the quasar theme with corporate colors",
            desc: "Walks through theme inheritance and token overrides with a working config example",
            icon: "◈",
          },
          {
            prompt:
              "Build a responsive dashboard layout using sx props and media queries",
            desc: "Produces a responsive grid layout following Stareezy best practices for server components",
            icon: "◈",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "var(--brand-50)",
              border: "1px solid var(--brand-100)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span
                style={{
                  color: "var(--brand-primary)",
                  flexShrink: 0,
                  fontSize: "0.85rem",
                  marginTop: 2,
                }}
              >
                {item.icon}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  &ldquo;{item.prompt}&rdquo;
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-2)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        For best results, include your{" "}
        <code style={{ fontSize: "0.82rem" }}>stareezy.config.ts</code> in the
        conversation context. This lets Claude reference your actual token
        overrides and custom theme.
      </Callout>

      {/* ── Creating Custom Skills ──────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Creating Custom Skills
      </h2>
      <p>
        You can extend the provided skills or create your own. Skill files are
        plain Markdown with a specific frontmatter format. A minimal custom
        skill looks like:
      </p>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`---
name: my-custom-skill
description: Custom skill for my project's conventions
---

# My Custom Skill

## Component Patterns
- Use the \`PascalCase\` naming convention for all component files
- Import tokens from \`@stareezy-ui/tokens\`
- Always use the \`sx\` prop for responsive styles

## Project-Specific Tokens
\`\`\`ts
// Custom color overrides
const brand = {
  primary:   '#a855f7',
  secondary: '#ff6a1a',
}
\`\`\``}</code>
      </div>

      <p>
        Place your custom skill file in your project and reference it in your
        Claude configuration alongside the official Stareezy skills. Custom
        skills take precedence when they cover overlapping topics.
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap" as const,
          margin: "1.5rem 0",
        }}
      >
        {[
          {
            label: "Name",
            value: "my-custom-skill",
            color: "var(--brand-primary)",
          },
          {
            label: "Format",
            value: "Markdown (.md)",
            color: "var(--brand-accent)",
          },
          {
            label: "Scope",
            value: "Project-level",
            color: "var(--color-text)",
          },
        ].map((tag) => (
          <span
            key={tag.label}
            className="pill-tag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: `color-mix(in srgb, ${tag.color} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${tag.color} 25%, transparent)`,
              borderRadius: 100,
              padding: "0.3rem 0.85rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: tag.color,
              fontFamily: "var(--font-mono)",
            }}
          >
            <span style={{ opacity: 0.6 }}>{tag.label}:</span>
            {tag.value}
          </span>
        ))}
      </div>

      <Callout type="info">
        See the{" "}
        <a href="https://github.com/stareezy-1/claude-skills#creating-custom-skills">
          custom skills guide
        </a>{" "}
        on GitHub for detailed documentation on frontmatter schema, file
        organization, and best practices for writing effective skills.
      </Callout>
    </DocPage>
  );
}
