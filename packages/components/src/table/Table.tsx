/**
 * Table — cross-platform data table component.
 *
 * All visual styles live in Table.style.ts — no inline color literals here.
 * Colors are resolved at render time via useThemedColors().
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import React from "react";
import { useThemedColors } from "../shared/useThemedColors";
import { isWeb } from "../shared/platform";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { TableColumn, TableRow } from "./Table.types";
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";
import {
  webTableWrapper,
  webTable,
  webCaption,
  webTh,
  webTd,
  nativeScrollWrapper,
  nativeRow,
  nativeHeaderRow,
  nativeTh,
  nativeTd,
} from "./Table.style";

export type { TableColumn, TableRow } from "./Table.types";

// ---------------------------------------------------------------------------
// TableProps
// ---------------------------------------------------------------------------

export interface TableProps extends BoxLayoutProps {
  /** Column definitions. */
  columns: TableColumn[];
  /** Data rows — each is a record of columnKey → ReactNode. */
  rows: TableRow[];
  /** Optional table caption / title (rendered above headers). */
  caption?: string;
  testID?: string;
  accessibilityLabel?: string;
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

export const Table: SzrFC<TableProps> = (props) => {
  const { sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);

  const { columns, rows, caption, testID, accessibilityLabel } =
    rest as TableProps;

  const themed = useThemedColors();

  const tableElement = isWeb ? (
    <div
      style={{
        ...webTableWrapper,
        border: `1px solid ${themed.borderDefault}`,
        ...sxStyle,
      }}
      className={sxClassName || undefined}
      data-testid={testID}
    >
      <table
        style={{
          ...webTable,
          color: themed.textPrimary,
        }}
        aria-label={accessibilityLabel ?? caption}
      >
        {caption && (
          <caption style={{ ...webCaption, color: themed.textPrimary }}>
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{
                  ...webTh,
                  backgroundColor: themed.bgSecondary,
                  color: themed.textPrimary,
                  borderBottomColor: themed.borderDefault,
                  textAlign: col.align ?? "left",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    ...webTd,
                    borderBottomColor: themed.borderDefault,
                    color: themed.textSecondary,
                    textAlign: col.align ?? "left",
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    // React Native
    (() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { ScrollView, View, Text } = require("react-native") as {
        ScrollView: React.ComponentType<Record<string, unknown>>;
        View: React.ComponentType<Record<string, unknown>>;
        Text: React.ComponentType<Record<string, unknown>>;
      };

      return (
        <ScrollView
          horizontal
          testID={testID}
          accessibilityRole="none"
          style={{ ...nativeScrollWrapper, ...sxStyle }}
        >
          <View accessibilityRole="table">
            {caption && (
              <Text
                style={{
                  color: themed.textPrimary,
                  fontWeight: "600",
                  fontSize: 13,
                  marginBottom: 8,
                }}
              >
                {caption}
              </Text>
            )}
            {/* Header row */}
            <View
              accessibilityRole="row"
              style={{
                ...nativeHeaderRow,
                backgroundColor: themed.bgSecondary,
                borderBottomColor: themed.borderDefault,
              }}
            >
              {columns.map((col) => (
                <Text
                  key={col.key}
                  accessibilityRole="columnheader"
                  style={{
                    ...nativeTh,
                    color: themed.textPrimary,
                  }}
                >
                  {col.header}
                </Text>
              ))}
            </View>
            {/* Data rows */}
            {rows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                accessibilityRole="row"
                style={{
                  ...nativeRow,
                  borderBottomColor: themed.borderDefault,
                }}
              >
                {columns.map((col) => (
                  <Text
                    key={col.key}
                    accessibilityRole="cell"
                    style={{
                      ...nativeTd,
                      color: themed.textSecondary,
                    }}
                  >
                    {row[col.key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      );
    })()
  );

  if (sxCss && isWeb)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {tableElement}
      </>
    );
  return tableElement;
};

Table.displayName = "Table";
export default Table;
