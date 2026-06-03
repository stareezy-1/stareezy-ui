# @stareezy-ui/core

## 0.3.2

### Patch Changes

- Updated dependencies
  - @stareezy-ui/tokens@0.4.2

## 0.3.1

### Patch Changes

- fix custom shorthands&media not working & update cli templates
- Updated dependencies
  - @stareezy-ui/tokens@0.4.1

## 0.3.0

### Minor Changes

- # v0.4 — Stabilization & CLI Release

  ## @stareezy-ui/tokens

  - `createUi({ media, shorthands })` now preserves literal media keys via `TMedia` generic — drives `ConfigBreakpointKey` inference
  - Added `SzrCustomConfig` module-augmentation interface with `media` and `shorthands` fields
  - Added `DefaultBreakpointKey`, `ConfigBreakpointKey`, `MediaConfig`, `ShorthandConfig`, `SzrShorthands` exports
  - Added `applyRuntimeBreakpoints(resolved)` — writes to `globalThis.__stareezy_breakpoints__` without importing components/runtime
  - `createUi` now auto-syncs `media` into the runtime breakpoint store on call; leaves defaults untouched when `media` is absent
  - Added `react: "^18 || ^19"` as optional peerDependency

  ## @stareezy-ui/components

  ### Config-driven responsive type system

  - `BreakpointKey` now re-exports `ConfigBreakpointKey` from tokens — derives from `SzrCustomConfig["media"]` augmentation
  - `Responsive<T>` and all runtime helpers iterate resolved `BreakpointConfig` keys (not a hardcoded list)
  - `configureBreakpoints`/`getBreakpoints` read from `globalThis.__stareezy_breakpoints__` on first access
  - `CustomShorthandProps` values wrapped in `Responsive<T>` — `<Box br={{ base: 4, md: 8 }} />` is now valid
  - Added `BreakpointPropKey`, `BoxStylePropsPartial`, `BreakpointProps` — `$sm`, `$md`, `$lg`... props on `BoxProps`
  - `resolveWebProps`: `$`-group pass runs after responsive-object pass; `$`-group wins on same-breakpoint collision
  - `resolveNativeProps`: `$`-group mobile-first cascade via `windowWidth >= threshold`
  - Added `BoxLayoutProps` and `extractBoxLayoutProps` to `components/shared`
  - Every component extends `BoxLayoutProps` and forwards layout props to its root element

  ### RSC server entry

  - New `./server` export: hook-free `Box`, `View`, `Stack`, `Text`, `Divider` resolving ThemeTokens via `var(--szr-path)`
  - `scripts/check-server-purity.mjs` — build-time guard asserting no hooks/context in the server module graph

  ### Six new components

  - `Breadcrumb` — nav/aria-current, custom separator
  - `Pagination` — prev/next, ellipsis, aria-current="page"
  - `Table` — semantic `<table>`, `<th scope="col">`, native accessibilityRole
  - `Tag` — solid/outline/subtle variants, dismissible
  - `Tooltip` — hover/focus triggered, role="tooltip", aria-describedby, native accessibilityHint
  - `Drawer` — role="dialog", aria-modal, focus trap, Escape key, anchor left/right/bottom

  ### Theme-reactivity migration

  - All existing components migrated off module-scope `colors.*` / `aurora.*` reads
  - `useThemedColors()` extended with 17 new semantic slots (bgSelected, focusRing, colorSuccess/Danger/Warning/Info, glowGreen/Purple, etc.)
  - `Avatar.gradients.ts` — decorative gradient constants extracted as theme-independent
  - `Card`, `Badge`, `Toast` migrated from aurora palette to `make*Styles(themed)` factories
  - `Accordion`, `Tabs`, `Spinner`, `Switch`, `Modal`, `Dropdown` and all remaining components migrated

  ### Visual spec

  - `shared/visualSpec.ts` — shared INTERACTION, BORDER, FOCUS_RING, ELEVATION, TYPE_SCALE, GAP, RADIUS constants
  - All component `.style.ts` files updated to use spec constants

  ### Accessibility

  - Button/Checkbox: `onFocus`/`onBlur` focus ring via `themed.focusRing`
  - Modal/Drawer: focus trap, Escape dismiss, `aria-modal`, `aria-labelledby`
  - `shared/injectFocusStyles.ts` — `[data-szr-close]:focus-visible` CSS rule

  ### Quality

  - `scripts/check-no-hardcoded-colors.mjs` — package-wide guard (all 30 component dirs)
  - Chromatic CI workflow added (`chromatic.yml`)
  - Bundle size budget: 150 kB components, 80 kB compiler (`size-limit`, `bundle-size.yml`)
  - 3 property-based test files, 6 properties, ≥100 iterations each
  - Storybook stories for all 6 new components + refreshed existing stories

  ### Compatibility

  - `react`/`react-dom`: `"^18 || ^19"`, `react-native`: `">=0.81 <0.87"` across all packages
  - `peerDependenciesMeta` optional flags added

  ## @stareezy-ui/compiler

  - Vite plugin and Metro transformer error paths now report transform stage + source location (`stage failed at file:line:col`)
  - `vite`: `">=4.0.0 <8"` peerDependency (covers Vite 4–7)

  ## @stareezy-ui/cli (new package)

  - `stareezy create <name> --template next|vite|expo` — scaffold pre-wired projects
  - `stareezy init` — idempotent wiring (stareezy.config.ts, compiler, ThemeProvider)
  - `stareezy add <component...>` — transitive dep resolution via registry, installs missing `@stareezy-ui/*` packages
  - Templates: Next.js 15 + React 19, Vite 7 + React 19, Expo SDK 56 + RN 0.85
  - Component registry: 20 components with `componentDeps` + `packageDeps` graph
  - Framework/package-manager detection via lockfile + package.json heuristics

  ## Integration & CI

  - `integration/next-app-14`, `15`, `16` — Next.js App Router production build tests
  - `integration/vite-app` — Vite 4/5/6/7 CI matrix
  - `integration/expo-app-54`, `55`, `56` — Expo SDK production build tests
  - `compatibility.yml` — GitHub Actions matrix (11 cells: Next 14/15/16, Vite 4/5/6/7, Expo 54/55/56)
  - `scripts/check-peer-ranges.mjs` — static peerDep range assertion
  - `pnpm-workspace.yaml` — added `integration/*`

  ## Documentation

  - `apps/docs`: 13 new pages — Responsive System, SzrCustomConfig, BoxLayoutProps, Server Components, CLI, Compatibility, API Reference, + 6 new component references
  - `theming/page.tsx` — expanded to cover all 5 themes, theme-reactivity, semantic slot table
  - `SidebarNav.tsx` — all new pages wired into navigation
  - `README.md` — fully rewritten to reflect v0.4

