import { type CanvasNode, type ThemeMode, type CodeTab, type DragState } from "../types";
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
  canvasRef: React.RefObject<HTMLDivElement | null>;
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
  theme, zoom, dragging, pageNode, selectedId, showCode, codeTab,
  historyIdx, historyLength, canvasRef,
  onCanvasDrop, onDragOver, onCanvasClick, onSelect,
  onStartDrag, onStartResize, onRemove,
  onCodeTabChange, onCopy, onExport,
  onUndo, onRedo, onZoomChange,
}: WorkareaProps) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div data-theme={theme} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          ref={canvasRef}
          style={{
            flex: 1, margin: 16, borderRadius: 8, overflow: "hidden",
            backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 0)",
            backgroundSize: "24px 24px", position: "relative",
            transform: `scale(${zoom / 100})`, transformOrigin: "top left",
            cursor: dragging ? "grabbing" : "default",
          }}
          onDrop={onCanvasDrop}
          onDragOver={onDragOver}
          onClick={onCanvasClick}
          data-nova-canvas
        >
          {pageNode && (pageNode.children.length > 0 ? pageNode.children : []).map((child) => (
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, position: "absolute", inset: 0, color: "var(--color-text-2)", opacity: 0.6, pointerEvents: "none" }}>
              <span style={{ fontSize: "2rem", opacity: 0.3 }}>✦</span>
              <span>Drag components here</span>
            </div>
          )}
        </div>
      </div>

      <CodePanel
        showCode={showCode}
        codeTab={codeTab}
        theme={theme}
        pageChildren={pageNode?.children ?? []}
        onCodeTabChange={onCodeTabChange}
        onCopy={onCopy}
        onExport={onExport}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px", fontSize: "0.65rem", color: "var(--color-text-2)", borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
        <span>{(pageNode?.children ?? []).length} items</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={onUndo} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem", opacity: historyIdx >= 0 ? 1 : 0.3 }}>↩</button>
          <button onClick={onRedo} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem", opacity: historyIdx < historyLength - 1 ? 1 : 0.3 }}>↪</button>
          <button onClick={() => onZoomChange(Math.max(25, zoom - 25))} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem" }}>−</button>
          <span>{zoom}%</span>
          <button onClick={() => onZoomChange(Math.min(200, zoom + 25))} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem" }}>+</button>
          <span>Theme: {theme}</span>
        </div>
      </div>
    </div>
  );
}
