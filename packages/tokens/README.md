# @stareezy-ui/tokens

The design token foundation for Stareezy UI. Zero dependencies — works in any JavaScript environment.

[![npm](https://img.shields.io/npm/v/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)

## Install

```bash
pnpm add @stareezy-ui/tokens
# or
npm install @stareezy-ui/tokens
```

## Usage

### Token objects

Every design value is a typed `Token<T>` object:

```ts
import { colors, spacing, radius, typography } from "@stareezy-ui/tokens";

colors.celurenBlue[500].id; // "celurenBlue-500"
colors.celurenBlue[500].value; // "#024CCE"

spacing[4].value; // 4
radius.md.value; // 8
```

### Theme system

```tsx
import { ThemeProvider, useTheme, useThemeSwitch } from "@stareezy-ui/tokens";

// Wrap your app
<ThemeProvider theme="light">
  <App />
</ThemeProvider>;

// Read theme tokens
function MyComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.text.primary.value }} />;
}

// Toggle theme
function ThemeToggle() {
  const { toggleTheme, isDark } = useThemeSwitch();
  return <button onClick={toggleTheme}>{isDark ? "☀" : "☾"}</button>;
}
```

### Custom configuration

```ts
import { createUi, token } from "@stareezy-ui/tokens";

const ui = createUi({
  tokens: {
    brand: {
      primary: token("#FF6B35", "brand-primary"),
      secondary: token("#004E89", "brand-secondary"),
    },
  },
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
  defaultTheme: "light",
});

// Full type safety on custom tokens
ui.tokens.brand.primary.value; // "#FF6B35"
```

## Token categories

| Export           | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `colors`         | Full color palette (celurenBlue, raisinBlack, lawnGreen, etc.) |
| `semanticColors` | Role-based colors (text.primary, backgrounds.disabled, etc.)   |
| `spacing`        | Spacing scale 0–480px + named aliases                          |
| `radius`         | Border radius scale (none → full)                              |
| `roundness`      | Alternative radius scale                                       |
| `typography`     | Font families, sizes, weights                                  |
| `shadow`         | Box shadow presets                                             |
| `timing`         | Animation timing values                                        |
| `palette`        | Raw color palette                                              |
| `sp`, `ss`, `w`  | Scale primitive, spacing scale, widths                         |

## Serialization

```ts
import { serializeToken, deserializeToken } from "@stareezy-ui/tokens";

const json = serializeToken(colors.celurenBlue[500]);
const token = deserializeToken(json); // structurally equal to original
```

## License

MIT
