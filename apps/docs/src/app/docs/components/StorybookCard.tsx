"use client";

const STORYBOOK_URL =
  process.env["NEXT_PUBLIC_STORYBOOK_URL"] ??
  "https://Stareezy-ui-storybook.vercel.app/";

export function StorybookCard() {
  return (
    <a
      href={STORYBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 14,
          padding: "1.25rem 1.5rem",
          marginTop: "1rem",
          cursor: "pointer",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--brand-400)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 0 3px var(--brand-50)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--color-border-2)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "#FF4785",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              flexShrink: 0,
            }}
          >
            ⬡
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--color-text)",
                marginBottom: 2,
              }}
            >
              Open Storybook
            </div>
            <div
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-2)",
                lineHeight: 1.5,
              }}
            >
              Live controls · dark mode toggle · auto-generated prop tables
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: "1.1rem",
            color: "var(--color-text-2)",
            flexShrink: 0,
          }}
        >
          →
        </span>
      </div>
    </a>
  );
}
