"use client";
import React, { useRef, useState } from "react";
import { isWeb } from "../shared/platform";
import { Text, ETextType } from "../primitives/Text";
import { aurora } from "@stareezy-ui/tokens";
import {
  fileDropZoneBaseStyle,
  fileDropZoneStateStyles,
} from "./FileDropZone.style";
import type { FileDropZoneState } from "./FileDropZone.types";

export type { FileDropZoneState } from "./FileDropZone.types";

export interface FileDropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  hint?: string;
  style?: React.CSSProperties;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFiles,
  accept,
  multiple = false,
  label = "Drop files here or click to browse",
  hint,
  style,
}) => {
  const [state, setState] = useState<FileDropZoneState>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const stateStyle = fileDropZoneStateStyles[state];

  return (
    <div
      style={{
        ...fileDropZoneBaseStyle,
        ...stateStyle,
        ...style,
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
          color:
            state === "drag-over"
              ? aurora.auroraGreen.value
              : aurora.textMuted.value,
        }}
      >
        {state === "accepted" ? "✓" : state === "drag-over" ? "↓" : "⬆"}
      </span>
      <Text
        type={ETextType.AuroraDropZoneLabel}
        text={state === "accepted" ? "Files accepted!" : label}
        color={
          state === "drag-over"
            ? aurora.auroraGreen.value
            : aurora.starWhite.value
        }
      />
      {hint && state === "idle" && (
        <Text
          type={ETextType.AuroraDropZoneHint}
          text={hint}
          color={aurora.textMuted.value}
        />
      )}
    </div>
  );
};

FileDropZone.displayName = "FileDropZone";
export default FileDropZone;
