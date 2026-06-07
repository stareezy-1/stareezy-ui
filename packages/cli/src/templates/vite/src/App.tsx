import { Box, Button } from "@stareezy-ui/components";
import { t, useThemeSwitch } from "@stareezy-ui/tokens";
import { Providers } from "./providers";

function AppContent() {
  const { theme, setTheme } = useThemeSwitch();

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: t.backgrounds.primaryBlack.value,
      }}
    >
      <Box style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "1rem",
            letterSpacing: "-0.04em",
            color: t.text.primary.value,
          }}
        >
          Welcome to {{ PROJECT_NAME }}
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: t.text.secondary.value,
            marginBottom: "2rem",
            lineHeight: 1.7,
          }}
        >
          Powered by{" "}
          <a
            href="https://ui.stareezy.tech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: t.text.importantBrand.value, fontWeight: 600 }}
          >
            Stareezy UI
          </a>{" "}
          — cross-platform design tokens for React and React Native.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          <Button
            type="Primary"
            text="Get Started"
            onPress={() =>
              window.open("https://ui.stareezy.tech/docs/quick-start", "_blank")
            }
          />
          <Button
            type="Secondary"
            text="Documentation"
            onPress={() => window.open("https://ui.stareezy.tech", "_blank")}
          />
        </div>

        {/* Theme switcher */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {(["light", "dark", "aurora", "steins-gate", "quasar"] as const).map(
            (name) => (
              <button
                key={name}
                onClick={() => setTheme(name)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid ${t.border.primaryBrand.value}`,
                  fontSize: "0.75rem",
                  fontWeight: theme === name ? 700 : 400,
                  opacity: theme === name ? 1 : 0.45,
                  cursor: "pointer",
                  background: "transparent",
                  color: t.text.primary.value,
                  transition: "opacity 0.15s ease",
                }}
              >
                {name}
              </button>
            ),
          )}
        </div>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
