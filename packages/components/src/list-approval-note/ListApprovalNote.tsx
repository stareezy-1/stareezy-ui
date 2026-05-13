/**
 * ListApprovalNote — approval note list item.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius, colors } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export enum EListApprovalNoteType {
  Default = "Default",
  Approve = "Approve",
  Decline = "Decline",
}

export interface IListApprovalNoteProps {
  type?: EListApprovalNoteType;
  title: string;
  subTitle?: string;
  style?: React.CSSProperties | Record<string, unknown>;
  onPress?: () => void;
}

function getTypeColor(type: EListApprovalNoteType, themed: ReturnType<typeof useThemedColors>): string {
  switch (type) {
    case EListApprovalNoteType.Approve: return colors.lawnGreen[500].value;
    case EListApprovalNoteType.Decline: return colors.crimsonRed[500].value;
    default: return themed.borderDefault;
  }
}

export const ListApprovalNote: React.FC<IListApprovalNoteProps> = ({
  type=EListApprovalNoteType.Default, title, subTitle, style, onPress,
}) => {
  const themed = useThemedColors();
  const accentColor = getTypeColor(type, themed);

  if (isWeb) {
    return (
      <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start",padding:spacing[12].value,borderRadius:radius.md.value,border:`1px solid ${themed.borderDefault}`,backgroundColor:themed.bgPrimary,cursor:onPress?"pointer":"default",...flattenStyle(style)}}
        onClick={onPress} role={onPress?"button":undefined} tabIndex={onPress?0:undefined}
        onKeyDown={onPress?(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onPress();}}:undefined}
        aria-label={title}>
        <div style={{width:4,borderRadius:radius.full.value,backgroundColor:accentColor,alignSelf:"stretch",marginRight:spacing[12].value,minHeight:40}}/>
        <div style={{flex:1}}>
          <div style={{color:themed.textPrimary,fontSize:spacing[14].value,fontWeight:600}}>{title}</div>
          {subTitle && <div style={{color:themed.textSecondary,fontSize:spacing[12].value,marginTop:spacing[4].value}}>{subTitle}</div>}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  const inner = (
    <View style={{flexDirection:"row",alignItems:"flex-start",padding:spacing[12].value,borderRadius:radius.md.value,borderWidth:1,borderColor:themed.borderDefault,backgroundColor:themed.bgPrimary,...flattenStyle(style)}}>
      <View style={{width:4,borderRadius:radius.full.value,backgroundColor:accentColor,alignSelf:"stretch",marginRight:spacing[12].value,minHeight:40}}/>
      <View style={{flex:1}}>
        <Text style={{color:themed.textPrimary,fontSize:spacing[14].value,fontWeight:"600"}}>{title}</Text>
        {subTitle && <Text style={{color:themed.textSecondary,fontSize:spacing[12].value,marginTop:spacing[4].value}}>{subTitle}</Text>}
      </View>
    </View>
  );
  if (onPress) return <TouchableOpacity onPress={onPress} accessibilityLabel={title}>{inner}</TouchableOpacity>;
  return inner;
};

ListApprovalNote.displayName = "ListApprovalNote";
export default ListApprovalNote;
