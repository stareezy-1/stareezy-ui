/**
 * BirthdateCalendar — date picker with age constraints.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React, { useState } from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IBirthdateCalendarProps {
  showModal?: boolean;
  onClose?: () => void;
  onChange?: (v: string) => void;
  minAge?: number;
  maxAge?: number;
}

const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_EN = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function fmt(y: number, m: number, d: number): string {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}

export const BirthdateCalendar: React.FC<IBirthdateCalendarProps> = ({
  showModal=true, onClose, onChange, minAge=0, maxAge=120,
}) => {
  const themed = useThemedColors();
  const now = new Date();
  const maxDate = new Date(now.getFullYear()-minAge, now.getMonth(), now.getDate());
  const minDate = new Date(now.getFullYear()-maxAge, now.getMonth(), now.getDate());

  const [vy, setVy] = useState(maxDate.getFullYear());
  const [vm, setVm] = useState(maxDate.getMonth());
  const [sel, setSel] = useState<string|undefined>();

  if (!showModal) return null;

  const dim = new Date(vy, vm+1, 0).getDate();
  const fd = new Date(vy, vm, 1).getDay();

  function pick(day: number) {
    const ds = fmt(vy, vm, day);
    const d = new Date(ds);
    if (d > maxDate || d < minDate) return;
    setSel(ds); onChange?.(ds);
  }

  function prev() { if (vm===0){setVm(11);setVy(y=>y-1);}else setVm(m=>m-1); }
  function next() { if (vm===11){setVm(0);setVy(y=>y+1);}else setVm(m=>m+1); }

  const cells: (number|null)[] = [];
  for (let i=0;i<fd;i++) cells.push(null);
  for (let d=1;d<=dim;d++) cells.push(d);

  if (isWeb) {
    return (
      <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} role="dialog" aria-modal="true" aria-label="Birthdate picker">
        <div style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,padding:spacing[24].value,minWidth:320}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[16].value}}>
            <span style={{color:themed.textPrimary,fontWeight:700,fontSize:spacing[18].value}}>Select Birthdate</span>
            {onClose && <button type="button" onClick={onClose} aria-label="Close" style={{background:"none",border:"none",cursor:"pointer",color:themed.textSecondary,fontSize:20}}>&#x2715;</button>}
          </div>
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
              const ds=fmt(vy,vm,day); const isSel=ds===sel;
              const d=new Date(ds); const isDis=d>maxDate||d<minDate;
              return <button key={ds} type="button" onClick={()=>pick(day)} disabled={isDis} aria-label={ds} aria-pressed={isSel}
                style={{background:isSel?themed.surfaceDark:"transparent",color:isSel?themed.textInverse:isDis?themed.textDisabled:themed.textPrimary,border:"none",borderRadius:radius.full.value,width:32,height:32,cursor:isDis?"not-allowed":"pointer",fontSize:spacing[14].value,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>{day}</button>;
            })}
          </div>
          {sel && <div style={{marginTop:spacing[12].value,textAlign:"center",color:themed.textSecondary,fontSize:spacing[14].value}}>Selected: {sel}</div>}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text, Modal } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>; Modal:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <Modal visible={showModal} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.5)",alignItems:"center",justifyContent:"center"}}>
        <View style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,padding:spacing[24].value,minWidth:300}}>
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:spacing[16].value}}>
            <Text style={{color:themed.textPrimary,fontWeight:"700",fontSize:spacing[18].value}}>Select Birthdate</Text>
            {onClose && <TouchableOpacity onPress={onClose} accessibilityLabel="Close"><Text style={{color:themed.textSecondary,fontSize:20}}>{"X"}</Text></TouchableOpacity>}
          </View>
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
                const ds=fmt(vy,vm,day); const isSel=ds===sel; const dObj=new Date(ds); const isDis=dObj>maxDate||dObj<minDate;
                return <TouchableOpacity key={ds} onPress={()=>pick(day)} disabled={isDis} accessibilityLabel={ds}
                  style={{flex:1,alignItems:"center",justifyContent:"center",height:32,borderRadius:radius.full.value,backgroundColor:isSel?themed.surfaceDark:"transparent"}}>
                  <Text style={{color:isSel?themed.textInverse:isDis?themed.textDisabled:themed.textPrimary,fontSize:spacing[14].value}}>{day}</Text>
                </TouchableOpacity>;
              })}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

BirthdateCalendar.displayName = "BirthdateCalendar";
export default BirthdateCalendar;
