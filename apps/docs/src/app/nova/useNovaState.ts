"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  type CanvasNode,
  type ThemeMode,
  type TabId,
  type CodeTab,
  type DragState,
  type ResizeState,
  type NovaSession,
  PAGE_ROOT_ID,
  SESSIONS_STORAGE_KEY,
  ACTIVE_SESSION_KEY,
} from "./types";
import { COMPONENT_DEFS } from "./data";
import { createNode, findNode, generateCode } from "./utils";

// ── helpers ───────────────────────────────────────────────────────────────────

function makePageRoot(): CanvasNode {
  return {
    id: PAGE_ROOT_ID,
    type: "Page",
    props: {},
    children: [],
    text: "Page",
    x: 0,
    y: 0,
  };
}

function makeFreshNodes(): CanvasNode[] {
  return [makePageRoot()];
}

function makeSession(name: string, nodes?: CanvasNode[]): NovaSession {
  return {
    id: crypto.randomUUID(),
    name,
    nodes: nodes ?? makeFreshNodes(),
    updatedAt: Date.now(),
  };
}

function loadSessions(): NovaSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as NovaSession[];
    // Ensure every session has a valid page-root node
    return parsed.map((s) => ({
      ...s,
      nodes: ensurePageRoot(s.nodes),
    }));
  } catch {
    return [];
  }
}

function saveSessions(sessions: NovaSession[]) {
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
}

/** Guarantees the first node is always the Page root with the fixed ID. */
function ensurePageRoot(nodes: CanvasNode[]): CanvasNode[] {
  const hasRoot = nodes.some((n) => n.id === PAGE_ROOT_ID || n.type === "Page");
  if (hasRoot) {
    // Normalise the ID so addNodeToCanvas check always works
    return nodes.map((n) =>
      n.type === "Page" ? { ...n, id: PAGE_ROOT_ID } : n,
    );
  }
  return [makePageRoot(), ...nodes];
}

// ── hook ──────────────────────────────────────────────────────────────────────

