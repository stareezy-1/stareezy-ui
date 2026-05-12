/**
 * SummaryCard — two-column summary card.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface ISummaryCardProps {
  style?: React.CSSProperties | Record<string, unknown>;
  leftTitle?: string;
  leftSubTitle?: string;
  rightTitle?: string;
  rightSubTitle?: string;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptySubTitle?: string;
}

export const SummaryCard: React.FC<ISummaryCardProps> = ({
  style, leftTitle, leftSubTitle, rightTitle, rightSubTitle,
  isEmpty=false, emptyTitle="No data", emptySubTitle,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <div style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,border:`1px solid ${themed.borderDefault}`,padding:spacing[16].value,...(style as React.CSSProperties)}}>
        {isEmpty ? (
          <div style={{textAlign:"center",padding:spacing[16].value}}>
            <div style={{color:themed.textSecondary,fontSize:spacing[16].value,fontWeight:600}}>{emptyTitle}</div>
            {emptySubTitle && <div style={{color:themed.textTertiary,fontSize:spacing[14].value,marginTop:spacing[4].value}}>{emptySubTitle}</div>}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"row",gap:spacing[16].value}}>
            <div style={{flex:1,borderRight:`1px solid ${themed.borderDefault}`,paddingRight:spacing[16].value}}>
              {leftTitle && <div style={{color:themed.textPrimary,fontSize:spacing[16].value,fontWeight:600}}>{leftTitle}</div>}
              {leftSubTitle && <div style={{color:themed.textSecondary,fontSize:spacing[14].value,marginTop:spacing[4].value}}>{leftSubTitle}</div>}
            </div>
            <div style={{flex:1}}>
              {rightTitle && <div style={{color:themed.textPrimary,fontSize:spacing[16].value,fontWeight:600}}>{rightTitle}</div>}
              {rightSubTitle && <div style={{color:themed.textSecondary,fontSize:spacing[14].value,marginTop:spacing[4].value}}>{rightSubTitle}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,borderWidth:1,borderColor:themed.borderDefault,padding:spacing[16].value,...(style as Record<string,unknown>)}}>
      {isEmpty ? (
        <View style={{alignItems:"center",padding:spacing[16].value}}>
          <Text style={{color:themed.textSecondary,fontSize:spacing[16].value,fontWeight:"600"}}>{emptyTitle}</Text>
          {emptySubTitle && <Text style={{color:themed.textTertiary,fontSize:spacing[14].value,marginTop:spacing[4].value}}>{emptySubTitle}</Text>}
        </View>
      ) : (
        <View style={{flexDirection:"row"}}>
          <View style={{flex:1,borderRightWidth:1,borderRightColor:themed.borderDefault,paddingRight:spacing[16].value}}>
            {leftTitle && <Text style={{color:themed.textPrimary,fontSize:spacing[16].value,fontWeight:"600"}}>{leftTitle}</Text>}
            {leftSubTitle && <Text style={{color:themed.textSecondary,fontSize:spacing[14].value,marginTop:spacing[4].value}}>{leftSubTitle}</Text>}
          </View>
          <View style={{flex:1,paddingLeft:spacing[16].value}}>
            {rightTitle && <Text style={{color:themed.textPrimary,fontSize:spacing[16].value,fontWeight:"600"}}>{rightTitle}</Text>}
            {rightSubTitle && <Text style={{color:themed.textSecondary,fontSize:spacing[14].value,marginTop:spacing[4].value}}>{rightSubTitle}</Text>}
          </View>
        </View>
      )}
    </View>
  );
};

SummaryCard.displayName = "SummaryCard";
export default SummaryCard;
