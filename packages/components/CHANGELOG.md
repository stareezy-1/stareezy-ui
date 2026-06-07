# @stareezy-ui/components

## 1.1.2

### Patch Changes

- add new docs & fix sx props logic
- Updated dependencies
  - @stareezy-ui/runtime@1.1.1
  - @stareezy-ui/tokens@1.1.1
  - @stareezy-ui/core@1.1.1

## 1.1.0

### Minor Changes

- feat(components,stylesheet): sx prop, responsive stylesheet, SzrFC compat fix

  ## @stareezy-ui/components — minor

  ### sx prop (all 34 components + Box)

  - Add `sx?: SxProp` to BoxProps, BoxLayoutProps, and every component interface
  - `sx` injects styles directly onto each component's own root element — no wrapper
    element is ever created for sx, not even for responsive values
  - Web: static sx values merged into inline style; responsive values + $-group syntax
    emit scoped @media rules via SxStyleTag (injected into <head>, cleaned on unmount)
  - Native: responsive values resolved against Dimensions.get("window").width at render
  - sx wins on collision with component-level style props
  - Box merges sx into resolvedProps before its resolver runs — all token refs,
    ThemeTokens, responsive objects, and $-breakpoint groups resolve through Box's
    full pipeline

  ### useSx hook + SxStyleTag

  - `shared/useSx.ts` — `useSx(sx)` returns { sxStyle, sxClassName, sxCss }
    - Web: resolves via resolveSxWeb() → inline style + @media CSS string
    - Native: resolves via resolveSxNative() → flat style object
  - `SxStyleTag` — hook-only component, injects a <style data-szx> tag and cleans up
    on unmount. Used alongside SxStyleTag when sxCss is non-empty.

  ### SxProp type

  - `shared/sx.ts` — SxProp picks all style-related BoxProps keys plus:
    - Raw React.CSSProperties pass-through (boxShadow, fontFamily, textDecoration,
      animation, transition, filter, backdropFilter, etc.)
    - React Native style keys (elevation, tintColor, textAlignVertical, etc.)
    - Index signature escape hatch for any other raw style key
  - resolveSxWeb / resolveSxNative — full responsive resolver, reads from
    **stareezy_breakpoints** (same channel as Box), handles $-group syntax

  ### componentSheet utility

  - `shared/componentSheet.ts` — singleton #szc-components style tag for registering
    static geometry CSS classes from .style.ts files
  - registerClasses(), registerKeyframes(), toCssDeclarations() helpers
  - All 30 .style.ts files updated to export \*Classes records

  ### SzrFC — React 18/19 compatible component type

  - Replace React.FC<P> with SzrFC<P> across all 34 exported components
  - SzrFC = ((props: P) => ReactElement | null) & { displayName?: string }
  - Fixes "Box cannot be used as a JSX component" when consumer @types/react version
    differs from library (@types/react@19 made ReactPortal.children non-optional)
  - SzrFC exported from package index

  ### New exports

  - SxProp, SzrFC, extractBoxLayoutProps (sxProps + sxStyle + sxClassName + sxCss)

  ### Build fix

  - Resolve dist/index.d.ts missing after rebuild — all TS17001 duplicate attribute
    errors fixed (sxStyle merged into existing style objects, not added as second prop)

  ## @stareezy-ui/stylesheet — minor

  - injectResponsive(className, value, cssProperties) — responsive @media injection
  - injectComponentStyle(className, propEntries) — batch version
  - injectRaw(css) — inject pre-built CSS string, deduplicated
  - reset() — remove all style tags, clear dedup state
  - buildResponsiveCss / buildComponentCss — build CSS without touching DOM
  - buildBreakpointEntries — convert responsive map to sorted { minWidth, value } entries
  - resolveResponsive(value, windowWidth) — React Native helper
  - isResponsiveValue(value) — type guard
  - getBreakpoints() — reads from **stareezy_breakpoints** global channel
  - buildScopeClass(uid) — builds szr-<uid> scope class
  - #sz-responsive dedicated style tag with per-breakpoint deduplication