export function useNovaState() {
  // ── sessions ────────────────────────────────────────────────────────────────
  const [sessions, setSessions] = useState<NovaSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");

  // ── canvas state ─────────────────────────────────────────────────────────────
  const [nodes, setNodes] = useState<CanvasNode[]>(makeFreshNodes());
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

  // session panel open/close
  const [showSessions, setShowSessions] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragNodeType = useRef<string | null>(null);
  const nextDropPos = useRef(0);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  // ── boot: load sessions from localStorage ────────────────────────────────────
  useEffect(() => {
    let saved = loadSessions();
    let activeId = localStorage.getItem(ACTIVE_SESSION_KEY) ?? "";

    if (saved.length === 0) {
      const fresh = makeSession("Session 1");
      saved = [fresh];
      activeId = fresh.id;
      saveSessions(saved);
      localStorage.setItem(ACTIVE_SESSION_KEY, activeId);
    }

    // Ensure activeId is valid
    if (!saved.find((s) => s.id === activeId)) {
      activeId = saved[0]!.id;
      localStorage.setItem(ACTIVE_SESSION_KEY, activeId);
    }

    setSessions(saved);
    setActiveSessionId(activeId);
    const active = saved.find((s) => s.id === activeId);
    if (active) setNodes(ensurePageRoot(active.nodes));
  }, []);

  // ── persist active session whenever nodes change ─────────────────────────────
  useEffect(() => {
    if (!activeSessionId) return;
    setSessions((prev) => {
      const next = prev.map((s) =>
        s.id === activeSessionId ? { ...s, nodes, updatedAt: Date.now() } : s,
      );
      saveSessions(next);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  // ── keyboard shortcuts ────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (
          selectedId &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
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

  // ── drag move ─────────────────────────────────────────────────────────────────
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

  // ── resize move ───────────────────────────────────────────────────────────────
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

  // ── history ───────────────────────────────────────────────────────────────────
  const pushHistory = useCallback(
    (newNodes: CanvasNode[]) => {
      setHistory((prev) => {
        const next = prev.slice(0, historyIdx + 1);
        next.push({ nodes: JSON.parse(JSON.stringify(newNodes)) });
        return next;
      });
      setHistoryIdx((prev) => prev + 1);
    },
    [historyIdx],
  );

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

  // ── node helpers ──────────────────────────────────────────────────────────────
  function getSelectedNode(): CanvasNode | null {
    if (!selectedId) return null;
    return findNode(nodes, selectedId);
  }

  function updateNodePosRaw(id: string, x: number, y: number) {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === id) return { ...n, x, y };
        if (n.children.length > 0)
          return { ...n, children: updateChildrenPos(n.children, id, x, y) };
        return n;
      }),
    );
  }

  function updateChildrenPos(
    ns: CanvasNode[],
    id: string,
    x: number,
    y: number,
  ): CanvasNode[] {
    return ns.map((n) => {
      if (n.id === id) return { ...n, x, y };
      if (n.children.length > 0)
        return { ...n, children: updateChildrenPos(n.children, id, x, y) };
      return n;
    });
  }

  function updateNodePos(id: string, x: number, y: number) {
    updateNodePosRaw(id, x, y);
  }

  function updateNodePropsRaw(
    id: string,
    key: string,
    value: string | number | boolean,
  ) {
    setNodes((prev) => {
      const updater = (ns: CanvasNode[]): CanvasNode[] =>
        ns.map((n) => {
          if (n.id === id) return { ...n, props: { ...n.props, [key]: value } };
          if (n.children.length > 0)
            return { ...n, children: updater(n.children) };
          return n;
        });
      return updater(prev);
    });
  }

  function updateNodeProps(
    id: string,
    key: string,
    value: string | number | boolean,
  ) {
    setNodes((prev) => {
      const updater = (ns: CanvasNode[]): CanvasNode[] =>
        ns.map((n) => {
          if (n.id === id) return { ...n, props: { ...n.props, [key]: value } };
          if (n.children.length > 0)
            return { ...n, children: updater(n.children) };
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
          if (n.children.length > 0)
            return { ...n, children: updater(n.children) };
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
      // Always find the Page root by type OR by fixed ID
      const updated = prev.map((n) => {
        if (n.id === PAGE_ROOT_ID || n.type === "Page") {
          return { ...n, children: [...n.children, node] };
        }
        return n;
      });
      pushHistory(updated);
      return updated;
    });
    setSelectedId(node.id);
  }

  // ── session management ────────────────────────────────────────────────────────
  function switchSession(id: string) {
    if (id === activeSessionId) return;
    const target = sessions.find((s) => s.id === id);
    if (!target) return;
    setActiveSessionId(id);
    localStorage.setItem(ACTIVE_SESSION_KEY, id);
    setNodes(ensurePageRoot(target.nodes));
    setSelectedId(null);
    setHistory([]);
    setHistoryIdx(-1);
  }

  function createSession(name?: string) {
    const label = name ?? `Session ${sessions.length + 1}`;
    const fresh = makeSession(label);
    const next = [...sessions, fresh];
    setSessions(next);
    saveSessions(next);
    switchSession(fresh.id);
  }

  function deleteSession(id: string) {
    if (sessions.length <= 1) return; // keep at least one
    const next = sessions.filter((s) => s.id !== id);
    setSessions(next);
    saveSessions(next);
    if (activeSessionId === id) {
      const fallback = next[0]!;
      setActiveSessionId(fallback.id);
      localStorage.setItem(ACTIVE_SESSION_KEY, fallback.id);
      setNodes(ensurePageRoot(fallback.nodes));
      setSelectedId(null);
      setHistory([]);
      setHistoryIdx(-1);
    }
  }

  function renameSession(id: string, name: string) {
    const next = sessions.map((s) => (s.id === id ? { ...s, name } : s));
    setSessions(next);
    saveSessions(next);
  }

  function duplicateSession(id: string) {
    const src = sessions.find((s) => s.id === id);
    if (!src) return;
    const copy = makeSession(
      `${src.name} (copy)`,
      JSON.parse(JSON.stringify(src.nodes)) as CanvasNode[],
    );
    const next = [...sessions, copy];
    setSessions(next);
    saveSessions(next);
    switchSession(copy.id);
  }

  // ── canvas event handlers ─────────────────────────────────────────────────────
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
    if (
      e.target === canvasRef.current ||
      (e.target as HTMLElement).closest("[data-nova-canvas]")
    ) {
      setSelectedId(null);
    }
  }

  function handleStartDrag(nodeId: string, e: React.MouseEvent) {
    e.stopPropagation();
    const n = findNode(nodes, nodeId);
    if (!n) return;
    setDragging({
      id: nodeId,
      startX: e.clientX,
      startY: e.clientY,
      origX: n.x,
      origY: n.y,
    });
  }

  function handleStartResize(nodeId: string, e: React.MouseEvent) {
    e.stopPropagation();
    const n = findNode(nodes, nodeId);
    if (!n) return;
    const w = typeof n.props.width === "number" ? n.props.width : 160;
    const h = typeof n.props.height === "number" ? n.props.height : 48;
    setResizing({
      id: nodeId,
      startX: e.clientX,
      startY: e.clientY,
      origW: w,
      origH: h,
    });
  }

  function handleExport() {
    const pageChildren = nodes[0]?.children ?? [];
    const allTypes = pageChildren
      .map((c) => c.type)
      .filter((t, i, a) => a.indexOf(t) === i)
      .join(", ");
    const code = `import { ${allTypes} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n${generateCode(
      pageChildren,
      2,
    )}\n  );\n}`;
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "NovaDesign.tsx";
    a.click();
  }

  async function handleCopyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* fallback */
    }
  }

  function applyToken(catName: string, value: string) {
    const sel = getSelectedNode();
    if (!sel) return;
    const propKey =
      catName === "Colors"
        ? "color"
        : catName === "Spacing"
        ? "p"
        : catName === "Radius"
        ? "borderRadius"
        : catName === "Shadow"
        ? "boxShadow"
        : "color";
    updateNodeProps(sel.id, propKey, value);
    setCopiedToken(value);
    setTimeout(() => setCopiedToken(""), 1500);
  }

  const pageNode = nodes[0];
  const selected = getSelectedNode();
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return {
    // canvas
    nodes,
    pageNode,
    selected,
    selectedId,
    theme,
    tab,
    codeTab,
    showCode,
    showTokens,
    zoom,
    history,
    historyIdx,
    copiedToken,
    dragging,
    resizing,
    canvasRef,
    dragNodeType,
    nextDropPos,
    openCats,
    // sessions
    sessions,
    activeSessionId,
    activeSession,
    showSessions,
    renamingId,
    renameValue,
    // setters
    setNodes,
    setSelectedId,
    setTheme,
    setTab,
    setCodeTab,
    setShowCode,
    setShowTokens,
    setZoom,
    setCopiedToken,
    setOpenCats,
    setDragging,
    setShowSessions,
    setRenamingId,
    setRenameValue,
    // actions
    pushHistory,
    undo,
    redo,
    updateNodePos,
    updateNodeProps,
    updateNodeText,
    removeNode,
    addNodeToCanvas,
    handleDragStart,
    handleCanvasDrop,
    handleDragOver,
    handleCanvasClick,
    handleStartDrag,
    handleStartResize,
    handleExport,
    handleCopyCode,
    applyToken,
    // session actions
    switchSession,
    createSession,
    deleteSession,
    renameSession,
    duplicateSession,
  };
}
