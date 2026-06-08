import { ThemeProvider } from "@stareezy-ui/tokens";
import {
  type CanvasNode,
  type ThemeMode,
  type CodeTab,
  type DragState,
} from "../types";
import { CanvasNodeCard } from "./CanvasNodeCard";
import { CodePanel } from "./CodePanel";

interface WorkareaProps {
  theme: ThemeMode;
  zoom: number;
  dragging: DragState | null;
  pageNode: CanvasNode | undefined;
  selectedId: string | null;
  showCode: boolean;
  codeTab: CodeTab;
  historyIdx: number;
  historyLength: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  onCanvasDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
  onSelect: (id: string) => void;
  onStartDrag: (id: string, e: React.MouseEvent) => void;
  onStartResize: (id: string, e: React.MouseEvent) => void;
  onRemove: (id: string) => void;
  onCodeTabChange: (tab: CodeTab) => void;
  onCopy: (code: string) => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomChange: (z: number) => void;
}

export function Workarea({
  theme,
  zoom,
  dragging,
  pageNode,
  selectedId,
  showCode,
  codeTab,
  historyIdx,
  historyLength,
  canvasRef,
  onCanvasDrop,
  onDragOver,
  onCanvasClick,
  onSelect,
  onStartDrag,
  onStartResize,
  onRemove,
  onCodeTabChange,
  onCopy,
  onExport,
  onUndo,
  onRedo,
  onZoomChange,
}: WorkareaProps) {
  return (
    /* Outer wrapper: fills the center column, uses theme background */
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        background: "var(--color-bg)",
      }}
    >
      <ThemeProvider theme={theme}>
        {/* Canvas scroll area — fills all available space, theme-bg */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "auto",
            background: "var(--color-bg)",
          }}
        >
          {/* Inner canvas — sized to accommodate all components */}
          <div
            ref={canvasRef}
            style={{
              position: "relative",
              minWidth: "100%",
              minHeight: "100%",
              width: `${Math.round(100 / (zoom / 100))}%`,
              height: `${Math.round(100 / (zoom / 100))}%`,
              backgroundImage:
                "radial-gradient(var(--color-border) 1px, transparent 0)",
              backgroundSize: "24px 24px",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
              cursor: dragging ? "grabbing" : "default",
              background: "var(--color-bg)",
            }}
            onDrop={onCanvasDrop}
            onDragOver={onDragOver}
            onClick={onCanvasClick}
            data-nova-canvas
          >
            {pageNode &&
              pageNode.children.map((child) => (
                <CanvasNodeCard
                  key={child.id}
                  node={child}
                  isSelected={child.id === selectedId}
                  dragging={dragging}
                  onSelect={onSelect}
                  onStartDrag={onStartDrag}
                  onStartResize={onStartResize}
                  onRemove={onRemove}
                />
              ))}

            {pageNode && pageNode.children.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "2.5rem",
                    opacity: 0.12,
                    filter: "grayscale(1)",
                  }}
                >
                  ✦
                </span>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-text-2)",
                    opacity: 0.45,
                  }}
                >
                  Drag components from the left panel
                </span>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>

      <CodePanel
        showCode={showCode}
        codeTab={codeTab}
        theme={theme}
        pageChildren={pageNode?.children ?? []}
        onCodeTabChange={onCodeTabChange}
        onCopy={onCopy}
        onExport={onExport}
      />

      {/* Status bar — always theme-bg so no white flash */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px",
          fontSize: "0.65rem",
          color: "var(--color-text-2)",
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          flexShrink: 0,
        }}
      >
        <span>{(pageNode?.children ?? []).length} items</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={onUndo}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-2)",
              cursor: "pointer",
              fontSize: "0.65rem",
              opacity: historyIdx >= 0 ? 1 : 0.3,
            }}
          >
            ↩
          </button>
          <button
            onClick={onRedo}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-2)",
              cursor: "pointer",
              fontSize: "0.65rem",
              opacity: historyIdx < historyLength - 1 ? 1 : 0.3,
            }}
          >
            ↪
          </button>
          <button
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-2)",
              cursor: "pointer",
              fontSize: "0.65rem",
            }}
          >
            −
          </button>
          <span>{zoom}%</span>
          <button
            onClick={() => onZoomChange(Math.min(200, zoom + 25))}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-2)",
              cursor: "pointer",
              fontSize: "0.65rem",
            }}
          >
            +
          </button>
          <span style={{ opacity: 0.5 }}>Theme: {theme}</span>
        </div>
      </div>
    </div>
  );
}
