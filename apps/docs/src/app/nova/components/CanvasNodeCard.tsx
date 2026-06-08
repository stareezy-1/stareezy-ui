import { type CanvasNode, type DragState } from "../types";
import { ICONS } from "../data";
import { renderPreview } from "../utils";

interface CanvasNodeCardProps {
  node: CanvasNode;
  isSelected: boolean;
  dragging: DragState | null;
  onSelect: (id: string) => void;
  onStartDrag: (id: string, e: React.MouseEvent) => void;
  onStartResize: (id: string, e: React.MouseEvent) => void;
  onRemove: (id: string) => void;
}

/** Per-type default dimensions when the node doesn't have explicit width/height */
const TYPE_DEFAULTS: Record<string, { w: number; h: number }> = {
  // Layout containers — wide & tall so children can fit
  Box: { w: 240, h: 120 },
  Stack: { w: 240, h: 120 },
  VStack: { w: 240, h: 120 },
  HStack: { w: 320, h: 64 },
  Grid: { w: 320, h: 160 },

  // Buttons
  Button: { w: 160, h: 44 },
  IconButton: { w: 44, h: 44 },

  // Inputs — need more height for label+input+hint
  Input: { w: 280, h: 80 },
  Checkbox: { w: 180, h: 40 },
  Switch: { w: 160, h: 40 },
  Slider: { w: 260, h: 56 },
  FileDropZone: { w: 300, h: 120 },

  // Data
  Table: { w: 480, h: 180 },
  Progress: { w: 280, h: 40 },
  CircularProgress: { w: 80, h: 80 },
  Badge: { w: 100, h: 32 },
  Tag: { w: 100, h: 32 },

  // Navigation
  NavBar: { w: 480, h: 56 },
  Tabs: { w: 360, h: 80 },
  Breadcrumb: { w: 300, h: 36 },
  Pagination: { w: 320, h: 44 },

  // Overlay — show them in a contained box
  Modal: { w: 420, h: 240 },
  Drawer: { w: 300, h: 300 },
  Tooltip: { w: 160, h: 48 },
  Dropdown: { w: 220, h: 48 },
  CommandPalette: { w: 400, h: 200 },

  // Media
  Avatar: { w: 60, h: 60 },
  Skeleton: { w: 260, h: 20 },
  Divider: { w: 280, h: 20 },
  Card: { w: 300, h: 180 },

  // Feedback
  Toast: { w: 320, h: 60 },
  Clipboard: { w: 280, h: 44 },
  Resizer: { w: 320, h: 120 },
  ProgressPanel: { w: 380, h: 100 },
  Spinner: { w: 48, h: 48 },
};

const HEADER_H = 20;

export function CanvasNodeCard({
  node,
  isSelected,
  dragging,
  onSelect,
  onStartDrag,
  onStartResize,
  onRemove,
}: CanvasNodeCardProps) {
  const defaults = TYPE_DEFAULTS[node.type] ?? { w: 200, h: 60 };
  const w =
    typeof node.props.width === "number" ? node.props.width : defaults.w;
  const h =
    typeof node.props.height === "number" ? node.props.height : defaults.h;

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: w,
        // add header height so the component preview always gets the full intended height
        height: h + HEADER_H,
        border: isSelected
          ? "2px solid #ff6a1a"
          : "2px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        cursor: isSelected ? "move" : "pointer",
        zIndex: isSelected ? 10 : 1,
        transition:
          dragging?.id === node.id
            ? "none"
            : "border-color 0.15s, box-shadow 0.15s",
        // transparent — let the ThemeProvider's background show through
        background: "transparent",
        overflow: "hidden",
        boxShadow: isSelected
          ? "0 0 0 1px rgba(255,106,26,0.25), 0 4px 16px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.15)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      onMouseDown={(e) => {
        if (!isSelected) {
          e.stopPropagation();
          onSelect(node.id);
          return;
        }
        onStartDrag(node.id, e);
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "rgba(255,106,26,0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        }
      }}
    >
      {/* ── drag handle / label bar ─────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_H,
          background: isSelected ? "rgba(255,106,26,0.18)" : "rgba(0,0,0,0.35)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          padding: "0 6px",
          gap: 4,
          zIndex: 5,
          cursor: "move",
          fontSize: "0.55rem",
          color: isSelected ? "#ff6a1a" : "rgba(255,255,255,0.6)",
          borderBottom: isSelected
            ? "1px solid rgba(255,106,26,0.3)"
            : "1px solid rgba(255,255,255,0.06)",
          userSelect: "none",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onStartDrag(node.id, e);
        }}
      >
        <span style={{ opacity: 0.7 }}>{ICONS[node.type] || "◻"}</span>
        <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>
          {node.type}
        </span>
      </div>

      {/* ── delete button ───────────────────────────────────── */}
      {isSelected && (
        <button
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: HEADER_H,
            height: HEADER_H,
            background: "#dc143c",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "0.5rem",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(node.id);
          }}
        >
          ✕
        </button>
      )}

      {/* ── component preview ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: HEADER_H,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 6,
          boxSizing: "border-box",
        }}
      >
        {renderPreview(node)}
      </div>

      {/* ── resize handles ──────────────────────────────────── */}
      {isSelected && (
        <>
          {/* right-edge handle */}
          <div
            style={{
              position: "absolute",
              right: -3,
              top: "50%",
              transform: "translateY(-50%)",
              width: 6,
              height: 24,
              background: "#ff6a1a",
              borderRadius: 3,
              cursor: "ew-resize",
              zIndex: 15,
            }}
            onMouseDown={(e) => onStartResize(node.id, e)}
          />
          {/* corner handle */}
          <div
            style={{
              position: "absolute",
              right: -4,
              bottom: -4,
              width: 10,
              height: 10,
              background: "#ff6a1a",
              borderRadius: "50%",
              cursor: "nwse-resize",
              zIndex: 15,
            }}
            onMouseDown={(e) => onStartResize(node.id, e)}
          />
        </>
      )}
    </div>
  );
}
