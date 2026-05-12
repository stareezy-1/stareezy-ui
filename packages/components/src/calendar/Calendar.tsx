/**
 * Calendar — simple month-grid calendar. No external library.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React, { useState } from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export enum ECalendarType {
  Date = "Date",
  Month = "Month",
  Year = "Year",
  MonthRange = "MonthRange",
  DateMonth = "DateMonth",
  DateMonthYear = "DateMonthYear",
}

export interface OptionsShape {
  backgroundColor?: string;
  textHeaderColor?: string;
  textDefaultColor?: string;
  selectedTextColor?: string;
  mainColor?: string;
  textSecondaryColor?: string;
  borderColor?: string;
  defaultFont?: string;
  headerFont?: string;
  textFontSize?: number;
  textHeaderFontSize?: number;
  headerAnimationDistance?: number;
  daysAnimationDistance?: number;
}

export interface ISelectedMonthRange {
  start: string;
  end: string;
}

export interface ICalendarProps {
  onSelectedChange?: (date: string) => void;
  onMonthYearChange?: () => void;
  onDateChange?: (date: string) => void;
  current?: string;
  selected?: string;
  minimumDate?: string;
  maximumDate?: boolean;
  selectorStartingYear?: number;
  selectorEndingYear?: number;
  disableDateChange?: boolean;
  configs?: Record<string, unknown>;
  reverse?: boolean | "unset";
  options?: OptionsShape;
  mode?: "calendar";
  style?: React.CSSProperties | Record<string, unknown>;
  isEnglish?: boolean;
  isIsoWeek?: boolean;
  selectedIsoWeek?: number;
  dateRangeIsoWeek?: string[];
  setSelectedIsoWeek?: (val: number) => void;
  setDateRangeIsoWeek?: (val: string[]) => void;
  disableNextDay?: boolean;
  isDayPressable?: boolean;
  calendarType?: ECalendarType;
  selectedMonthRange?: ISelectedMonthRange;
  onMonthRangeSelectedChange?: (data: ISelectedMonthRange) => void;
  disableCurrentNextMonth?: boolean;
}

const DAYS_EN = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function parseDate(s?: string): Date {
  if (!s) return new Date();
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date() : d;
}

function fmt(y: number, m: number, d: number): string {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}

export const Calendar: React.FC<ICalendarProps> = ({
  onSelectedChange, onDateChange, current, selected, minimumDate,
  disableDateChange=false, isDayPressable=true, style, options,
}) => {
  const themed = useThemedColors();
  const init = parseDate(current || selected);
  const [vy, setVy] = useState(init.getFullYear());
  const [vm, setVm] = useState(init.getMonth());
  const [sel, setSel] = useState<string|undefined>(selected);
  const minDate = minimumDate ? parseDate(minimumDate) : undefined;
  const dim = new Date(vy, vm+1, 0).getDate();
  const fd = new Date(vy, vm, 1).getDay();

  function pick(day: number) {
    if (!isDayPressable || disableDateChange) return;
    const s = fmt(vy, vm, day);
    if (minDate && new Date(s) < minDate) return;
    setSel(s); onSelectedChange?.(s); onDateChange?.(s);
  }
  function prev() { if (vm===0){setVm(11);setVy(y=>y-1);}else setVm(m=>m-1); }
  function next() { if (vm===11){setVm(0);setVy(y=>y+1);}else setVm(m=>m+1); }

  const bg = options?.backgroundColor ?? themed.bgPrimary;
  const hc = options?.textHeaderColor ?? themed.textPrimary;
  const dc = options?.textDefaultColor ?? themed.textPrimary;
  const sb = options?.mainColor ?? themed.surfaceDark;
  const st = options?.selectedTextColor ?? themed.textInverse;
  const bc = options?.borderColor ?? themed.borderDefault;

  const cells: (number|null)[] = [];
  for (let i=0;i<fd;i++) cells.push(null);
  for (let d=1;d<=dim;d++) cells.push(d);

  if (isWeb) {
    return (
      <div style={{backgroundColor:bg,borderRadius:radius.xl.value,border:`1px solid ${bc}`,padding:spacing[16].value,userSelect:"none",...(style as React.CSSProperties)}} role="application" aria-label="Calendar">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[12].value}}>
          <button type="button" onClick={prev} aria-label="Previous month" style={{background:"none",border:"none",cursor:"pointer",color:hc,fontSize:18}}>&#8249;</button>
          <span style={{color:hc,fontWeight:600,fontSize:spacing[16].value}}>{MONTHS_EN[vm]} {vy}</span>
          <button type="button" onClick={next} aria-label="Next month" style={{background:"none",border:"none",cursor:"pointer",color:hc,fontSize:18}}>&#8250;</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:spacing[4].value}}>
          {DAYS_EN.map(d=><div key={d} style={{textAlign:"center",color:themed.textSecondary,fontSize:spacing[12].value,fontWeight:600}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
          {cells.map((day,idx)=>{
            if(day===null) return <div key={`e-${idx}`}/>;
            const ds=fmt(vy,vm,day); const isSel=ds===sel; const isDis=minDate?new Date(ds)<minDate:false;
            return <button key={ds} type="button" onClick={()=>pick(day)} disabled={isDis||!isDayPressable||disableDateChange} aria-label={ds} aria-pressed={isSel}
              style={{background:isSel?sb:"transparent",color:isSel?st:isDis?themed.textDisabled:dc,border:"none",borderRadius:radius.full.value,width:32,height:32,cursor:isDis?"not-allowed":"pointer",fontSize:spacing[14].value,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>{day}</button>;
          })}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{backgroundColor:bg,borderRadius:radius.xl.value,padding:spacing[16].value,...(style as Record<string,unknown>)}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[12].value}}>
        <TouchableOpacity onPress={prev} accessibilityLabel="Previous month"><Text style={{color:hc,fontSize:18}}>{"<"}</Text></TouchableOpacity>
        <Text style={{color:hc,fontWeight:"600",fontSize:spacing[16].value}}>{MONTHS_EN[vm]} {vy}</Text>
        <TouchableOpacity onPress={next} accessibilityLabel="Next month"><Text style={{color:hc,fontSize:18}}>{">"}</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:"row",marginBottom:spacing[4].value}}>
        {DAYS_EN.map(d=><View key={d} style={{flex:1,alignItems:"center"}}><Text style={{color:themed.textSecondary,fontSize:spacing[12].value}}>{d}</Text></View>)}
      </View>
      {Array.from({length:Math.ceil(cells.length/7)}).map((_,ri)=>(
        <View key={ri} style={{flexDirection:"row"}}>
          {cells.slice(ri*7,ri*7+7).map((day,ci)=>{
            if(day===null) return <View key={`e-${ri}-${ci}`} style={{flex:1}}/>;
            const ds=fmt(vy,vm,day); const isSel=ds===sel; const isDis=minDate?new Date(ds)<minDate:false;
            return <TouchableOpacity key={ds} onPress={()=>pick(day)} disabled={isDis||!isDayPressable||disableDateChange} accessibilityLabel={ds}
              style={{flex:1,alignItems:"center",justifyContent:"center",height:32,borderRadius:radius.full.value,backgroundColor:isSel?sb:"transparent"}}>
              <Text style={{color:isSel?st:isDis?themed.textDisabled:dc,fontSize:spacing[14].value}}>{day}</Text>
            </TouchableOpacity>;
          })}
        </View>
      ))}
    </View>
  );
};

Calendar.displayName = "Calendar";
export default Calendar;
