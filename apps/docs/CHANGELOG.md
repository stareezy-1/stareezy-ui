# @stareezy-ui/docs

## 0.2.0

### Minor Changes

- **Aurora theme system** — docs site now defaults to the aurora dark theme on first load. Three-way theme toggle (◉ aurora / ◑ dark / ○ light) persists to `localStorage` under `szr-docs-theme`. Flash-of-wrong-theme prevented via inline script in `<head>`.

- **Home page redesign** — completely rebuilt with:

  - Two-column hero with aurora gradient headline and ambient glow blobs
  - Aurora token palette strip with color swatches
  - Packages bento grid — 6 cards with per-package color accents
  - Quick links grid with icons (8 destinations including new `useUiConfig` guide)
  - Install strip with copyable pnpm command

- **New `useUiConfig` guide** at `/docs/use-ui-config` — covers `UiConfigProvider` setup, accessing themes/fonts/media/animations/shorthands, fallback behavior, and full API reference.

- **`createUi` page updated** — documents all 6 new config fields: `fonts`, `media`, `animations`, `themes`, `settings`, `shorthands`. PropRow tables updated with `getTokens()`, `getTheme()`, `getFont()`, `getMedia()`, and `shorthands`.

- **Token docs pages** — new pages at `/tokens/aurora`, `/tokens/motion`, `/tokens/glow` with visual previews and usage examples.

- **Token explorer updated** — aurora, motion, and glow token groups added to the explorer with color swatches, duration bars, and glow preview cards.

- **Fonts** — Inter and JetBrains Mono loaded via `next/font/google` with CSS variable injection (`--font-inter`, `--font-jetbrains-mono`).

- **Scroll-aware header** — `AppHeader` increases backdrop blur from `8px` to `20px` when `scrollY > 20`.

- **Mobile drawer nav** — sidebar becomes a full-height drawer below 768px with hamburger toggle.

- **Sitemap updated** — new routes: `/docs/use-ui-config`, `/tokens/aurora`, `/tokens/motion`, `/tokens/glow`.

## 0.1.0

### Minor Changes

- ffc8daa: Initial release of the Stareezy UI documentation site.

  - Next.js 14 App Router
  - Documentation pages: installation, usage, theming, compiler, createUi, components, architecture, migration
  - Token explorer at `/tokens`
  - Playground at `/playground`
  - Light-first design with celurenBlue brand colors
