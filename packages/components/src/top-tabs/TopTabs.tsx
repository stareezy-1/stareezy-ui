/**
 * TopTabs — tab bar with active indicator and badge support.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React, { useState } from "react";
import { spacing, radius, colors } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export type TopTabItem = {
  key: string;
  label: string;
  route: string;
  badgeCount?: number;
};

export type TopTabsProps = {
  tabs: TopTabItem[];
  setIndex: (index: number) => void;
  containerStyle?: React.CSSProperties | Record<string, unknown>;
  tabStyle?: React.CSSProperties | Record<string, unknown>;
  activeTabStyle?: React.CSSProperties | Record<string, unknown>;
};

export const TopTabs: React.FC<TopTabsProps> = ({
  tabs, setIndex, containerStyle, tabStyle, activeTabStyle,
}) => {
  const themed = useThemedColors();
  const [activeIdx, setActiveIdx] = useState(0);

  function handlePress(idx: number) {
    setActiveIdx(idx);
    setIndex(idx);
  }

  if (isWeb) {
    return (
      <div style={{display:"flex",flexDirection:"row",borderBottom:`2px solid ${themed.borderDefault}`,backgroundColor:themed.bgPrimary,...(containerStyle as React.CSSProperties)}} role="tablist">
        {tabs.map((tab, i) => {
          const isActive = i === activeIdx;
          return (
            <button key={tab.key} type="button" role="tab" aria-selected={isActive} aria-label={tab.label}
              onClick={()=>handlePress(i)}
              style={{position:"relative",padding:`${spacing[12].value}px ${spacing[16].value}px`,background:"none",border:"none",cursor:"pointer",color:isActive?themed.textPrimary:themed.textSecondary,fontWeight:isActive?600:400,fontSize:spacing[14].value,borderBottom:isActive?`2px solid ${themed.surfaceDark}`:"2px solid transparent",marginBottom:-2,...(tabStyle as React.CSSProperties),...(isActive?activeTabStyle as React.CSSProperties:{})}}>
              {tab.label}
              {tab.badgeCount != null && tab.badgeCount > 0 && (
                <span style={{position:"absolute",top:6,right:4,backgroundColor:colors.crimsonRed[500].value,color:"#fff",borderRadius:radius.full.value,fontSize:spacing[10].value,minWidth:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>
                  {tab.badgeCount > 99 ? "99+" : tab.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{flexDirection:"row",borderBottomWidth:2,borderBottomColor:themed.borderDefault,backgroundColor:themed.bgPrimary,...(containerStyle as Record<string,unknown>)}}>
      {tabs.map((tab, i) => {
        const isActive = i === activeIdx;
        return (
          <TouchableOpacity key={tab.key} onPress={()=>handlePress(i)} accessibilityRole="tab" accessibilityState={{selected:isActive}} accessibilityLabel={tab.label}
            style={{position:"relative",padding:spacing[12].value,borderBottomWidth:isActive?2:0,borderBottomColor:isActive?themed.surfaceDark:"transparent",...(tabStyle as Record<string,unknown>),...(isActive?activeTabStyle as Record<string,unknown>:{})}}>
            <Text style={{color:isActive?themed.textPrimary:themed.textSecondary,fontWeight:isActive?"600":"400",fontSize:spacing[14].value}}>{tab.label}</Text>
            {tab.badgeCount != null && tab.badgeCount > 0 && (
              <View style={{position:"absolute",top:6,right:4,backgroundColor:colors.crimsonRed[500].value,borderRadius:radius.full.value,minWidth:16,height:16,alignItems:"center",justifyContent:"center",paddingHorizontal:4}}>
                <Text style={{color:"#fff",fontSize:spacing[10].value}}>{tab.badgeCount > 99 ? "99+" : tab.badgeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

TopTabs.displayName = "TopTabs";
export default TopTabs;
