"use client";

import { type CanvasNode, type StyleKeys, type PropMeta } from "../types";
import { COMPONENT_DEFS, TOKENS_CATEGORIES } from "../data";

interface StyleTabProps {
  sel: CanvasNode;
  showTokens: boolean;
  copiedToken: string;
  onPropChange: (
    id: string,
    key: string,
    value: string | number | boolean,
  ) => void;
  onPosChange: (id: string, x: number, y: number) => void;
  onTokenToggle: () => void;
  onApplyToken: (cat: string, value: string) => void;
  s: StyleKeys;
}

// ─── tiny local helpers (keep raw inputs — no stareezy-ui here per task scope) ──

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: "0.6rem",
        fontWeight: 700,
        color: "var(--color-text-2)",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 4,
        marginTop: 2,
        opacity: 0.7,
      }}
    >
      {label}
    </div>
  );
}

interface RowProps {
  label: string;
  children: React.ReactNode;
}
function Row({ label, children }: RowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.72rem",
        minHeight: 26,
      }}
    >
      <span
        style={{
          width: 70,
          flexShrink: 0,
          color: "var(--color-text-2)",
          fontSize: "0.68rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-surface-2)",
  border: "1px solid var(--color-border)",
  borderRadius: 4,
  padding: "3px 7px",
  color: "var(--color-text)",
  fontSize: "0.72rem",
  outline: "none",
  fontFamily: "var(--font-mono)",
  boxSizing: "border-box",
};

// ─── smart prop field renderer ────────────────────────────────────────────────

interface PropFieldProps {
  meta: PropMeta;
  value: string | number | boolean;
  onChange: (key: string, value: string | number | boolean) => void;
}

function PropField({ meta, value, onChange }: PropFieldProps) {
  const { key, type, options, min, max, step, placeholder } = meta;

  switch (type) {
    case "boolean":
      return (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <div
            role="checkbox"
            aria-checked={!!value}
            onClick={() => onChange(key, !value)}
            style={{
              width: 32,
              height: 17,
              borderRadius: 9999,
              background: value
                ? "var(--brand-primary, #ff6a1a)"
                : "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.15s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 2,
                left: value ? 16 : 2,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: value ? "#fff" : "var(--color-text-2)",
                transition: "left 0.15s",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "0.68rem",
              color: "var(--color-text-2)",
              userSelect: "none",
            }}
          >
            {value ? "on" : "off"}
          </span>
        </label>
      );

    case "select":
      return (
        <select
          style={{ ...inputStyle, cursor: "pointer" }}
          value={String(value ?? "")}
          onChange={(e) => onChange(key, e.target.value)}
        >
          {(options ?? []).map((opt) => (
            <option key={opt} value={opt}>
              {opt || "—"}
            </option>
          ))}
        </select>
      );

    case "color":
      return (
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <input
            type="color"
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              border: "1px solid var(--color-border)",
              padding: 1,
              background: "transparent",
              cursor: "pointer",
              flexShrink: 0,
            }}
            value={
              String(value || "#000000").startsWith("#")
                ? String(value || "#000000")
                : "#000000"
            }
            onChange={(e) => onChange(key, e.target.value)}
          />
          <input
            style={{ ...inputStyle }}
            type="text"
            value={String(value ?? "")}
            placeholder={placeholder ?? "var(--color-*)"}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </div>
      );

    case "range":
      return (
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <input
            type="range"
            style={{
              flex: 1,
              accentColor: "var(--brand-primary, #ff6a1a)",
              minWidth: 0,
            }}
            min={min ?? 0}
            max={max ?? 100}
            step={step ?? 1}
            value={Number(value ?? min ?? 0)}
            onChange={(e) => onChange(key, parseFloat(e.target.value))}
          />
          <span
            style={{
              fontSize: "0.65rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-2)",
              minWidth: 28,
              textAlign: "right",
            }}
          >
            {Number(value ?? min ?? 0)}
          </span>
        </div>
      );

    case "number":
      return (
        <input
          style={inputStyle}
          type="number"
          value={String(value ?? "")}
          placeholder={placeholder ?? String(min ?? 0)}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) =>
            onChange(
              key,
              e.target.value === "" ? 0 : parseFloat(e.target.value),
            )
          }
        />
      );

    case "text":
    default:
      return (
        <input
          style={inputStyle}
          type="text"
          value={String(value ?? "")}
          placeholder={placeholder ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
        />
      );
  }
}

