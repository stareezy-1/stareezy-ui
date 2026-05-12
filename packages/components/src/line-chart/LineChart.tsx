/**
 * LineChart — web: SVG line chart; RN: placeholder.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface ILineChartData {
  x: string | number;
  y: string | number;
}

export enum ELineChartType {
  Single = "single",
}

export enum ELineChartStyling {
  Old = "old",
  New = "new",
}

export interface ILineChartProps {
  data: ILineChartData[];
  width?: string | number;
  height?: string | number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  type?: ELineChartType;
  styling?: ELineChartStyling;
  style?: React.CSSProperties;
  maxY?: number;
  lineColor?: string;
  xLabel?: string;
  yLabel?: string;
  labelFormatter?: (label: unknown, payload: unknown[]) => React.ReactNode;
  tooltipFormatter?: string;
  tooltipContent?: React.ReactNode;
  yDomain?: [number | string, number | string];
  xDomain?: [number | string, number | string];
}

export const LineChart: React.FC<ILineChartProps> = ({
  data, width=300, height=200, margin={top:20,right:20,bottom:30,left:40},
  lineColor, xLabel, yLabel, style,
}) => {
  const themed = useThemedColors();
  const color = lineColor ?? themed.surfaceDark;

  if (!isWeb) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports

    const { Text } = require("react-native") as {

      Text:React.ComponentType<Record<string,unknown>>;

    };
    return (
      <View style={{backgroundColor:themed.bgSecondary,borderRadius:8,padding:spacing[16].value,alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:themed.textSecondary,fontSize:spacing[14].value}}>LineChart (web only)</Text>
      </View>
    );
  }

  const mt = margin?.top ?? 20;
  const mr = margin?.right ?? 20;
  const mb = margin?.bottom ?? 30;
  const ml = margin?.left ?? 40;
  const w = typeof width === "number" ? width : 300;
  const h = typeof height === "number" ? height : 200;
  const innerW = w - ml - mr;
  const innerH = h - mt - mb;

  if (!data || data.length === 0) {
    return <div style={{width:w,height:h,display:"flex",alignItems:"center",justifyContent:"center",color:themed.textSecondary,...style}}>No data</div>;
  }

  const yVals = data.map(d => Number(d.y));
  const minY = Math.min(...yVals);
  const maxY = Math.max(...yVals);
  const yRange = maxY - minY || 1;

  const points = data.map((d, i) => {
    const px = (i / (data.length - 1 || 1)) * innerW + ml;
    const py = innerH - ((Number(d.y) - minY) / yRange) * innerH + mt;
    return `${px},${py}`;
  });

  const pathD = points.reduce((acc, pt, i) => acc + (i === 0 ? `M${pt}` : ` L${pt}`), "");

  return (
    <div style={{...style}}>
      <svg width={w} height={h} aria-label="Line chart">
        <polyline fill="none" stroke={color} strokeWidth={2} points={points.join(" ")} />
        {xLabel && <text x={w/2} y={h-2} textAnchor="middle" fontSize={spacing[12].value} fill={themed.textSecondary}>{xLabel}</text>}
        {yLabel && <text x={12} y={h/2} textAnchor="middle" fontSize={spacing[12].value} fill={themed.textSecondary} transform={`rotate(-90,12,${h/2})`}>{yLabel}</text>}
        {data.map((d, i) => {
          const [px, py] = (points[i] ?? "0,0").split(",").map(Number);
          return <circle key={i} cx={px} cy={py} r={3} fill={color} />;
        })}
        <line x1={ml} y1={mt} x2={ml} y2={mt+innerH} stroke={themed.borderDefault} strokeWidth={1}/>
        <line x1={ml} y1={mt+innerH} x2={ml+innerW} y2={mt+innerH} stroke={themed.borderDefault} strokeWidth={1}/>
      </svg>
    </div>
  );
};

LineChart.displayName = "LineChart";
export default LineChart;