### Patch Changes

- Updated dependencies
  - @stareezy-ui/tokens@0.4.0

## 0.2.6

### Patch Changes

- Updated dependencies
  - @stareezy-ui/tokens@0.3.0

## 0.2.5

### Patch Changes

- update changelog
- Updated dependencies
  - @stareezy-ui/tokens@0.2.6

## 0.2.4

### Patch Changes

- Updated dependencies
  - @stareezy-ui/tokens@0.2.4

## 0.2.3

### Patch Changes

- Ensure CDN bundles are included in published packages
- Updated dependencies
  - @stareezy-ui/tokens@0.2.3

## 0.2.2

### Patch Changes

- # create a patch changeset (describe: "Add CDN IIFE bundles")
- Updated dependencies
  - @stareezy-ui/tokens@0.2.2

## 0.1.0

### Minor Changes

- ffc8daa: Initial release of Stareezy UI — typed design token system and component library for React Native and web.

  - `@stareezy-ui/tokens`: Token factory, color/spacing/radius/typography/shadow/timing tokens, theme system, `createUi`
  - `@stareezy-ui/core`: Utilities and hooks
  - `@stareezy-ui/runtime`: O(1) style registry with web and React Native adapters
  - `@stareezy-ui/stylesheet`: Atomic CSS sheet management and CSS variable injection
  - `@stareezy-ui/compiler`: Babel/Vite build-time transform plugin for token extraction
  - `@stareezy-ui/components`: 17+ cross-platform components built on the token system

### Patch Changes

- Updated dependencies [ffc8daa]
  - @stareezy-ui/tokens@0.1.0
