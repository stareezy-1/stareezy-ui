"use client";

import { useNovaState } from "./useNovaState";
import { Palette } from "./components/Palette";
import { TopBar } from "./components/TopBar";
import { Workarea } from "./components/Workarea";
import { RightPanel } from "./components/RightPanel";
import { type StyleKeys } from "./types";

const s: StyleKeys = {
  container: { display: "flex", height: "calc(100vh - 64px)", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-sans)", overflow: "hidden" },
  centerCol: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  pGroup: { padding: "8px 14px", display: "flex", flexDirection: "column", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.04)" },
  pRow: { display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem" },
  pLabel: { width: 60, color: "var(--color-text-2)", fontSize: "0.7rem", flexShrink: 0 },
  pInput: { flex: 1, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: 4, padding: "4px 8px", color: "var(--color-text)", fontSize: "0.75rem", outline: "none", fontFamily: "var(--font-mono)" },
  tabBtn: { flex: 1, padding: "8px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", textAlign: "center", transition: "all 0.15s", borderBottom: "2px solid transparent", color: "var(--color-text-2)", background: "transparent" },
  tabBtnA: { color: "var(--brand-primary)", borderBottomColor: "var(--brand-primary)" },
  layerItem: { display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", fontSize: "0.75rem", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.1s" },
  layerSel: { background: "rgba(255,106,26,0.1)", borderLeft: "2px solid var(--brand-primary)" },
  tokenBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", fontSize: "0.65rem", borderRadius: 4, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", cursor: "pointer", color: "var(--color-text)", fontFamily: "var(--font-mono)" },
};

export default function NovaPage() {
  const state = useNovaState();

  return (
    <div style={s.container}>
      <Palette
        openCats={state.openCats}
        onToggleCat={(cat) => state.setOpenCats((prev) => ({ ...prev, [cat]: !prev[cat] }))}
        onDragStart={state.handleDragStart}
        onDoubleClick={(type) => state.addNodeToCanvas(type, 20 + state.nextDropPos.current * 10, 20 + state.nextDropPos.current * 10)}
      />

      <div style={s.centerCol}>
        <TopBar
          theme={state.theme}
          showCode={state.showCode}
          onThemeChange={state.setTheme}
          onToggleCode={() => state.setShowCode(!state.showCode)}
        />

        <Workarea
          theme={state.theme}
          zoom={state.zoom}
          dragging={state.dragging}
          pageNode={state.pageNode}
          selectedId={state.selectedId}
          showCode={state.showCode}
          codeTab={state.codeTab}
          historyIdx={state.historyIdx}
          historyLength={state.history.length}
          canvasRef={state.canvasRef}
          onCanvasDrop={state.handleCanvasDrop}
          onDragOver={state.handleDragOver}
          onCanvasClick={state.handleCanvasClick}
          onSelect={state.setSelectedId}
          onStartDrag={state.handleStartDrag}
          onStartResize={state.handleStartResize}
          onRemove={state.removeNode}
          onCodeTabChange={state.setCodeTab}
          onCopy={state.handleCopyCode}
          onExport={state.handleExport}
          onUndo={state.undo}
          onRedo={state.redo}
          onZoomChange={state.setZoom}
        />
      </div>

      <RightPanel
        tab={state.tab}
        selected={state.selected}
        pageNode={state.pageNode}
        selectedId={state.selectedId}
        showTokens={state.showTokens}
        copiedToken={state.copiedToken}
        onTabChange={state.setTab}
        onPropChange={state.updateNodeProps}
        onPosChange={state.updateNodePos}
        onTextChange={state.updateNodeText}
        onSelect={state.setSelectedId}
        onRemove={state.removeNode}
        onTokenToggle={() => state.setShowTokens(!state.showTokens)}
        onApplyToken={state.applyToken}
        s={s}
      />
    </div>
  );
}