// ─── main StyleTab ────────────────────────────────────────────────────────────

export function StyleTab({
  sel,
  showTokens,
  copiedToken,
  onPropChange,
  onPosChange,
  onTokenToggle,
  onApplyToken,
  s,
}: StyleTabProps) {
  const def = COMPONENT_DEFS.find((c) => c.type === sel.type);
  const propsMeta: PropMeta[] = def?.propsMeta ?? [];

  // group props by their "group" key (falling back to "Props")
  const groups = propsMeta.reduce<Record<string, PropMeta[]>>((acc, m) => {
    const g = m.group ?? "Props";
    (acc[g] ??= []).push(m);
    return acc;
  }, {});

  const handleChange = (key: string, value: string | number | boolean) => {
    onPropChange(sel.id, key, value);
  };

  return (
    <div>
      {/* ── Identity + Position ─────────────────────────────────────── */}
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Row label="Type">
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
              color: "var(--brand-primary, #ff6a1a)",
              opacity: 0.9,
            }}
          >
            {sel.type}
          </span>
        </Row>
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          <Row label="X">
            <input
              style={inputStyle}
              type="number"
              value={sel.x}
              onChange={(e) =>
                onPosChange(sel.id, parseInt(e.target.value) || 0, sel.y)
              }
            />
          </Row>
          <Row label="Y">
            <input
              style={inputStyle}
              type="number"
              value={sel.y}
              onChange={(e) =>
                onPosChange(sel.id, sel.x, parseInt(e.target.value) || 0)
              }
            />
          </Row>
        </div>
      </div>

      {/* ── Component Props (grouped) ────────────────────────────────── */}
      {propsMeta.length > 0 ? (
        Object.entries(groups).map(([groupName, metas]) => (
          <div
            key={groupName}
            style={{
              padding: "8px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <SectionLabel label={groupName} />
            {metas.map((meta) => (
              <Row key={meta.key} label={meta.label}>
                <PropField
                  meta={meta}
                  value={sel.props[meta.key] ?? ""}
                  onChange={handleChange}
                />
              </Row>
            ))}
          </div>
        ))
      ) : (
        // fallback: generic key/value rows when no propsMeta defined
        <div
          style={{
            padding: "8px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <SectionLabel label="Props" />
          {Object.entries(sel.props).map(([k, v]) => (
            <Row key={k} label={k}>
              <input
                style={inputStyle}
                type="text"
                value={String(v)}
                onChange={(e) =>
                  handleChange(
                    k,
                    isNaN(Number(e.target.value))
                      ? e.target.value
                      : Number(e.target.value),
                  )
                }
              />
            </Row>
          ))}
        </div>
      )}

      {/* ── Design Tokens ────────────────────────────────────────────── */}
      <div style={{ padding: "8px 12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: showTokens ? 8 : 0,
          }}
          onClick={onTokenToggle}
        >
          <SectionLabel label="Design Tokens" />
          <span style={{ fontSize: "0.65rem", opacity: 0.4, marginBottom: 4 }}>
            {showTokens ? "−" : "+"}
          </span>
        </div>

        {showTokens &&
          Object.entries(TOKENS_CATEGORIES).map(([cat, tokens]) => (
            <div key={cat} style={{ marginBottom: 8 }}>
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "var(--color-text-2)",
                  marginBottom: 4,
                  opacity: 0.55,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {cat}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {Object.entries(tokens).map(([name, value]) => (
                  <button
                    key={name}
                    style={{
                      ...s.tokenBtn,
                      fontSize: "0.6rem",
                      padding: "2px 7px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                    onClick={() => onApplyToken(cat, value)}
                  >
                    {/* colour swatch for the Colors category */}
                    {cat === "Colors" && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: value,
                          flexShrink: 0,
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      />
                    )}
                    {copiedToken === value && (
                      <span style={{ color: "#22c55e", fontSize: "0.55rem" }}>
                        ✓
                      </span>
                    )}
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
