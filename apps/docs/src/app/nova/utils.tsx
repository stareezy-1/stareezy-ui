import {
  Box, Text, Button, Input, Badge, Tag, Switch, Checkbox,
  Progress, CircularProgress, Card, Avatar, Tabs, NavBar,
  Breadcrumb, Pagination, Modal, Drawer, Tooltip, Dropdown,
  CommandPalette, Slider, Table, Toast, Clipboard, FileDropZone,
  Resizer, ProgressPanel, Skeleton, Spinner, Divider,
  HStack, VStack,
  EButtonType, EButtonSize, EInputType, EInputSize,
  ETagVariant,
} from "@stareezy-ui/components";
import type { TabItem, BreadcrumbItem, DropdownOption, ProgressStep, TableColumn } from "@stareezy-ui/components";
import type { CanvasNode, ComponentDef } from "./types";
import { COMPONENT_DEFS } from "./data";

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function createNode(type: string, def?: ComponentDef, dropX = 40, dropY = 40): CanvasNode {
  const found = def || COMPONENT_DEFS.find((c) => c.type === type);
  const d = found || COMPONENT_DEFS[0]!;
  return {
    id: generateId(),
    type: d.type,
    props: { ...d.defaultProps },
    children: [],
    text: d.defaultChildren || d.label,
    x: dropX,
    y: dropY,
  };
}

