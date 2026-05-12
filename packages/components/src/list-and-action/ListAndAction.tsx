/**
 * ListAndAction — list with grouped items and sub-items.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IListAndActionItem {
  title: string;
  child: { title: string; subTitle: string; }[];
}

export interface IListAndActionProps {
  items: IListAndActionItem;
  testID?: string;
}

export const ListAndAction: React.FC<IListAndActionProps> = ({ items, testID }) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <div style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,border:`1px solid ${themed.borderDefault}`,overflow:"hidden"}} data-testid={testID}>
        <div style={{padding:`${spacing[12].value}px ${spacing[16].value}px`,backgroundColor:themed.bgSecondary,borderBottom:`1px solid ${themed.borderDefault}`}}>
          <span style={{color:themed.textPrimary,fontSize:spacing[14].value,fontWeight:600}}>{items.title}</span>
        </div>
        {items.child.map((c, i) => (
          <div key={i} style={{padding:`${spacing[12].value}px ${spacing[16].value}px`,borderBottom:i<items.child.length-1?`1px solid ${themed.borderDefault}`:"none",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:themed.textPrimary,fontSize:spacing[14].value}}>{c.title}</div>
              <div style={{color:themed.textSecondary,fontSize:spacing[12].value,marginTop:spacing[2].value}}>{c.subTitle}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{backgroundColor:themed.bgPrimary,borderRadius:radius.xl.value,borderWidth:1,borderColor:themed.borderDefault,overflow:"hidden"}} testID={testID}>
      <View style={{padding:spacing[12].value,backgroundColor:themed.bgSecondary,borderBottomWidth:1,borderBottomColor:themed.borderDefault}}>
        <Text style={{color:themed.textPrimary,fontSize:spacing[14].value,fontWeight:"600"}}>{items.title}</Text>
      </View>
      {items.child.map((c, i) => (
        <View key={i} style={{padding:spacing[12].value,borderBottomWidth:i<items.child.length-1?1:0,borderBottomColor:themed.borderDefault}}>
          <Text style={{color:themed.textPrimary,fontSize:spacing[14].value}}>{c.title}</Text>
          <Text style={{color:themed.textSecondary,fontSize:spacing[12].value,marginTop:spacing[2].value}}>{c.subTitle}</Text>
        </View>
      ))}
    </View>
  );
};

ListAndAction.displayName = "ListAndAction";
export default ListAndAction;
