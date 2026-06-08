import {
  Box,
  Text,
  Button,
  Input,
  Badge,
  Tag,
  Switch,
  Checkbox,
  Progress,
  CircularProgress,
  Card,
  Avatar,
  Tabs,
  NavBar,
  Breadcrumb,
  Pagination,
  Modal,
  Drawer,
  Tooltip,
  Dropdown,
  CommandPalette,
  Slider,
  Table,
  Toast,
  Clipboard,
  FileDropZone,
  Resizer,
  ProgressPanel,
  Skeleton,
  Spinner,
  Divider,
  HStack,
  VStack,
  EButtonType,
  EButtonSize,
  EInputType,
  EInputSize,
  ETagVariant,
} from "@stareezy-ui/components";
import type {
  TabItem,
  BreadcrumbItem,
  DropdownOption,
  ProgressStep,
  TableColumn,
} from "@stareezy-ui/components";
import type { CanvasNode, ComponentDef } from "./types";
import { COMPONENT_DEFS } from "./data";

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function createNode(
  type: string,
  def?: ComponentDef,
  dropX = 40,
  dropY = 40,
): CanvasNode {
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
        return `${pad}<${tag} ${props}>\n${generateCode(
          node.children,
          indent + 1,
        )}${pad}</${tag}>`;
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
    case "primary":
      return EButtonType.Primary;
    case "secondary":
      return EButtonType.Secondary;
    case "tertiary":
      return EButtonType.Tertiary;
    case "outline":
      return EButtonType.Outline;
    case "ghost":
      return EButtonType.Ghost;
    case "danger":
      return EButtonType.Danger;
    case "link":
      return EButtonType.Link;
    default:
      return EButtonType.Primary;
  }
}

function btnSize(s?: string): EButtonSize {
  switch (s) {
    case "SM":
      return EButtonSize.SM;
    case "MD":
      return EButtonSize.MD;
    case "LG":
      return EButtonSize.LG;
    case "XL":
      return EButtonSize.XL;
    case "XXL":
      return EButtonSize.XXL;
    default:
      return EButtonSize.MD;
  }
}

