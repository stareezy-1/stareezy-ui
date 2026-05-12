/**
 * BarChart — web: SVG bar chart; RN: placeholder.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IBarChartData {
  name: string;
  value: number;
  color: string;
}

export interface IBarChartProps {
  data: IBarChartData[];
  height?: string | number;
  width?: string | number;
  xLabel?: string;
  yLabel?: string;
  tooltipContent?: (data: unknown) => React.ReactNode;
  tickFormatter?: (value: number) => string;
}

export const BarChart: React.FC<IBarChartProps> = ({
  data, width=300, height=200, xLabel, yLabel, tickFormatter,
}) => {
  const themed = useThemedColors();

  if (!isWeb) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports

    const { Text } = require("react-native") as {

      Text:React.ComponentType<Record<string,unknown>>;

    };
    return (
      <View style={{backgroundColor:themed.bgSecondary,borderRadius:8,padding:spacing[16].value,alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:themed.textSecondary,fontSize:spacing[14].value}}>BarChart (web only)</Text>
      </View>
    );
  }

  const w = typeof width === "number" ? width : 300;
  const h = typeof height === "number" ? height : 200;
  const mt=20, mr=20, mb=40, ml=50;
  const innerW = w - ml - mr;
  const innerH = h - mt - mb;

  if (!data || data.length === 0) {
    return <div style={{width:w,height:h,display:"flex",alignItems:"center",justifyContent:"center",color:themed.textSecondary}}>No data</div>;
  }

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const barW = innerW / data.length * 0.7;
  const gap = innerW / data.length;

  return (
    <svg width={w} height={h} aria-label="Bar chart">
      <line x1={ml} y1={mt} x2={ml} y2={mt+innerH} stroke={themed.borderDefault} strokeWidth={1}/>
      <line x1={ml} y1={mt+innerH} x2={ml+innerW} y2={mt+innerH} stroke={themed.borderDefault} strokeWidth={1}/>
      {data.map((d, i) => {
        const bh = (d.value / maxVal) * innerH;
        const bx = ml + i * gap + (gap - barW) / 2;
        const by = mt + innerH - bh;
        const label = tickFormatter ? tickFormatter(d.value) : String(d.value);
        return (
          <g key={i}>
            <rect x={bx} y={by} width={barW} height={bh} fill={d.color} rx={2}/>
            <text x={bx+barW/2} y={mt+innerH+14} textAnchor="middle" fontSize={spacing[12].value} fill={themed.textSecondary}>{d.name}</text>
            <text x={bx+barW/2} y={by-4} textAnchor="middle" fontSize={spacing[10].value} fill={themed.textSecondary}>{label}</text>
          </g>
        );
      })}
      {xLabel && <text x={ml+innerW/2} y={h-4} textAnchor="middle" fontSize={spacing[12].value} fill={themed.textSecondary}>{xLabel}</text>}
      {yLabel && <text x={12} y={mt+innerH/2} textAnchor="middle" fontSize={spacing[12].value} fill={themed.textSecondary} transform={`rotate(-90,12,${mt+innerH/2})`}>{yLabel}</text>}
    </svg>
  );
};

BarChart.displayName = "BarChart";
export default BarChart;
