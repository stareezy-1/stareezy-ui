"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { type CanvasNode, type ThemeMode, type TabId, type CodeTab, type DragState, type ResizeState } from "./types";
import { COMPONENT_DEFS } from "./data";
import { createNode, findNode, generateCode } from "./utils";

export function useNovaState() {
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: Math.random().toString(36).slice(2, 9), type: "Page", props: {}, children: [], text: "Page", x: 0, y: 0 },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("quasar");
  const [tab, setTab] = useState<TabId>("style");
  const [codeTab, setCodeTab] = useState<CodeTab>("code");
  const [showCode, setShowCode] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState<{ nodes: CanvasNode[] }[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [copiedToken, setCopiedToken] = useState("");
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [resizing, setResizing] = useState<ResizeState | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragNodeType = useRef<string | null>(null);
  const nextDropPos = useRef(0);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("nova-nodes");
    if (saved) {
      try { setNodes(JSON.parse(saved) as CanvasNode[]); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nova-nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
          removeNode(selectedId);
          e.preventDefault();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) redo();
        else undo();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;
      updateNodePosRaw(dragging.id, dragging.origX + dx, dragging.origY + dy);
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizing.startX;
      const dy = e.clientY - resizing.startY;
      const w = Math.max(60, resizing.origW + dx);
      const h = Math.max(32, resizing.origH + dy);
      updateNodePropsRaw(resizing.id, "width", Math.round(w));
      updateNodePropsRaw(resizing.id, "height", Math.round(h));
    };
    const onUp = () => setResizing(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing]);

  const pushHistory = useCallback((newNodes: CanvasNode[]) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIdx + 1);
      next.push({ nodes: JSON.parse(JSON.stringify(newNodes)) });
      return next;
    });
    setHistoryIdx((prev) => prev + 1);
  }, [historyIdx]);

  const undo = useCallback(() => {
    if (historyIdx < 0) return;
    const entry = history[historyIdx];
    if (!entry) return;
    setHistoryIdx((prev) => prev - 1);
    setNodes(JSON.parse(JSON.stringify(entry.nodes)));
  }, [history, historyIdx]);

  const redo = useCallback(() => {
    if (historyIdx >= history.length - 1) return;
    const entry = history[historyIdx + 1];
    if (!entry) return;
    setHistoryIdx((prev) => prev + 1);
    setNodes(JSON.parse(JSON.stringify(entry.nodes)));
  }, [history, historyIdx]);

  function getSelectedNode(): CanvasNode | null {
    if (!selectedId) return null;
    return findNode(nodes, selectedId);
  }

  function updateNodePosRaw(id: string, x: number, y: number) {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === id) return { ...n, x, y };
        if (n.children.length > 0) return { ...n, children: updateChildrenPos(n.children, id, x, y) };
        return n;
      }),
    );
  }

  function updateChildrenPos(ns: CanvasNode[], id: string, x: number, y: number): CanvasNode[] {
    return ns.map((n) => {
      if (n.id === id) return { ...n, x, y };
      if (n.children.length > 0) return { ...n, children: updateChildrenPos(n.children, id, x, y) };
      return n;
    });
  }

  function updateNodePos(id: string, x: number, y: number) {
    updateNodePosRaw(id, x, y);
  }

  function updateNodePropsRaw(id: string, key: string, value: string | number | boolean) {
    setNodes((prev) => {
      const updater = (ns: CanvasNode[]): CanvasNode[] =>
        ns.map((n) => {
          if (n.id === id) return { ...n, props: { ...n.props, [key]: value } };
          if (n.children.length > 0) return { ...n, children: updater(n.children) };
          return n;
        });
      return updater(prev);
    });
  }

  function updateNodeProps(id: string, key: string, value: string | number | boolean) {
    setNodes((prev) => {
      const updater = (ns: CanvasNode[]): CanvasNode[] =>
        ns.map((n) => {
          if (n.id === id) return { ...n, props: { ...n.props, [key]: value } };
          if (n.children.length > 0) return { ...n, children: updater(n.children) };
          return n;
        });
      const next = updater(prev);
      pushHistory(next);
      return next;
    });
  }

  function updateNodeText(id: string, text: string) {
    setNodes((prev) => {
      const updater = (ns: CanvasNode[]): CanvasNode[] =>
        ns.map((n) => {
          if (n.id === id) return { ...n, text };
          if (n.children.length > 0) return { ...n, children: updater(n.children) };
          return n;
        });
      const next = updater(prev);
      pushHistory(next);
      return next;
    });
  }

  function removeNode(id: string) {
    setNodes((prev) => {
      const filterNode = (ns: CanvasNode[]): CanvasNode[] =>
        ns.filter((n) => {
          if (n.id === id) return false;
          if (n.children.length > 0) n.children = filterNode(n.children);
          return true;
        });
      const next = filterNode(prev);
      pushHistory(next);
      return next;
    });
    if (selectedId === id) setSelectedId(null);
  }

  function addNodeToCanvas(type: string, dropX: number, dropY: number) {
    const def = COMPONENT_DEFS.find((c) => c.type === type);
    const node = createNode(type, def, dropX, dropY);
    setNodes((prev) => {
      const updated = prev.map((n) => {
        if (n.id === "Page" || n.type === "Page") {
          return { ...n, children: [...n.children, node] };
        }
        return n;
      });
      pushHistory(updated);
      return updated;
    });
    setSelectedId(node.id);
  }

  function handleDragStart(e: React.DragEvent, type: string) {
    dragNodeType.current = type;
    e.dataTransfer.effectAllowed = "copy";
  }

  function handleCanvasDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!dragNodeType.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - 80) / (zoom / 100);
    const y = (e.clientY - rect.top - 20) / (zoom / 100);
    addNodeToCanvas(dragNodeType.current, Math.max(0, x), Math.max(0, y));
    dragNodeType.current = null;
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleCanvasClick(e: React.MouseEvent) {
    if (e.target === canvasRef.current || (e.target as HTMLElement).closest("[data-nova-canvas]")) {
      setSelectedId(null);
    }
  }

  function handleStartDrag(nodeId: string, e: React.MouseEvent) {
    e.stopPropagation();
    const n = findNode(nodes, nodeId);
    if (!n) return;
    setDragging({ id: nodeId, startX: e.clientX, startY: e.clientY, origX: n.x, origY: n.y });
  }

  function handleStartResize(nodeId: string, e: React.MouseEvent) {
    e.stopPropagation();
    const n = findNode(nodes, nodeId);
    if (!n) return;
    const w = typeof n.props.width === "number" ? n.props.width : 160;
    const h = typeof n.props.height === "number" ? n.props.height : 48;
    setResizing({ id: nodeId, startX: e.clientX, startY: e.clientY, origW: w, origH: h });
  }

  function handleExport() {
    const pageChildren = nodes[0]?.children ?? [];
    const allTypes = pageChildren.map((c) => c.type).filter((t, i, a) => a.indexOf(t) === i).join(", ");
    const code = `import { ${allTypes} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n${generateCode(pageChildren, 2)}\n  );\n}`;
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "NovaDesign.tsx";
    a.click();
  }

  async function handleCopyCode(code: string) {
    try { await navigator.clipboard.writeText(code); } catch { /* fallback */ }
  }

  function applyToken(catName: string, value: string) {
    const sel = getSelectedNode();
    if (!sel) return;
    const propKey =
      catName === "Colors" ? "color" :
      catName === "Spacing" ? "p" :
      catName === "Radius" ? "borderRadius" :
      catName === "Shadow" ? "boxShadow" :
      "color";
    updateNodeProps(sel.id, propKey, value);
    setCopiedToken(value);
    setTimeout(() => setCopiedToken(""), 1500);
  }

  const pageNode = nodes[0];
  const selected = getSelectedNode();

  return {
    nodes, pageNode, selected, selectedId, theme, tab, codeTab, showCode, showTokens,
    zoom, history, historyIdx, copiedToken, dragging, resizing, canvasRef, dragNodeType,
    nextDropPos, openCats,
    setNodes, setSelectedId, setTheme, setTab, setCodeTab, setShowCode, setShowTokens,
    setZoom, setCopiedToken, setOpenCats, setDragging,
    pushHistory, undo, redo,
    updateNodePos, updateNodeProps, updateNodeText, removeNode, addNodeToCanvas,
    handleDragStart, handleCanvasDrop, handleDragOver, handleCanvasClick,
    handleStartDrag, handleStartResize, handleExport, handleCopyCode, applyToken,
  };
}


