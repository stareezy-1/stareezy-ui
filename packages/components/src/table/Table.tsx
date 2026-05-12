/**
 * Table — renders columns/rows with zebra stripe support.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, colors } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ETextType } from "../primitives/Text";

export { ETextType };

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface TableColumnType<T> {
  title?: string;
  onSortPress?(): void;
  headerChildren?: React.ReactNode;
  headerContainerStyle?: React.CSSProperties | Record<string, unknown>;
  titleStyle?: React.CSSProperties | Record<string, unknown>;
  titleType?: ETextType;
  sortIcon?: React.ReactNode;
  cell?(item: T, index?: number): React.ReactNode;
  cellContainerStyle?: React.CSSProperties | Record<string, unknown>;
  width?: string | number;
}

export interface ITableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  tableStyle?: React.CSSProperties | Record<string, unknown>;
  tableHeaderStyle?: React.CSSProperties | Record<string, unknown>;
  tableRowStyle?: React.CSSProperties | Record<string, unknown>;
  zebraStripe?: boolean;
  paginationComponent?: React.ReactNode;
  footer?: React.ReactNode;
  triggerCallbackonRow?: React.DependencyList;
  rowHeights?: number[];
  setRowHeights?: React.Dispatch<React.SetStateAction<number[]>>;
  rowChildren?(item: T): React.ReactNode;
  onScrollEnd?(): void;
  onScrollChange?: (y: number) => void;
  isHideHeader?: boolean;
  onRowPress?: (item: T) => void;
  isVerticalScroll?: boolean;
  testID?: string;
  zebraStripeColor?: string;
  lastRow?: React.ReactNode;
  loading?: boolean;
  loadingChildren?: boolean | ((rowData: T, rowIndex: number) => boolean);
}

export function Table<T>({
  columns, data, tableStyle, tableHeaderStyle, tableRowStyle,
  zebraStripe=false, zebraStripeColor, paginationComponent, footer,
  isHideHeader=false, onRowPress, testID, loading=false, lastRow,
}: ITableProps<T>): React.ReactElement {
  const themed = useThemedColors();
  const zebraColor = zebraStripeColor ?? colors.raisinBlack[25].value;

  if (isWeb) {
    return (
      <div style={{width:"100%",overflowX:"auto",...(tableStyle as React.CSSProperties)}} data-testid={testID}>
        <table style={{width:"100%",borderCollapse:"collapse",borderSpacing:0}}>
          {!isHideHeader && (
            <thead>
              <tr style={{backgroundColor:themed.bgSecondary,...(tableHeaderStyle as React.CSSProperties)}}>
                {columns.map((col, ci) => (
                  <th key={ci} style={{padding:`${spacing[8].value}px ${spacing[12].value}px`,textAlign:"left",color:themed.textSecondary,fontSize:spacing[12].value,fontWeight:600,borderBottom:`1px solid ${themed.borderDefault}`,width:col.width,...(col.headerContainerStyle as React.CSSProperties)}}
                    onClick={col.onSortPress}>
                    {col.headerChildren ?? (
                      <span style={col.titleStyle as React.CSSProperties}>{col.title}{col.sortIcon}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} style={{textAlign:"center",padding:spacing[16].value,color:themed.textSecondary}}>Loading...</td></tr>
            ) : data.map((row, ri) => (
              <tr key={ri}
                style={{backgroundColor:zebraStripe&&ri%2===1?zebraColor:themed.bgPrimary,cursor:onRowPress?"pointer":"default",...(tableRowStyle as React.CSSProperties)}}
                onClick={()=>onRowPress?.(row)}>
                {columns.map((col, ci) => (
                  <td key={ci} style={{padding:`${spacing[8].value}px ${spacing[12].value}px`,borderBottom:`1px solid ${themed.borderDefault}`,color:themed.textPrimary,fontSize:spacing[14].value,...(col.cellContainerStyle as React.CSSProperties)}}>
                    {col.cell ? col.cell(row, ri) : null}
                  </td>
                ))}
              </tr>
            ))}
            {lastRow && <tr><td colSpan={columns.length}>{lastRow}</td></tr>}
          </tbody>
        </table>
        {paginationComponent}
        {footer}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text, ScrollView, ActivityIndicator } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>; ScrollView:React.ComponentType<Record<string,unknown>>; ActivityIndicator:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{...(tableStyle as Record<string,unknown>)}} testID={testID}>
      {!isHideHeader && (
        <View style={{flexDirection:"row",backgroundColor:themed.bgSecondary,...(tableHeaderStyle as Record<string,unknown>)}}>
          {columns.map((col, ci) => (
            <TouchableOpacity key={ci} onPress={col.onSortPress} style={{flex:1,padding:spacing[8].value,...(col.headerContainerStyle as Record<string,unknown>)}}>
              {col.headerChildren ?? <Text style={{color:themed.textSecondary,fontSize:spacing[12].value,fontWeight:"600",...(col.titleStyle as Record<string,unknown>)}}>{col.title}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )}
      <ScrollView>
        {loading ? (
          <View style={{padding:spacing[16].value,alignItems:"center"}}><ActivityIndicator/></View>
        ) : data.map((row, ri) => (
          <TouchableOpacity key={ri} onPress={()=>onRowPress?.(row)} disabled={!onRowPress}
            style={{flexDirection:"row",backgroundColor:zebraStripe&&ri%2===1?zebraColor:themed.bgPrimary,...(tableRowStyle as Record<string,unknown>)}}>
            {columns.map((col, ci) => (
              <View key={ci} style={{flex:1,padding:spacing[8].value,...(col.cellContainerStyle as Record<string,unknown>)}}>
                {col.cell ? col.cell(row, ri) : null}
              </View>
            ))}
          </TouchableOpacity>
        ))}
        {lastRow}
      </ScrollView>
      {paginationComponent}
      {footer}
    </View>
  );
}

Table.displayName = "Table";
export default Table;
