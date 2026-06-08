"use client";

import { type NovaSession } from "../types";

interface SessionBarProps {
  sessions: NovaSession[];
  activeSessionId: string;
  renamingId: string | null;
  renameValue: string;
  onSwitch: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRenameStart: (id: string, name: string) => void;
  onRenameChange: (v: string) => void;
  onRenameCommit: (id: string) => void;
}

function fmt(ms: number) {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ms).toLocaleDateString();
}

export function SessionBar({
  sessions,
  activeSessionId,
  renamingId,
  renameValue,
  onSwitch,
  onCreate,
  onDelete,
  onDuplicate,
  onRenameStart,
  onRenameChange,
  onRenameCommit,
}: SessionBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "0 8px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        overflowX: "auto",
        flexShrink: 0,
        minHeight: 34,
      }}
    >
      {sessions.map((s) => {
        const isActive = s.id === activeSessionId;
        const isRenaming = renamingId === s.id;
        return (
          <div
            key={s.id}
            title={`Updated ${fmt(s.updatedAt)}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: "4px 4px 0 0",
              fontSize: "0.68rem",
              cursor: "pointer",
              flexShrink: 0,
              background: isActive ? "rgba(255,106,26,0.12)" : "transparent",
              borderBottom: isActive
                ? "2px solid var(--brand-primary, #ff6a1a)"
                : "2px solid transparent",
              color: isActive
                ? "var(--brand-primary, #ff6a1a)"
                : "var(--color-text-2)",
              transition: "all 0.12s",
            }}
            onClick={() => !isRenaming && onSwitch(s.id)}
          >
            <span style={{ opacity: 0.5, fontSize: "0.55rem" }}>◉</span>

            {isRenaming ? (
              <input
                autoFocus
                value={renameValue}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--brand-primary, #ff6a1a)",
                  outline: "none",
                  color: "inherit",
                  fontSize: "0.68rem",
                  width: 80,
                  fontFamily: "inherit",
                }}
                onChange={(e) => onRenameChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onRenameCommit(s.id);
                  if (e.key === "Escape") onRenameCommit(s.id);
                }}
                onBlur={() => onRenameCommit(s.id)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onRenameStart(s.id, s.name);
                }}
                style={{
                  maxWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.name}
              </span>
            )}

            {/* action buttons — only visible on hover via group */}
            <span
              style={{ display: "inline-flex", gap: 2, marginLeft: 2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                title="Duplicate session"
                style={iconBtn}
                onClick={() => onDuplicate(s.id)}
              >
                ⎘
              </button>
              {sessions.length > 1 && (
                <button
                  title="Delete session"
                  style={{ ...iconBtn, color: "#dc143c" }}
                  onClick={() => onDelete(s.id)}
                >
                  ✕
                </button>
              )}
            </span>
          </div>
        );
      })}

      {/* new session button */}
      <button
        title="New session"
        style={{
          ...iconBtn,
          marginLeft: 4,
          fontSize: "0.9rem",
          padding: "2px 6px",
          borderRadius: 4,
          border: "1px dashed var(--color-border)",
          color: "var(--color-text-2)",
        }}
        onClick={onCreate}
      >
        +
      </button>
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "1px 3px",
  fontSize: "0.6rem",
  color: "var(--color-text-2)",
  lineHeight: 1,
  borderRadius: 3,
  opacity: 0.7,
};
