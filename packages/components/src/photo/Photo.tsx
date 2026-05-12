/**
 * Photo — image with optional close button.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IPhotoProps {
  onPress?: () => void;
  onPressClose?: () => void;
  source?: unknown;
  style?: React.CSSProperties | Record<string, unknown>;
  closeSize?: number;
}

export const Photo: React.FC<IPhotoProps> = ({
  onPress, onPressClose, source, style, closeSize=20,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    const src = typeof source === "string" ? source : (source as { uri?: string })?.uri ?? "";
    return (
      <div style={{position:"relative",display:"inline-block",...(style as React.CSSProperties)}}>
        <img
          src={src}
          alt="Photo"
          onClick={onPress}
          style={{display:"block",borderRadius:radius.md.value,cursor:onPress?"pointer":"default",maxWidth:"100%"}}
          aria-label="Photo"
        />
        {onPressClose && (
          <button type="button" onClick={onPressClose} aria-label="Close photo"
            style={{position:"absolute",top:spacing[4].value,right:spacing[4].value,width:closeSize,height:closeSize,borderRadius:radius.full.value,backgroundColor:"rgba(0,0,0,0.5)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:closeSize*0.6}}>
            &#x2715;
          </button>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Image, Text } = require("react-native") as {

    Image:React.ComponentType<Record<string,unknown>>; Text:React.ComponentType<Record<string,unknown>>;

  };
  const imgSource = typeof source === "string" ? { uri: source } : source;
  return (
    <View style={{position:"relative",...(style as Record<string,unknown>)}}>
      <TouchableOpacity onPress={onPress} disabled={!onPress} accessibilityLabel="Photo">
        <Image source={imgSource} style={{borderRadius:radius.md.value}} accessibilityLabel="Photo"/>
      </TouchableOpacity>
      {onPressClose && (
        <TouchableOpacity onPress={onPressClose} accessibilityLabel="Close photo"
          style={{position:"absolute",top:spacing[4].value,right:spacing[4].value,width:closeSize,height:closeSize,borderRadius:radius.full.value,backgroundColor:"rgba(0,0,0,0.5)",alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"#fff",fontSize:closeSize*0.6}}>{"X"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

Photo.displayName = "Photo";
export default Photo;
