// Server Component — uses the RSC-safe server entry (no "use client" needed)
import { Box } from "@quasify-ui/components/server";
import { HeroSection } from "./hero-section";

export default function Home() {
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Box style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "1rem",
            letterSpacing: "-0.04em",
          }}
        >
          Welcome to {{ PROJECT_NAME }}
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            opacity: 0.7,
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Powered by{" "}
          <a
            href="https://ui.quasify.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600 }}
          >
            Quasify UI
          </a>{" "}
          — a cross-platform design token system for React and React Native.
        </p>

        {/* Interactive client component — uses hooks, Button with onPress */}
        <HeroSection />
      </Box>
    </Box>
  );
}
