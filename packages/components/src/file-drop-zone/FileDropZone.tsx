"use client";
import React, { useRef, useState } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import {
  makeFileDropZoneBaseStyle,
  makeFileDropZoneStateStyles,
} from "./FileDropZone.style";
import type { FileDropZoneState } from "./FileDropZone.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";

export type { FileDropZoneState } from "./FileDropZone.types";

export interface FileDropZoneProps extends BoxLayoutProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  hint?: string;
  style?: React.CSSProperties;
}

export const FileDropZone: SzrFC<FileDropZoneProps> = (props) => {
  const { sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const {
    onFiles,
    accept,
    multiple = false,
    label = "Drop files here or click to browse",
    hint,
    style,
  } = rest as FileDropZoneProps;
  const [state, setState] = useState<FileDropZoneState>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const themed = useThemedColors();

  if (!isWeb) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      onFiles(Array.from(files));
      setState("accepted");
    } catch (err) {
      console.error("[FileDropZone] onFiles threw:", err);
      setState("idle");
    }
  };

  const baseStyle = makeFileDropZoneBaseStyle(themed);
  const stateStyles = makeFileDropZoneStateStyles(themed);
  const stateStyle = stateStyles[state];

  const dropZoneEl = (
    <div
      style={{
        ...baseStyle,
        ...stateStyle,
        ...style,
        ...sxStyle,
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setState("drag-over");
      }}
      onDragLeave={() => setState("idle")}
      onDrop={(e) => {
        e.preventDefault();
        setState("idle");
        handleFiles(e.dataTransfer.files);
      }}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
        aria-hidden="true"
      />
      <span
        style={{
          fontSize: 32,
          color: state === "drag-over" ? themed.colorSuccess : themed.textMuted,
        }}
      >
        {state === "accepted" ? "✓" : state === "drag-over" ? "↓" : "⬆"}
      </span>
      <Text
        type={ETextType.AuroraDropZoneLabel}
        text={state === "accepted" ? "Files accepted!" : label}
        color={state === "drag-over" ? themed.colorSuccess : themed.textPrimary}
      />
      {hint && state === "idle" && (
        <Text
          type={ETextType.AuroraDropZoneHint}
          text={hint}
          color={themed.textMuted}
        />
      )}
    </div>
  );

  if (sxCss)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {dropZoneEl}
      </>
    );
  return dropZoneEl;
};

FileDropZone.displayName = "FileDropZone";
export default FileDropZone;
