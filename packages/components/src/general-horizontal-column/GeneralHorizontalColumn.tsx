/**
 * GeneralHorizontalColumn — horizontal key-value column layout.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ETextType } from "../primitives/Text";

export { ETextType };

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IGeneralHorizontalColumn {
  title: string;
  values: React.ReactNode[];
  titleWidth?: string | number;
  valuesWidth?: string | number;
  titleType?: ETextType;
}

export const GeneralHorizontalColumn: React.FC<IGeneralHorizontalColumn> = ({
  title, values, titleWidth="40%", valuesWidth="60%",
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start",padding:`${spacing[8].value}px 0`}}>
        <div style={{width:titleWidth,flexShrink:0,paddingRight:spacing[8].value}}>
          <span style={{color:themed.textSecondary,fontSize:spacing[14].value}}>{title}</span>
        </div>
        <div style={{width:valuesWidth,display:"flex",flexDirection:"column",gap:spacing[4].value}}>
          {values.map((v, i) => (
            <div key={i} style={{color:themed.textPrimary,fontSize:spacing[14].value}}>{v}</div>
          ))}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{flexDirection:"row",alignItems:"flex-start",paddingVertical:spacing[8].value}}>
      <View style={{width:titleWidth,paddingRight:spacing[8].value}}>
        <Text style={{color:themed.textSecondary,fontSize:spacing[14].value}}>{title}</Text>
      </View>
      <View style={{flex:1}}>
        {values.map((v, i) => (
          <View key={i} style={{marginBottom:i<values.length-1?spacing[4].value:0}}>
            {typeof v === "string" ? <Text style={{color:themed.textPrimary,fontSize:spacing[14].value}}>{v}</Text> : v as React.ReactElement}
          </View>
        ))}
      </View>
    </View>
  );
};

GeneralHorizontalColumn.displayName = "GeneralHorizontalColumn";
export default GeneralHorizontalColumn;
