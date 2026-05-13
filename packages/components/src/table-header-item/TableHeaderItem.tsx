/**
 * TableHeaderItem — single header cell for Table.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ETextType } from "../primitives/Text";

export { ETextType };

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export interface ITableHeaderItemProps {
  testID?: string;
  title?: string;
  onSortPress?(): void;
  children?: React.ReactNode;
  containerStyle?: React.CSSProperties | Record<string, unknown>;
  titleStyle?: React.CSSProperties | Record<string, unknown>;
  titleType?: ETextType;
  sortIcon?: React.ReactNode;
  isLast?: boolean;
}

export const TableHeaderItem: React.FC<ITableHeaderItemProps> = ({
  testID, title, onSortPress, children, containerStyle, titleStyle, sortIcon, isLast=false,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    const style: React.CSSProperties = {
      padding: `${spacing[8].value}px ${spacing[12].value}px`,
      borderRight: isLast ? "none" : `1px solid ${themed.borderDefault}`,
      display: "flex",
      alignItems: "center",
      gap: spacing[4].value,
      cursor: onSortPress ? "pointer" : "default",
      ...(containerStyle as React.CSSProperties),
    };
    return (
      <div style={style} data-testid={testID} onClick={onSortPress} role={onSortPress?"button":undefined} tabIndex={onSortPress?0:undefined}
        onKeyDown={onSortPress?(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSortPress();}}:undefined}
        aria-label={title}>
        {children ?? (
          <>
            <span style={{color:themed.textSecondary,fontSize:spacing[12].value,fontWeight:600,...flattenStyle(titleStyle)}}>{title}</span>
            {sortIcon}
          </>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  const rnStyle: Record<string,unknown> = {
    padding: spacing[8].value,
    flexDirection: "row",
    alignItems: "center",
    ...(containerStyle as Record<string,unknown>),
  };
  const inner = children ?? (
    <>
      <Text style={{color:themed.textSecondary,fontSize:spacing[12].value,fontWeight:"600",...flattenStyle(titleStyle)}}>{title}</Text>
      {sortIcon}
    </>
  );
  if (onSortPress) {
    return <TouchableOpacity style={rnStyle} onPress={onSortPress} testID={testID} accessibilityLabel={title}>{inner}</TouchableOpacity>;
  }
  return <View style={rnStyle} testID={testID}>{inner}</View>;
};

TableHeaderItem.displayName = "TableHeaderItem";
export default TableHeaderItem;