### Patch Changes

- Updated dependencies
  - @stareezy-ui/runtime@1.1.0
  - @stareezy-ui/tokens@1.1.0
  - @stareezy-ui/core@1.1.0

## 1.0.1

### Patch Changes

- ## stylesheet — responsive media query support

  The stylesheet package now fully mirrors Box's breakpoints/media system.

  **New APIs:**

  - `injectResponsive(className, value, cssProperties)` — injects base + `@media(min-width:Npx)` rules from a responsive value object `{ base, sm, md, lg, xl, "2xl" }`
  - `injectComponentStyle(className, propEntries)` — batch version for multiple props
  - `injectRaw(css)` — inject a pre-built CSS string, deduplicated
  - `reset()` — remove all style tags and clear dedup state (useful in tests)
  - `buildResponsiveCss(selector, value, cssProps)` — build CSS string without touching the DOM
  - `buildComponentCss(className, propEntries)` — build a full responsive block
  - `buildBreakpointEntries(value)` — convert a responsive map to sorted `{ minWidth, value }` entries
  - `resolveResponsive(value, windowWidth)` — React Native helper
  - `isResponsiveValue(value)` — type guard
  - `getBreakpoints()` — returns the breakpoint map synced from `createUi({ media })`
  - `buildScopeClass(uid)` — builds a `szr-<uid>` scope class name

  Responsive rules are written to a new dedicated `#sz-responsive` style tag and deduplicated per class+property+breakpoint. Breakpoints are read from `globalThis.__stareezy_breakpoints__` — the same channel `createUi({ media })` writes — so stylesheet rules always stay in sync with Box's responsive props.

  ## components — sx prop + React cross-version compatibility

  ### sx prop

  Every component (including `Box` itself) now accepts an `sx` prop. It works like Tamagui/Chakra's `sx`: pass any Box style prop and it is applied on top of the component's own styles. `sx` values win on collision.

  ```tsx
  // Responsive, token-aware, breakpoint-grouped — all fully supported
  <Button sx={{ mt: { base: 8, md: 16 }, alignSelf: "flex-end" }} />
  <Card sx={{ rounded: radius.xl, bg: colors.celurenBlue[25] }} />
  <Box sx={{ $md: { flexDirection: "row", gap: 16 } }}>…</Box>
  ```

  **How it works:**

  - On components that use `extractBoxLayoutProps` (Badge, Button, Card, Input, etc.): `sx` contents are extracted into `sxProps` and spread onto the Box wrapper alongside `layout` props. Box resolves everything through its full pipeline.
  - On components that spread `...boxProps` directly onto Box (Accordion, Avatar, Spinner, Tabs, etc.): `sx` is destructured and spread as `{...sx}` on the root Box.
  - On Box itself: `sx` contents are merged into `resolvedProps` at the top of the function body before any resolver runs. `sx` keys override matching top-level props.

  `sx` is typed as `SxProp` — a subset of `BoxProps` covering all style keys (spacing, sizing, flex, colors, borders, position, visual, responsive objects, `$`-breakpoint groups, custom shorthands). Interaction handlers, accessibility props, and `children` are excluded.

  ### SzrFC — React 18/19 compatible component type

  Replaced `React.FC<P>` with `SzrFC<P>` across all 34 exported components. `SzrFC` is defined as:

  ```ts
  type SzrFC<P> = ((props: P) => React.ReactElement | null) & {
    displayName?: string;
  };
  ```

  This resolves the `'Box' cannot be used as a JSX component` error that occurred when a consuming project used a different `@types/react` version than the library. `React.FC` in `@types/react@19` changed its return type in a way that breaks consumers on React 18 types (the `ReactPortal.children` non-optional issue). `SzrFC` is stable across React 16, 17, 18, and 19.

  `SzrFC` is exported from the package for consumers who need it.

  ### componentSheet shared utility

  Added `src/shared/componentSheet.ts` — a singleton style tag manager (`#szc-components`) for registering static geometry CSS classes from `.style.ts` files. All `.style.ts` files updated to export `*Classes` records via `registerClasses()`.

  ### New exports

  - `SxProp` — the sx prop type
  - `SzrFC` — the React-version-agnostic component function type

  ## cli — upstream scaffolder integration

  `stareezy create` now delegates to the official framework scaffolders instead of copying a static template:

  - `next` → `npx create-next-app@latest <name> --typescript --app --no-tailwind`
  - `vite` → `npx create-vite@latest <name> --template react-ts`
  - `expo` → `npx create-expo-app@latest <name> --template blank-typescript`

  After the upstream scaffolder completes, `@stareezy-ui/*` packages are installed and `stareezy init` runs automatically to layer on `stareezy.config.ts`, compiler wiring, and ThemeProvider. Package manager (`pnpm`/`yarn`/`bun`/`npm`) is detected from the caller's lockfile.

  ## compiler — Vite plugin production-only

  The Vite template and `init` wiring now use the production-only plugin pattern:

  ```ts
  // vite.config.ts
  export default defineConfig(({ command }) => ({
    plugins: [...(command === "build" ? [stareezyVitePlugin()] : []), react()],
  }));
  ```

  This avoids `@babel/traverse` CJS/ESM interop issues in Vite's dev transform pipeline. Box's inline responsive style injection handles dev-time styling without the compiler.

  ## tokens — @types/react alignment

  Downgraded `@types/react` devDep from `^19.0.0` to `^18.3.0` to match the rest of the monorepo and prevent the dual-version type conflict described above.

