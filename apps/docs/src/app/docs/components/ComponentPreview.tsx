"use client";

import { useState } from "react";

const containerStyle: React.CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "1.5rem",
  margin: "1rem 0",
};

const btnPrimary: React.CSSProperties = {
  background: "linear-gradient(135deg, #ff6a1a, #e05010)",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: 600,
  fontFamily: "var(--font-sans)",
  fontSize: 14,
};

const tagBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "4px 10px",
  borderRadius: 20,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: "var(--font-sans)",
  cursor: "default",
};

export function BreadcrumbPreview() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Shoes" },
  ];
  return (
    <>
      <h3 className="gradient-text" style={{ margin: "1rem 0 0.5rem" }}>Live Preview</h3>
      <div style={containerStyle}>
        <nav aria-label="Breadcrumb" style={{ fontFamily: "var(--font-sans)" }}>
          <ol style={{ display: "flex", listStyle: "none", padding: 0, margin: 0, gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && (
                  <span aria-hidden="true" style={{ color: "var(--color-text-2)", fontSize: 18, lineHeight: 1 }}>›</span>
                )}
                {item.href ? (
                  <a href={item.href} style={{ color: "var(--brand-primary)", textDecoration: "none", fontWeight: 500 }}>
                    {item.label}
                  </a>
                ) : (
                  <span aria-current="page" style={{ color: "var(--color-text)", fontWeight: 700 }}>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}

const drawerBtnStyle: React.CSSProperties = {
  ...btnPrimary,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

export function DrawerPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h3 className="gradient-text" style={{ margin: "1rem 0 0.5rem" }}>Live Preview</h3>
      <div style={containerStyle}>
        <button onClick={() => setOpen(true)} style={drawerBtnStyle}>
          Open drawer
        </button>
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 999,
              }}
            />
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: 320,
                background: "var(--color-surface)",
                borderLeft: "1px solid var(--color-border)",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-4px 0 24px rgba(0,0,0,0.3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid var(--color-border)" }}>
                <span style={{ fontWeight: 700, color: "var(--color-text)", fontSize: 16 }}>Settings</span>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text-2)",
                    cursor: "pointer",
                    fontSize: 20,
                    lineHeight: 1,
                    padding: 4,
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: "1.5rem", color: "var(--color-text)", fontSize: 14, lineHeight: 1.6 }}>
                Drawer content goes here. You can put any content inside the drawer panel.
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function PaginationPreview() {
  const [page, setPage] = useState(1);
  const total = 10;
  return (
    <>
      <h3 className="gradient-text" style={{ margin: "1rem 0 0.5rem" }}>Live Preview</h3>
      <div style={containerStyle}>
        <nav aria-label="Pagination" style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-sans)", flexWrap: "wrap" }}>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            style={{
              background: page === 1 ? "transparent" : "var(--color-surface-2)",
              color: page === 1 ? "var(--color-text-2)" : "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: page === 1 ? "not-allowed" : "pointer",
              fontWeight: 500,
              fontSize: 13,
              opacity: page === 1 ? 0.4 : 1,
            }}
            aria-label="Previous page"
          >
            ‹ Prev
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                background: p === page ? "var(--brand-500)" : "var(--color-surface-2)",
                color: p === page ? "white" : "var(--color-text)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: p === page ? 700 : 500,
                fontSize: 13,
                minWidth: 36,
              }}
              aria-label={`Go to page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(total, page + 1))}
            disabled={page === total}
            style={{
              background: page === total ? "transparent" : "var(--color-surface-2)",
              color: page === total ? "var(--color-text-2)" : "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: page === total ? "not-allowed" : "pointer",
              fontWeight: 500,
              fontSize: 13,
              opacity: page === total ? 0.4 : 1,
            }}
            aria-label="Next page"
          >
            Next ›
          </button>
        </nav>
      </div>
    </>
  );
}

export function TablePreview() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const columns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "email", header: "Email" },
  ];

  const data = [
    { name: "Alice", role: "Engineer", email: "alice@example.com" },
    { name: "Bob", role: "Designer", email: "bob@example.com" },
    { name: "Charlie", role: "PM", email: "charlie@example.com" },
  ];

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey as keyof typeof a];
        const bv = b[sortKey as keyof typeof b];
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <>
      <h3 className="gradient-text" style={{ margin: "1rem 0 0.5rem" }}>Live Preview</h3>
      <div style={containerStyle}>
        <div style={{ overflowX: "auto", fontFamily: "var(--font-sans)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--color-surface-2)" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      borderBottom: "2px solid var(--color-border)",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {col.header}{" "}
                    <span style={{ color: sortKey === col.key ? "var(--brand-primary)" : "var(--color-text-2)", fontSize: 12 }}>
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? "transparent" : "var(--color-surface-2)",
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: "10px 16px",
                        color: "var(--color-text)",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      {row[col.key as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--color-text-2)" }}>
            Click column headers to sort. Current: {sortKey ? `${sortKey} (${sortDir})` : "none"}
          </p>
        </div>
      </div>
    </>
  );
}

const tagVariants = [
  { label: "Neutral", style: { background: "var(--color-surface-2)", color: "var(--color-text)" } },
  { label: "Primary", style: { background: "var(--brand-500)", color: "white" } },
  { label: "Success", style: { background: "#22c55e", color: "white" } },
  { label: "Warning", style: { background: "#eab308", color: "#1a1a1a" } },
  { label: "Danger", style: { background: "#dc143c", color: "white" } },
  { label: "Outline", style: { background: "transparent", color: "var(--color-text)", border: "1px solid var(--color-border)" } },
];

export function TagPreview() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design"]);
  return (
    <>
      <h3 className="gradient-text" style={{ margin: "1rem 0 0.5rem" }}>Live Preview</h3>
      <div style={containerStyle}>
        <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--color-text-2)", fontWeight: 500 }}>Variants</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {tagVariants.map((v) => (
            <span key={v.label} style={{ ...tagBase, ...v.style }}>
              {v.label}
            </span>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-2)", fontWeight: 500 }}>Removable tags</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span key={tag} style={{ ...tagBase, background: "var(--brand-500)", color: "white" }}>
                {tag}
                <button
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  aria-label={`Remove ${tag}`}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 14,
                    padding: 0,
                    lineHeight: 1,
                    opacity: 0.8,
                  }}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "var(--color-text-2)", fontSize: 13 }}>All tags removed.</span>
              <button
                onClick={() => setTags(["React", "TypeScript", "Design"])}
                style={{
                  background: "linear-gradient(135deg, #ff6a1a, #e05010)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  alignSelf: "flex-start",
                }}
              >
                Reset tags
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function TooltipPreview() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <h3 className="gradient-text" style={{ margin: "1rem 0 0.5rem" }}>Live Preview</h3>
      <div style={containerStyle}>
        <div
          style={{ position: "relative", display: "inline-block" }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <button
            style={btnPrimary}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
          >
            Hover or focus me
          </button>
          {visible && (
            <div
              role="tooltip"
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--color-bg)",
                color: "var(--color-text)",
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                border: "1px solid var(--color-border)",
                zIndex: 10,
              }}
            >
              Save your changes
            </div>
          )}
        </div>
        <span style={{ marginLeft: 16, color: "var(--color-text-2)", fontSize: 13, fontFamily: "var(--font-sans)" }}>
          Hover or focus the button to see the tooltip
        </span>
      </div>
    </>
  );
}
