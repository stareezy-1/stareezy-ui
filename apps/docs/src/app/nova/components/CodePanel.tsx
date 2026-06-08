import { type CodeTab, type ThemeMode, type CanvasNode } from "../types";
import { generateCode, renderPreview } from "../utils";

interface CodePanelProps {
  showCode: boolean;
  codeTab: CodeTab;
  theme: ThemeMode;
  pageChildren: CanvasNode[];
  onCodeTabChange: (tab: CodeTab) => void;
  onCopy: (code: string) => void;
  onExport: () => void;
}

export function CodePanel({ showCode, codeTab, theme, pageChildren, onCodeTabChange, onCopy, onExport }: CodePanelProps) {
  if (!showCode) return null;

  return (
    <div style={{ borderTop: "1px solid var(--color-border)", background: "#010103", display: "flex", flexDirection: "column", flexShrink: 0, height: 220 }}>
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {(["code", "preview", "export"] as CodeTab[]).map((t) => (
          <button
            key={t}
            style={{
              flex: 1, padding: "8px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer",
              textAlign: "center", transition: "all 0.15s", borderBottom: "2px solid transparent",
              color: "var(--color-text-2)", background: "transparent",
              ...(codeTab === t ? { color: "var(--brand-primary)", borderBottomColor: "var(--brand-primary)" } : {}),
            }}
            onClick={() => onCodeTabChange(t)}
          >
            {t === "code" ? "Code" : t === "preview" ? "Preview" : "Export"}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, padding: 4 }}>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", fontSize: "0.65rem", borderRadius: 4, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", cursor: "pointer", color: "var(--color-text)", fontFamily: "var(--font-mono)" }} onClick={() => onCopy(generateCode(pageChildren))}>Copy</button>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", fontSize: "0.65rem", borderRadius: 4, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", cursor: "pointer", color: "var(--color-text)", fontFamily: "var(--font-mono)" }} onClick={onExport}>Download</button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {codeTab === "code" && (() => {
          const allTypes = pageChildren.map((c) => c.type).filter((t, i, a) => a.indexOf(t) === i).join(", ");
          return (
            <div style={{ padding: 16, fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.6, color: "#e2e8f0", overflow: "auto", whiteSpace: "pre-wrap", flex: 1 }}>
              {`import { ${allTypes} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n`}
              {generateCode(pageChildren, 2)}
              {"\n  );\n}"}
            </div>
          );
        })()}
        {codeTab === "preview" && (
          <div data-theme={theme} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, minHeight: 160, alignItems: "center", justifyContent: "center" }}>
            {pageChildren.map((c) => renderPreview(c))}
          </div>
        )}
        {codeTab === "export" && (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", justifyContent: "center", minHeight: 160 }}>
            <button
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 24px", fontSize: "0.85rem", borderRadius: 4, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", cursor: "pointer", color: "var(--color-text)", fontFamily: "var(--font-mono)" }}
              onClick={() => onCopy(generateCode(pageChildren))}
            >
              📋 Copy Code
            </button>
            <button
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 24px", fontSize: "0.85rem", borderRadius: 4, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", cursor: "pointer", color: "var(--color-text)", fontFamily: "var(--font-mono)" }}
              onClick={onExport}
            >
              ⬇ Download .tsx
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