export function generateCode(nodes: CanvasNode[], indent = 0): string {
  const pad = "  ".repeat(indent);
  return nodes
    .map((node) => {
      const props = Object.entries(node.props)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${k}={${typeof v === "string" ? `"${v}"` : v}}`)
        .join(" ");
      const tag = node.type;
      if (node.children.length > 0) {
        return `${pad}<${tag} ${props}>\n${generateCode(node.children, indent + 1)}${pad}</${tag}>`;
      }
      if (node.text) {
        return `${pad}<${tag} ${props}>${node.text}</${tag}>`;
      }
      return `${pad}<${tag} ${props} />`;
    })
    .join("\n");
}

export function findNode(nodes: CanvasNode[], id: string): CanvasNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children.length > 0) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

function btnType(s?: string): EButtonType {
  switch (s) {
    case "primary": return EButtonType.Primary;
    case "secondary": return EButtonType.Secondary;
    case "tertiary": return EButtonType.Tertiary;
    case "outline": return EButtonType.Outline;
    case "ghost": return EButtonType.Ghost;
    case "danger": return EButtonType.Danger;
    case "link": return EButtonType.Link;
    default: return EButtonType.Primary;
  }
}

function btnSize(s?: string): EButtonSize {
  switch (s) {
    case "SM": return EButtonSize.SM;
    case "MD": return EButtonSize.MD;
    case "LG": return EButtonSize.LG;
    case "XL": return EButtonSize.XL;
    case "XXL": return EButtonSize.XXL;
    default: return EButtonSize.MD;
  }
}

function inputType(s?: string): EInputType {
  switch (s) {
    case "TextField": return EInputType.TextField;
    case "TextArea": return EInputType.TextArea;
    case "SearchBar": return EInputType.SearchBar;
    case "PhoneNumber": return EInputType.PhoneNumber;
    case "Number": return EInputType.Number;
    default: return EInputType.TextField;
  }
}

function makeTabs(n: number): TabItem[] {
  return Array.from({ length: Math.max(1, n) }, (_, i) => ({
    key: `tab-${i}`,
    label: `Tab ${i + 1}`,
    content: `Content ${i + 1}`,
  }));
}

function makeBreadcrumbs(n: number): BreadcrumbItem[] {
  return Array.from({ length: Math.max(1, n) }, (_, i) => ({
    label: `Item ${i + 1}`,
  }));
}

function makeDropdownOptions(n: number): DropdownOption[] {
  return Array.from({ length: Math.max(1, n) }, (_, i) => ({
    value: `opt-${i}`,
    label: `Option ${i + 1}`,
  }));
}

function makeProgressSteps(n: number, current: number): ProgressStep[] {
  return Array.from({ length: Math.max(1, n) }, (_, i) => ({
    id: `step-${i}`,
    label: `Step ${i + 1}`,
    status: i < current ? "complete" as const : i === current ? "active" as const : "pending" as const,
  }));
}

function makeTableCols(n: number): TableColumn[] {
  return Array.from({ length: Math.max(1, n) }, (_, i) => ({
    key: `col-${i}`,
    header: `Col ${i + 1}`,
  }));
}

function makeTableRows(n: number, cols: number): Record<string, string>[] {
  return Array.from({ length: Math.max(1, n) }, (_, ri) => {
    const row: Record<string, string> = {};
    for (let ci = 0; ci < cols; ci++) {
      row[`col-${ci}`] = `R${ri + 1}C${ci + 1}`;
    }
    return row;
  });
}

function makeCommandItems(n: number): { id: string; label: string; onSelect: () => void }[] {
  return Array.from({ length: Math.max(1, n) }, (_, i) => ({
    id: `cmd-${i}`,
    label: `Command ${i + 1}`,
    onSelect: () => {},
  }));
}

export function renderPreview(node: CanvasNode): JSX.Element {
  return <RenderNode node={node} />;
}

function RenderNode({ node }: { node: CanvasNode }): JSX.Element {
  const p = node.props;
  const common = {
    p: typeof p.p === "number" ? p.p : undefined,
    bg: typeof p.bg === "string" ? p.bg : undefined,
    width: typeof p.width === "number" ? p.width : undefined,
    height: typeof p.height === "number" ? p.height : undefined,
  };

  switch (node.type) {
    case "Box":
      return (
        <Box {...common} rounded={typeof p.borderRadius === "number" ? p.borderRadius : undefined} style={{ width: "100%", height: "100%" }}>
          {node.children.length > 0 ? node.children.map((c) => <RenderNode key={c.id} node={c} />) : <Text text={node.type} />}
        </Box>
      );
    case "Stack":
    case "VStack":
      return (
        <VStack {...common} gap={typeof p.spacing === "number" ? p.spacing : 8} style={{ width: "100%", height: "100%" }}>
          {node.children.length > 0 ? node.children.map((c) => <RenderNode key={c.id} node={c} />) : <Text text={node.type} />}
        </VStack>
      );
    case "HStack":
      return (
        <HStack {...common} gap={typeof p.spacing === "number" ? p.spacing : 8} style={{ width: "100%", height: "100%" }}>
          {node.children.length > 0 ? node.children.map((c) => <RenderNode key={c.id} node={c} />) : <Text text={node.type} />}
        </HStack>
      );
    case "Grid":
      return (
        <Box {...common} style={{ display: "grid", gridTemplateColumns: `repeat(${p.columns || 2}, 1fr)`, gap: typeof p.gap === "number" ? p.gap : 12, width: "100%", height: "100%" }}>
          {node.children.length > 0 ? node.children.map((c) => <RenderNode key={c.id} node={c} />) : <Text text={node.type} />}
        </Box>
      );
    case "Button":
      return <Button text={node.text || "Button"} type={btnType(p.type as string)} size={btnSize(p.size as string)} style={{ width: "100%", height: "100%" }} />;
    case "IconButton":
      return <Button icon={<Text text={String(p.icon || "★")} />} size={btnSize(p.size as string)} style={{ width: "100%", height: "100%" }} />;
    case "Input":
      return <Input placeholder={String(p.placeholder || "Type here...")} type={inputType(p.type as string)} size={p.size === "Lg" ? EInputSize.Lg : p.size === "sm" ? EInputSize.Sm : EInputSize.Md} style={{ width: "100%", height: "100%" }} />;
    case "Checkbox":
      return <Checkbox label={String(p.label || "Option")} checked={!!p.checked} color={p.color as string} />;
    case "Switch":
      return <Switch value={!!p.value} label={String(p.label || "Toggle")} activeColor={p.color as string} />;
    case "Slider":
      return <Slider value={typeof p.value === "number" ? p.value : 50} min={typeof p.min === "number" ? p.min : 0} max={typeof p.max === "number" ? p.max : 100} color={p.color as string} />;
    case "FileDropZone":
      return <FileDropZone onFiles={() => {}} accept={String(p.accept || "image/*")} multiple={!!p.maxFiles && Number(p.maxFiles) > 1} label="Drop files" />;
    case "Table":
      return <Table columns={makeTableCols(typeof p.cols === "number" ? p.cols : 3)} rows={makeTableRows(typeof p.rows === "number" ? p.rows : 3, typeof p.cols === "number" ? p.cols : 3)} />;
    case "Progress":
      return <Progress value={typeof p.value === "number" ? p.value : 65} max={typeof p.max === "number" ? p.max : 100} color={p.color as string} />;
    case "CircularProgress":
      return <CircularProgress value={typeof p.value === "number" ? p.value : 75} size={typeof p.size === "number" ? p.size : 48} color={p.color as string} />;
    case "Badge":
      return <Badge label={String(p.label || "Badge")} variant={(p.variant as "green" | "amber" | "red" | "purple" | "default") || "default"} />;
    case "Tag":
      return <Tag label={String(p.label || "Tag")} variant={ETagVariant.Solid} color={p.color as string} />;
    case "NavBar":
      return <NavBar logo={<Text text={String(p.brand || "App")} />} links={<HStack gap={12}>{Array.from({ length: typeof p.items === "number" ? p.items : 3 }).map((_, i) => <Text key={i} text={`Item ${i + 1}`} />)}</HStack>} actions={<Button text="Action" size={EButtonSize.SM} />} />;
    case "Tabs":
      return <Tabs items={makeTabs(typeof p.tabs === "number" ? p.tabs : 3)} defaultActiveKey={typeof p.active === "number" ? `tab-${p.active}` : "tab-0"} />;
    case "Breadcrumb":
      return <Breadcrumb items={makeBreadcrumbs(typeof p.items === "number" ? p.items : 3)} />;
    case "Pagination":
      return <Pagination page={typeof p.page === "number" ? p.page : 1} totalPages={typeof p.totalPages === "number" ? p.totalPages : 10} onPageChange={() => {}} />;
    case "Modal":
      return <Modal open title={String(p.title || "Modal Title")} size={(p.size as "sm" | "md" | "lg" | "xl" | "full") || "md"}><Text text={node.text || "Modal content"} /></Modal>;
    case "Drawer":
      return <Drawer open anchor={(p.anchor as "left" | "right" | "top" | "bottom") || "right"} onClose={() => {}} title={String(p.title || "Drawer")}><Text text="Drawer content" /></Drawer>;
    case "Tooltip":
      return <Tooltip content={String(p.content || "Tooltip text")} placement={(p.placement as "top" | "bottom" | "left" | "right") || "top"}><Text text={node.type} /></Tooltip>;
    case "Dropdown":
      return <Dropdown options={makeDropdownOptions(typeof p.items === "number" ? p.items : 3)} placeholder={String(p.placeholder || "Select...")} />;
    case "CommandPalette":
      return <CommandPalette items={makeCommandItems(4)} onClose={() => {}} placeholder={String(p.placeholder || "Search commands...")} />;
    case "Avatar":
      return <Avatar name={String(p.name || "SU")} size={(p.size as "sm" | "md" | "lg" | "xl") || "md"} />;
    case "Skeleton":
      return <Skeleton width={typeof p.width === "number" ? p.width : "100%"} height={typeof p.height === "number" ? p.height : 16} />;
    case "Divider":
      return <Divider color={p.color as string} />;
    case "Card":
      return (
        <Card {...common} title={String(p.title || "")} description={String(p.description || "")}>
          {node.children.length > 0 ? node.children.map((c) => <RenderNode key={c.id} node={c} />) : undefined}
        </Card>
      );
    case "Toast":
      return <Toast variant={(p.variant as "success" | "error" | "warning" | "info") || "success"} message={String(p.message || "Toast message")} />;
    case "Clipboard":
      return <Clipboard value={String(p.value || "Copy me!")} />;
    case "Resizer":
      return <Resizer defaultWidth={typeof p.defaultWidth === "number" ? p.defaultWidth : 400} minWidth={typeof p.minWidth === "number" ? p.minWidth : 200}><Text text="Resize me" /></Resizer>;
    case "ProgressPanel":
      return <ProgressPanel steps={makeProgressSteps(typeof p.steps === "number" ? p.steps : 4, typeof p.current === "number" ? p.current : 2)} currentStep={typeof p.current === "number" ? p.current : 2} />;
    case "Spinner":
      return <Spinner size={(p.size as "sm" | "md" | "lg") || "md"} color={p.color as string} />;
    default:
      return <Box style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><Text text={node.type} /></Box>;
  }
}