- Updated dependencies
  - @stareezy-ui/stylesheet@1.0.1
  - @stareezy-ui/runtime@1.0.1
  - @stareezy-ui/tokens@1.0.1
  - @stareezy-ui/core@1.0.1

## 1.0.0

### Major Changes

- # v1.0.0 — Stabilization & CLI Release

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
  - @stareezy-ui/runtime@1.0.0
  - @stareezy-ui/tokens@1.0.0
  - @stareezy-ui/core@1.0.0

## 0.3.2

### Patch Changes

- Updated dependencies
  - @stareezy-ui/tokens@0.4.2
  - @stareezy-ui/core@0.3.2
  - @stareezy-ui/runtime@0.3.2

## 0.3.1

### Patch Changes

- fix custom shorthands&media not working & update cli templates
- Updated dependencies
  - @stareezy-ui/runtime@0.3.1
  - @stareezy-ui/tokens@0.4.1
  - @stareezy-ui/core@0.3.1

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
  - @stareezy-ui/runtime@0.3.0
  - @stareezy-ui/core@0.3.0

## 0.2.12

### Patch Changes

- Updated dependencies
  - @stareezy-ui/tokens@0.3.0
  - @stareezy-ui/core@0.2.6
  - @stareezy-ui/runtime@0.2.6

## 0.2.11

### Patch Changes

- update changelog
- Updated dependencies
  - @stareezy-ui/runtime@0.2.5
  - @stareezy-ui/tokens@0.2.6
  - @stareezy-ui/core@0.2.5

## 0.2.4

### Patch Changes

- add steins:gate theme & update docs
- Updated dependencies
  - @stareezy-ui/tokens@0.2.4
  - @stareezy-ui/core@0.2.4
  - @stareezy-ui/runtime@0.2.4

## 0.2.3

### Patch Changes

- Ensure CDN bundles are included in published packages
- Updated dependencies
  - @stareezy-ui/runtime@0.2.3
  - @stareezy-ui/tokens@0.2.3
  - @stareezy-ui/core@0.2.3

## 0.2.2

### Patch Changes

- # create a patch changeset (describe: "Add CDN IIFE bundles")
- Updated dependencies
  - @stareezy-ui/core@0.2.2
  - @stareezy-ui/runtime@0.2.2
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
  - @stareezy-ui/core@0.1.0
  - @stareezy-ui/runtime@0.1.0
