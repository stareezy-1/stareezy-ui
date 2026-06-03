"use client";
// Client Component — uses the full interactive entry
import { Button } from "@stareezy-ui/components";
import { useThemeSwitch } from "@stareezy-ui/tokens";

export function HeroSection() {
  const { theme, setTheme } = useThemeSwitch();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          flexWrap: "wrap",
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
          marginTop: "0.5rem",
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
                border: "1px solid currentColor",
                fontSize: "0.75rem",
                fontWeight: theme === name ? 700 : 400,
                opacity: theme === name ? 1 : 0.5,
                cursor: "pointer",
                background: "transparent",
              }}
            >
              {name}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
