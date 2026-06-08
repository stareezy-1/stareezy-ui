import { type CanvasNode, type TabId, type StyleKeys } from "../types";
import { StyleTab } from "./StyleTab";
import { ContentTab } from "./ContentTab";
import { LayersTab } from "./LayersTab";

interface RightPanelProps {
  tab: TabId;
  selected: CanvasNode | null;
  pageNode: CanvasNode | undefined;
  selectedId: string | null;
  showTokens: boolean;
  copiedToken: string;
  onTabChange: (tab: TabId) => void;
  onPropChange: (id: string, key: string, value: string | number | boolean) => void;
  onPosChange: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onTokenToggle: () => void;
  onApplyToken: (cat: string, value: string) => void;
  s: StyleKeys;
}

export function RightPanel({
  tab, selected, pageNode, selectedId, showTokens, copiedToken,
  onTabChange, onPropChange, onPosChange, onTextChange,
  onSelect, onRemove, onTokenToggle, onApplyToken, s,
}: RightPanelProps) {
  return (
    <div style={{ width: 260, display: "flex", flexDirection: "column", background: "var(--color-bg)", borderLeft: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div style={{ display: "flex" }}>
        {(["style", "content", "layers"] as TabId[]).map((t) => (
          <button
            key={t}
            style={tab === t ? { ...s.tabBtn, ...s.tabBtnA } : s.tabBtn}
            onClick={() => onTabChange(t)}
          >
            {t === "style" ? "Style" : t === "content" ? "Content" : "Layers"}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        {tab === "style" && (
          selected ? (
            <StyleTab
              sel={selected}
              showTokens={showTokens}
              copiedToken={copiedToken}
              onPropChange={onPropChange}
              onPosChange={onPosChange}
              onTokenToggle={onTokenToggle}
              onApplyToken={onApplyToken}
              s={s}
            />
          ) : (
            <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>Select a component to edit</div>
          )
        )}

        {tab === "content" && (
          selected ? (
            <ContentTab sel={selected} onTextChange={onTextChange} onPropChange={onPropChange} s={s} />
          ) : (
            <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>Select a component to edit</div>
          )
        )}

        {tab === "layers" && (
          <LayersTab pageNode={pageNode} selectedId={selectedId} onSelect={onSelect} onRemove={onRemove} s={s} />
        )}
      </div>
    </div>
  );
}
