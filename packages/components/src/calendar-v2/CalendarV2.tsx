/**
 * CalendarV2 — calendar with date range support.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React, { useState } from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export enum ECalendarViewType {
  Calendar = "Calendar",
  MonthPicker = "MonthPicker",
  YearPicker = "YearPicker",
}

export interface ICalendarV2Props {
  key?: string;
  handleOnChangeDate(date: string): void;
  disableDates?: string[];
  disableMonthsYears?: string[];
  selectedDate: string;
  startDate?: string;
  endDate?: string;
  setStartDate?: (val: string | undefined) => void;
  setEndDate?: (val: string | undefined) => void;
  disableNextDay?: boolean;
  setTitle?: (val: string) => void;
  chosenDateRange?: string[];
  minDate?: string;
  style?: React.CSSProperties | Record<string, unknown>;
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

function isInRange(dateStr: string, start?: string, end?: string): boolean {
  if (!start || !end) return false;
  const d = new Date(dateStr).getTime();
  return d >= new Date(start).getTime() && d <= new Date(end).getTime();
}

export const CalendarV2: React.FC<ICalendarV2Props> = ({
  handleOnChangeDate, disableDates=[], selectedDate, startDate, endDate,
  setStartDate, setEndDate, disableNextDay, minDate: minDateStr, style,
}) => {
  const themed = useThemedColors();
  const init = parseDate(selectedDate);
  const [vy, setVy] = useState(init.getFullYear());
  const [vm, setVm] = useState(init.getMonth());
  const minDate = minDateStr ? parseDate(minDateStr) : undefined;
  const today = new Date(); today.setHours(0,0,0,0);

  const dim = new Date(vy, vm+1, 0).getDate();
  const fd = new Date(vy, vm, 1).getDay();

  function pick(day: number) {
    const ds = fmt(vy, vm, day);
    if (disableDates.includes(ds)) return;
    if (minDate && new Date(ds) < minDate) return;
    if (disableNextDay && new Date(ds) > today) return;
    handleOnChangeDate(ds);
    if (setStartDate && setEndDate) {
      if (!startDate || (startDate && endDate)) { setStartDate(ds); setEndDate(undefined); }
      else if (new Date(ds) < new Date(startDate)) { setStartDate(ds); }
      else { setEndDate(ds); }
    }
  }

  function prev() { if (vm===0){setVm(11);setVy(y=>y-1);}else setVm(m=>m-1); }
  function next() { if (vm===11){setVm(0);setVy(y=>y+1);}else setVm(m=>m+1); }

  const cells: (number|null)[] = [];
  for (let i=0;i<fd;i++) cells.push(null);
  for (let d=1;d<=dim;d++) cells.push(d);

  if (isWeb) {
    return (
      <div style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,border:`1px solid ${themed.borderDefault}`,padding:spacing[16].value,userSelect:"none",...flattenStyle(style)}} role="application" aria-label="Calendar">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[12].value}}>
          <button type="button" onClick={prev} aria-label="Previous month" style={{background:"none",border:"none",cursor:"pointer",color:themed.textPrimary,fontSize:18}}>&#8249;</button>
          <span style={{color:themed.textPrimary,fontWeight:600,fontSize:spacing[16].value}}>{MONTHS_EN[vm]} {vy}</span>
          <button type="button" onClick={next} aria-label="Next month" style={{background:"none",border:"none",cursor:"pointer",color:themed.textPrimary,fontSize:18}}>&#8250;</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:spacing[4].value}}>
          {DAYS_EN.map(d=><div key={d} style={{textAlign:"center",color:themed.textSecondary,fontSize:spacing[12].value,fontWeight:600}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
          {cells.map((day,idx)=>{
            if(day===null) return <div key={`e-${idx}`}/>;
            const ds=fmt(vy,vm,day);
            const isSel=ds===selectedDate;
            const inRange=isInRange(ds,startDate,endDate);
            const isDis=disableDates.includes(ds)||(minDate?new Date(ds)<minDate:false)||(disableNextDay?new Date(ds)>today:false);
            return <button key={ds} type="button" onClick={()=>pick(day)} disabled={isDis} aria-label={ds} aria-pressed={isSel}
              style={{background:isSel?themed.surfaceDark:inRange?themed.bgSecondary:"transparent",color:isSel?themed.textInverse:isDis?themed.textDisabled:themed.textPrimary,border:"none",borderRadius:radius.full.value,width:32,height:32,cursor:isDis?"not-allowed":"pointer",fontSize:spacing[14].value,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>{day}</button>;
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
    <View style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,padding:spacing[16].value,...flattenStyle(style)}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[12].value}}>
        <TouchableOpacity onPress={prev} accessibilityLabel="Previous month"><Text style={{color:themed.textPrimary,fontSize:18}}>{"<"}</Text></TouchableOpacity>
        <Text style={{color:themed.textPrimary,fontWeight:"600",fontSize:spacing[16].value}}>{MONTHS_EN[vm]} {vy}</Text>
        <TouchableOpacity onPress={next} accessibilityLabel="Next month"><Text style={{color:themed.textPrimary,fontSize:18}}>{">"}</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:"row",marginBottom:spacing[4].value}}>
        {DAYS_EN.map(d=><View key={d} style={{flex:1,alignItems:"center"}}><Text style={{color:themed.textSecondary,fontSize:spacing[12].value}}>{d}</Text></View>)}
      </View>
      {Array.from({length:Math.ceil(cells.length/7)}).map((_,ri)=>(
        <View key={ri} style={{flexDirection:"row"}}>
          {cells.slice(ri*7,ri*7+7).map((day,ci)=>{
            if(day===null) return <View key={`e-${ri}-${ci}`} style={{flex:1}}/>;
            const ds=fmt(vy,vm,day); const isSel=ds===selectedDate; const inRange=isInRange(ds,startDate,endDate);
            const isDis=disableDates.includes(ds)||(minDate?new Date(ds)<minDate:false)||(disableNextDay?new Date(ds)>today:false);
            return <TouchableOpacity key={ds} onPress={()=>pick(day)} disabled={isDis} accessibilityLabel={ds}
              style={{flex:1,alignItems:"center",justifyContent:"center",height:32,borderRadius:radius.full.value,backgroundColor:isSel?themed.surfaceDark:inRange?themed.bgSecondary:"transparent"}}>
              <Text style={{color:isSel?themed.textInverse:isDis?themed.textDisabled:themed.textPrimary,fontSize:spacing[14].value}}>{day}</Text>
            </TouchableOpacity>;
          })}
        </View>
      ))}
    </View>
  );
};

CalendarV2.displayName = "CalendarV2";
export default CalendarV2;
