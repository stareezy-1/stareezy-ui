/**
 * CustomChartTooltip — tooltip card for recharts.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface ICustomChartTooltip {
  data: unknown;
  rightUnit?: string;
  leftUnit?: string;
  intro?: string;
  desc?: string;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export const CustomChartTooltip: React.FC<ICustomChartTooltip> = ({
  data, rightUnit, leftUnit, intro, desc, containerStyle, itemStyle,
}) => {
  const themed = useThemedColors();

  const payload = (data as { active?: boolean; payload?: { name?: string; value?: unknown; color?: string }[]; label?: string } | null);
  if (!payload?.active || !payload?.payload?.length) return null;

  if (isWeb) {
    return (
      <div style={{backgroundColor:themed.bgPrimary,border:`1px solid ${themed.borderDefault}`,borderRadius:radius.md.value,padding:spacing[12].value,boxShadow:`0 2px 8px rgba(0,0,0,0.15)`,...containerStyle}}>
        {payload.label && <div style={{color:themed.textSecondary,fontSize:spacing[12].value,marginBottom:spacing[4].value}}>{payload.label}</div>}
        {intro && <div style={{color:themed.textPrimary,fontSize:spacing[12].value,marginBottom:spacing[4].value}}>{intro}</div>}
        {payload.payload.map((entry, i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:spacing[8].value,...itemStyle}}>
            {entry.color && <span style={{width:8,height:8,borderRadius:"50%",backgroundColor:entry.color,display:"inline-block"}}/>}
            <span style={{color:themed.textSecondary,fontSize:spacing[12].value}}>{entry.name}: </span>
            <span style={{color:themed.textPrimary,fontSize:spacing[12].value,fontWeight:600}}>
              {leftUnit}{String(entry.value ?? "")}{rightUnit}
            </span>
          </div>
        ))}
        {desc && <div style={{color:themed.textTertiary,fontSize:spacing[12].value,marginTop:spacing[4].value}}>{desc}</div>}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{backgroundColor:themed.bgPrimary,borderWidth:1,borderColor:themed.borderDefault,borderRadius:radius.md.value,padding:spacing[12].value,...(containerStyle as Record<string,unknown>)}}>
      {intro && <Text style={{color:themed.textPrimary,fontSize:spacing[12].value}}>{intro}</Text>}
      {payload.payload.map((entry, i) => (
        <View key={i} style={{flexDirection:"row",alignItems:"center",...(itemStyle as Record<string,unknown>)}}>
          <Text style={{color:themed.textSecondary,fontSize:spacing[12].value}}>{entry.name}: </Text>
          <Text style={{color:themed.textPrimary,fontSize:spacing[12].value,fontWeight:"600"}}>{leftUnit}{String(entry.value ?? "")}{rightUnit}</Text>
        </View>
      ))}
      {desc && <Text style={{color:themed.textTertiary,fontSize:spacing[12].value}}>{desc}</Text>}
    </View>
  );
};

CustomChartTooltip.displayName = "CustomChartTooltip";
export default CustomChartTooltip;