function inputType(s?: string): EInputType {
  switch (s) {
    case "TextField":
      return EInputType.TextField;
    case "TextArea":
      return EInputType.TextArea;
    case "SearchBar":
      return EInputType.SearchBar;
    case "PhoneNumber":
      return EInputType.PhoneNumber;
    case "Number":
      return EInputType.Number;
    default:
      return EInputType.TextField;
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
    status:
      i < current
        ? ("complete" as const)
        : i === current
        ? ("active" as const)
        : ("pending" as const),
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

function makeCommandItems(
  n: number,
): { id: string; label: string; onSelect: () => void }[] {
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

  // Layout props forwarded to Box-based primitives (no width/height —
  // those are controlled by the card wrapper, not the component itself)
  const layoutProps = {
    ...(typeof p.p === "number" && { p: p.p }),
    ...(typeof p.bg === "string" && { bg: p.bg }),
  } as const;

  switch (node.type) {
    case "Box":
      return (
        <Box
          {...layoutProps}
          {...(typeof p.borderRadius === "number" && {
            rounded: p.borderRadius,
          })}
          style={{ width: "100%", height: "100%", minHeight: 40 }}
        >
          {node.children.length > 0 ? (
            node.children.map((c) => <RenderNode key={c.id} node={c} />)
          ) : (
            <Text text="Box" />
          )}
        </Box>
      );
    case "Stack":
    case "VStack":
      return (
        <VStack
          {...layoutProps}
          gap={typeof p.spacing === "number" ? p.spacing : 8}
          style={{ width: "100%", minHeight: 40 }}
        >
          {node.children.length > 0 ? (
            node.children.map((c) => <RenderNode key={c.id} node={c} />)
          ) : (
            <Text text="VStack" />
          )}
        </VStack>
      );
    case "HStack":
      return (
        <HStack
          {...layoutProps}
          gap={typeof p.spacing === "number" ? p.spacing : 8}
          style={{ width: "100%" }}
        >
          {node.children.length > 0 ? (
            node.children.map((c) => <RenderNode key={c.id} node={c} />)
          ) : (
            <Text text="HStack" />
          )}
        </HStack>
      );
    case "Grid":
      return (
        <Box
          {...layoutProps}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${p.columns || 2}, 1fr)`,
            gap: typeof p.gap === "number" ? p.gap : 12,
            width: "100%",
          }}
        >
          {node.children.length > 0 ? (
            node.children.map((c) => <RenderNode key={c.id} node={c} />)
          ) : (
            <Text text="Grid" />
          )}
        </Box>
      );
    case "Button":
      return (
        <Button
          text={node.text || "Button"}
          type={btnType(p.type as string)}
          size={btnSize(p.size as string)}
          {...(!!p.loading && { loading: true })}
          {...(!!p.disabled && { disabled: true })}
        />
      );
    case "IconButton":
      return (
        <Button
          icon={<Text text={String(p.icon || "★")} />}
          size={btnSize(p.size as string)}
        />
      );
    case "Input":
      return (
        <Input
          placeholder={String(p.placeholder || "Type here...")}
          type={inputType(p.type as string)}
          size={
            p.size === "Lg"
              ? EInputSize.Lg
              : p.size === "sm"
              ? EInputSize.Sm
              : EInputSize.Md
          }
          style={{ width: "100%" }}
        />
      );
    case "Checkbox":
      return (
        <Checkbox
          label={String(p.label || "Option")}
          checked={!!p.checked}
          {...(typeof p.color === "string" && { color: p.color })}
        />
      );
    case "Switch":
      return (
        <Switch
          value={!!p.value}
          label={String(p.label || "Toggle")}
          {...(typeof p.activeColor === "string" && {
            activeColor: p.activeColor,
          })}
        />
      );
    case "Slider":
      return <></>;
    case "FileDropZone":
      return (
        <FileDropZone
          onFiles={() => {}}
          accept={String(p.accept || "image/*")}
          multiple={!!p.multiple}
          label={String(p.label || "Drop files here")}
          {...(typeof p.hint === "string" && p.hint ? { hint: p.hint } : {})}
          style={{ width: "100%" }}
        />
      );
    case "Table":
      return (
        <Table
          columns={makeTableCols(typeof p.cols === "number" ? p.cols : 3)}
          rows={makeTableRows(
            typeof p.rows === "number" ? p.rows : 3,
            typeof p.cols === "number" ? p.cols : 3,
          )}
        />
      );
    case "Progress":
      return (
        <Progress
          value={typeof p.value === "number" ? p.value : 65}
          max={typeof p.max === "number" ? p.max : 100}
          {...(typeof p.color === "string" && { color: p.color })}
          style={{ width: "100%" }}
        />
      );
    case "CircularProgress": {
      const cpSizeMap: Record<string, "xs" | "sm" | "md" | "lg" | "xl"> = {
        xs: "xs",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
      };
      const cpSize =
        typeof p.size === "string" && p.size in cpSizeMap
          ? cpSizeMap[p.size]!
          : "md";
      return (
        <CircularProgress
          value={typeof p.value === "number" ? p.value : 75}
          size={cpSize}
          {...(typeof p.color === "string" && { color: p.color })}
        />
      );
    }
    case "Badge":
      return (
        <Badge
          label={String(p.label || "Badge")}
          variant={
            (p.variant as "green" | "amber" | "red" | "purple" | "default") ||
            "default"
          }
        />
      );
    case "Tag":
      return (
        <Tag
          label={String(p.label || "Tag")}
          variant={
            (p.variant as "solid" | "outline" | "subtle") === "outline"
              ? ETagVariant.Outline
              : (p.variant as "solid" | "outline" | "subtle") === "subtle"
              ? ETagVariant.Subtle
              : ETagVariant.Solid
          }
          {...(typeof p.color === "string" && { color: p.color })}
        />
      );
    case "NavBar":
      return (
        <NavBar
          logo={<Text text={String(p.brand || "App")} />}
          links={
            <HStack gap={12}>
              {Array.from({
                length: typeof p.items === "number" ? p.items : 3,
              }).map((_, i) => (
                <Text key={i} text={`Item ${i + 1}`} />
              ))}
            </HStack>
          }
          actions={<Button text="Action" size={EButtonSize.SM} />}
          style={{ width: "100%" }}
        />
      );
    case "Tabs":
      return (
        <Tabs
          items={makeTabs(typeof p.tabs === "number" ? p.tabs : 3)}
          defaultActiveKey={
            typeof p.active === "number" ? `tab-${p.active}` : "tab-0"
          }
          variant={(p.variant as "underline" | "pills" | "card") || "underline"}
          style={{ width: "100%" }}
        />
      );
    case "Breadcrumb":
      return (
        <Breadcrumb
          items={makeBreadcrumbs(typeof p.items === "number" ? p.items : 3)}
        />
      );
    case "Pagination":
      return (
        <Pagination
          page={typeof p.page === "number" ? p.page : 1}
          totalPages={typeof p.totalPages === "number" ? p.totalPages : 10}
          onPageChange={() => {}}
        />
      );
    case "Modal":
      return (
        <Modal
          open
          title={String(p.title || "Modal Title")}
          size={(p.size as "xs" | "sm" | "md" | "lg" | "xl" | "full") || "sm"}
          onClose={() => {}}
        >
          <Text text={node.text || "Modal content goes here."} />
        </Modal>
      );
    case "Drawer":
      return (
        <Drawer
          open
          anchor={(p.anchor as "left" | "right" | "bottom") || "right"}
          onClose={() => {}}
          title={String(p.title || "Drawer")}
        >
          <Text text="Drawer content" />
        </Drawer>
      );
    case "Tooltip":
      return (
        <Tooltip
          content={String(p.content || "Tooltip text")}
          placement={
            (p.placement as "top" | "bottom" | "left" | "right") || "top"
          }
        >
          <Text text="Hover me" />
        </Tooltip>
      );
    case "Dropdown":
      return (
        <Dropdown
          options={makeDropdownOptions(
            typeof p.items === "number" ? p.items : 3,
          )}
          placeholder={String(p.placeholder || "Select...")}
          style={{ width: "100%" }}
        />
      );
    case "CommandPalette":
      return (
        <CommandPalette
          items={makeCommandItems(4)}
          onClose={() => {}}
          placeholder={String(p.placeholder || "Search commands...")}
        />
      );
    case "Avatar":
      return (
        <Avatar
          name={String(p.name || "SU")}
          size={(p.size as "xs" | "sm" | "md" | "lg" | "xl" | "2xl") || "md"}
          shape={(p.shape as "circle" | "rounded" | "square") || "circle"}
          {...(typeof p.src === "string" && p.src ? { src: p.src } : {})}
        />
      );
    case "Skeleton":
      return (
        <Skeleton
          width={typeof p.width === "number" ? p.width : "100%"}
          height={typeof p.height === "number" ? p.height : 16}
          variant={
            (p.variant as "text" | "circular" | "rectangular" | "rounded") ||
            "rectangular"
          }
        />
      );
    case "Divider":
      return (
        <Divider
          {...(typeof p.color === "string" && { color: p.color })}
          orientation={
            (p.orientation as "horizontal" | "vertical") || "horizontal"
          }
          variant={(p.variant as "solid" | "dashed" | "dotted") || "solid"}
        />
      );
    case "Card":
      return (
        <Card
          {...layoutProps}
          title={typeof p.title === "string" ? p.title : "Card Title"}
          description={
            typeof p.description === "string"
              ? p.description
              : "Card description"
          }
          variant={(p.variant as "border" | "shadow" | "glow") || "border"}
          style={{ width: "100%" }}
        >
          {node.children.length > 0
            ? node.children.map((c) => <RenderNode key={c.id} node={c} />)
            : undefined}
        </Card>
      );
    case "Toast":
      return (
        <Toast
          variant={
            (p.variant as "success" | "error" | "warning" | "info") || "success"
          }
          message={String(p.message || "Toast message")}
          style={{ width: "100%" }}
        />
      );
    case "Clipboard":
      return (
        <Clipboard
          value={String(p.value || "Copy me!")}
          showValue={p.showValue !== false}
          style={{ width: "100%" }}
        />
      );
    case "Resizer":
      return (
        <Resizer
          defaultWidth={
            typeof p.defaultWidth === "number" ? p.defaultWidth : 240
          }
          minWidth={typeof p.minWidth === "number" ? p.minWidth : 100}
        >
          <Text text="Resize me" />
        </Resizer>
      );
    case "ProgressPanel":
      return (
        <ProgressPanel
          steps={makeProgressSteps(
            typeof p.steps === "number" ? p.steps : 4,
            typeof p.current === "number" ? p.current : 2,
          )}
          currentStep={typeof p.current === "number" ? p.current : 2}
          style={{ width: "100%" }}
        />
      );
    case "Spinner":
      return (
        <Spinner
          size={(p.size as "xs" | "sm" | "md" | "lg" | "xl") || "md"}
          variant={(p.variant as "ring" | "dots" | "pulse") || "ring"}
          {...(typeof p.color === "string" && { color: p.color })}
        />
      );
    default:
      return (
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
          }}
        >
          <Text text={node.type} />
        </Box>
      );
  }
}
