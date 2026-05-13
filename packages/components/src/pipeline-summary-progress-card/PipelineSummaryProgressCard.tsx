/**
 * PipelineSummaryProgressCard — progress card for pipeline summary.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius, colors } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export enum EPipelineSummaryProgress {
  WaitingApproval = "Menunggu Approval",
  Ongoing = "Berlangsung",
  Rejected = "Ditolak",
  Approved = "Disetujui",
}

export interface IPipelineSummaryProgressCardProps {
  progress: EPipelineSummaryProgress;
  data: Record<string, unknown>;
  style?: React.CSSProperties | Record<string, unknown>;
  onPress?: () => void;
}

function getProgressColor(progress: EPipelineSummaryProgress): string {
  switch (progress) {
    case EPipelineSummaryProgress.Approved: return colors.lawnGreen[500].value;
    case EPipelineSummaryProgress.Rejected: return colors.crimsonRed[500].value;
    case EPipelineSummaryProgress.Ongoing: return colors.celurenBlue[500].value;
    case EPipelineSummaryProgress.WaitingApproval: return colors.brightYellowCrayola[500].value;
    default: return colors.raisinBlack[300].value;
  }
}

export const PipelineSummaryProgressCard: React.FC<IPipelineSummaryProgressCardProps> = ({
  progress, data, style, onPress,
}) => {
  const themed = useThemedColors();
  const progressColor = getProgressColor(progress);

  const title = String(data?.title ?? data?.name ?? "");
  const subtitle = String(data?.subtitle ?? data?.description ?? "");

  if (isWeb) {
    return (
      <div style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,border:`1px solid ${themed.borderDefault}`,padding:spacing[16].value,cursor:onPress?"pointer":"default",...flattenStyle(style)}}
        onClick={onPress} role={onPress?"button":undefined} tabIndex={onPress?0:undefined}
        onKeyDown={onPress?(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onPress();}}:undefined}
        aria-label={title}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[8].value}}>
          {title && <span style={{color:themed.textPrimary,fontSize:spacing[16].value,fontWeight:600}}>{title}</span>}
          <span style={{backgroundColor:progressColor,color:"#fff",borderRadius:radius.full.value,padding:`${spacing[4].value}px ${spacing[8].value}px`,fontSize:spacing[12].value,fontWeight:600}}>{progress}</span>
        </div>
        {subtitle && <div style={{color:themed.textSecondary,fontSize:spacing[14].value}}>{subtitle}</div>}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  const inner = (
    <View style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,borderWidth:1,borderColor:themed.borderDefault,padding:spacing[16].value,...flattenStyle(style)}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[8].value}}>
        {title ? <Text style={{color:themed.textPrimary,fontSize:spacing[16].value,fontWeight:"600"}}>{title}</Text> : <View/>}
        <View style={{backgroundColor:progressColor,borderRadius:radius.full.value,paddingHorizontal:spacing[8].value,paddingVertical:spacing[4].value}}>
          <Text style={{color:"#fff",fontSize:spacing[12].value,fontWeight:"600"}}>{progress}</Text>
        </View>
      </View>
      {subtitle ? <Text style={{color:themed.textSecondary,fontSize:spacing[14].value}}>{subtitle}</Text> : null}
    </View>
  );
  if (onPress) return <TouchableOpacity onPress={onPress} accessibilityLabel={title}>{inner}</TouchableOpacity>;
  return inner;
};

PipelineSummaryProgressCard.displayName = "PipelineSummaryProgressCard";
export default PipelineSummaryProgressCard;
