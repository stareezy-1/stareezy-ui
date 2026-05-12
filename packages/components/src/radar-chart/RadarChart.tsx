/**
 * RadarChart — web: SVG radar chart; RN: placeholder.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IRadarChartData {
  x: string;
  y: number;
  color?: string;
  hideLabel?: boolean;
}

export interface IRadarChartProps {
  data: IRadarChartData[];
  width?: string | number;
  height?: string | number;
  withDotColor?: boolean;
  cx?: string;
  cy?: string;
  outerRadius?: string;
}

export const RadarChart: React.FC<IRadarChartProps> = ({
  data, width=300, height=300, withDotColor=false, cx="50%", cy="50%", outerRadius="80%",
}) => {
  const themed = useThemedColors();

  if (!isWeb) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports

    const { Text } = require("react-native") as {

      Text:React.ComponentType<Record<string,unknown>>;

    };
    return (
      <View style={{backgroundColor:themed.bgSecondary,borderRadius:8,padding:spacing[16].value,alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:themed.textSecondary,fontSize:spacing[14].value}}>RadarChart (web only)</Text>
      </View>
    );
  }

  const w = typeof width === "number" ? width : 300;
  const h = typeof height === "number" ? height : 300;
  const cxNum = w / 2;
  const cyNum = h / 2;
  const r = Math.min(w, h) * 0.4;

  if (!data || data.length === 0) {
    return <div style={{width:w,height:h,display:"flex",alignItems:"center",justifyContent:"center",color:themed.textSecondary}}>No data</div>;
  }

  const n = data.length;
  const maxY = Math.max(...data.map(d => d.y), 1);

  function polarToXY(angle: number, radius: number): [number, number] {
    return [cxNum + radius * Math.cos(angle - Math.PI/2), cyNum + radius * Math.sin(angle - Math.PI/2)];
  }

  const angles = data.map((_, i) => (2 * Math.PI * i) / n);
  const dataPoints = data.map((d, i) => polarToXY(angles[i]!, (d.y / maxY) * r));
  const gridPoints = data.map((_, i) => polarToXY(angles[i]!, r));

  const dataPath = dataPoints.map((p, i) => `${i===0?"M":"L"}${p[0]!},${p[1]!}`).join(" ") + " Z";
  const gridPath = gridPoints.map((p, i) => `${i===0?"M":"L"}${p[0]!},${p[1]!}`).join(" ") + " Z";

  return (
    <svg width={w} height={h} aria-label="Radar chart">
      <polygon points={gridPoints.map(p=>p.join(",")).join(" ")} fill="none" stroke={themed.borderDefault} strokeWidth={1}/>
      {gridPoints.map((p, i) => <line key={i} x1={cxNum} y1={cyNum} x2={p[0]} y2={p[1]} stroke={themed.borderDefault} strokeWidth={1}/>)}
      <path d={dataPath} fill={themed.surfaceDark} fillOpacity={0.2} stroke={themed.surfaceDark} strokeWidth={2}/>
      {withDotColor && dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={data[i]?.color ?? themed.surfaceDark}/>
      ))}
      {data.map((d, i) => {
        if (d.hideLabel) return null;
        const [lx, ly] = polarToXY(angles[i]!, r + 16);
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={spacing[12].value} fill={themed.textSecondary}>{d.x}</text>;
      })}
    </svg>
  );
};

RadarChart.displayName = "RadarChart";
export default RadarChart;
