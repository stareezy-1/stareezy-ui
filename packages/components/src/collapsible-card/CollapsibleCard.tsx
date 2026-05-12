/**
 * CollapsibleCard — expandable/collapsible card with chevron.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React, { useState } from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface ICollapsibleProps {
  header: React.ReactNode;
  children: React.ReactNode;
  initialState?: boolean;
  cardStyle?: React.CSSProperties | Record<string, unknown>;
  headerStyle?: React.CSSProperties | Record<string, unknown>;
  headerMargin?: number;
  chevronSize?: number;
  collapsibleContentStyle?: React.CSSProperties | Record<string, unknown>;
  chevronUp?: React.ReactNode;
  chevronDown?: React.ReactNode;
  disable?: boolean;
}

export const CollapsibleCard: React.FC<ICollapsibleProps> = ({
  header, children, initialState=false, cardStyle, headerStyle, headerMargin,
  chevronSize=16, collapsibleContentStyle, chevronUp, chevronDown, disable=false,
}) => {
  const themed = useThemedColors();
  const [isOpen, setIsOpen] = useState(initialState);

  function toggle() {
    if (!disable) setIsOpen(o => !o);
  }

  const defaultChevronUp = chevronUp ?? <span style={{fontSize:chevronSize,color:themed.textSecondary}}>&#8743;</span>;
  const defaultChevronDown = chevronDown ?? <span style={{fontSize:chevronSize,color:themed.textSecondary}}>&#8744;</span>;

  if (isWeb) {
    return (
      <div style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,border:`1px solid ${themed.borderDefault}`,overflow:"hidden",...(cardStyle as React.CSSProperties)}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:spacing[16].value,cursor:disable?"default":"pointer",margin:headerMargin,...(headerStyle as React.CSSProperties)}}
          onClick={toggle} role="button" tabIndex={disable?-1:0} aria-expanded={isOpen}
          onKeyDown={(e)=>{if(!disable&&(e.key==="Enter"||e.key===" ")){e.preventDefault();toggle();}}}>
          <div style={{flex:1}}>{header}</div>
          {isOpen ? defaultChevronUp : defaultChevronDown}
        </div>
        {isOpen && (
          <div style={{padding:spacing[16].value,paddingTop:0,...(collapsibleContentStyle as React.CSSProperties)}}>
            {children}
          </div>
        )}
      </div>
    );
  }
  return (
    <View style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,borderWidth:1,borderColor:themed.borderDefault,overflow:"hidden",...(cardStyle as Record<string,unknown>)}}>
      <TouchableOpacity onPress={toggle} disabled={disable} accessibilityRole="button" accessibilityState={{expanded:isOpen}}
        style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:spacing[16].value,margin:headerMargin,...(headerStyle as Record<string,unknown>)}}>
        <View style={{flex:1}}>{header}</View>
        {isOpen ? defaultChevronUp : defaultChevronDown}
      </TouchableOpacity>
      {isOpen && (
        <View style={{padding:spacing[16].value,paddingTop:0,...(collapsibleContentStyle as Record<string,unknown>)}}>
          {children}
        </View>
      )}
    </View>
  );
};

CollapsibleCard.displayName = "CollapsibleCard";
export default CollapsibleCard;
