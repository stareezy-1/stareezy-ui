/**
 * UploadPhoto — upload area with image preview.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */
import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export enum EButtonEditPositionUploadPhoto {
  inImage = "In-Image",
  inTop = "In-Top",
}

export interface IUploadPhotoProps {
  title?: string;
  onPress?: () => void;
  image: string;
  isRequired?: boolean;
  errorMessage?: string;
  isDetail?: boolean;
  buttonEditPosition?: EButtonEditPositionUploadPhoto;
  isDisabled?: boolean;
  testID?: string;
  style?: React.CSSProperties | Record<string, unknown>;
  centerText?: string;
  isFile?: boolean;
}

export const UploadPhoto: React.FC<IUploadPhotoProps> = ({
  title, onPress, image, isRequired=false, errorMessage, isDetail=false,
  buttonEditPosition=EButtonEditPositionUploadPhoto.inImage, isDisabled=false,
  testID, style, centerText, isFile=false,
}) => {
  const themed = useThemedColors();
  const hasImage = !!image;

  if (isWeb) {
    return (
      <div style={{display:"flex",flexDirection:"column",gap:spacing[8].value,...(style as React.CSSProperties)}} data-testid={testID}>
        {title && (
          <div style={{color:themed.textPrimary,fontSize:spacing[14].value,fontWeight:600}}>
            {title}{isRequired && <span style={{color:themed.textDanger,marginLeft:2}}>*</span>}
          </div>
        )}
        <div style={{position:"relative",display:"inline-block"}}>
          {hasImage ? (
            <div style={{position:"relative"}}>
              <img src={image} alt={title ?? "Upload"} style={{borderRadius:radius.md.value,maxWidth:"100%",display:"block"}} aria-label={title ?? "Uploaded photo"}/>
              {!isDetail && !isDisabled && buttonEditPosition===EButtonEditPositionUploadPhoto.inImage && (
                <button type="button" onClick={onPress} aria-label="Edit photo"
                  style={{position:"absolute",bottom:spacing[8].value,right:spacing[8].value,backgroundColor:"rgba(0,0,0,0.6)",color:"#fff",border:"none",borderRadius:radius.sm.value,padding:`${spacing[4].value}px ${spacing[8].value}px`,cursor:"pointer",fontSize:spacing[12].value}}>
                  Edit
                </button>
              )}
            </div>
          ) : (
            <button type="button" onClick={onPress} disabled={isDisabled} aria-label={title ?? "Upload photo"}
              style={{width:120,height:120,borderRadius:radius.md.value,border:`2px dashed ${isDisabled?themed.borderSecondary:themed.borderDefault}`,backgroundColor:isDisabled?themed.bgDisabled:themed.bgPrimary,cursor:isDisabled?"not-allowed":"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:spacing[8].value}}>
              <span style={{fontSize:32,color:themed.textTertiary}}>&#43;</span>
              {centerText && <span style={{color:themed.textSecondary,fontSize:spacing[12].value,textAlign:"center"}}>{centerText}</span>}
              {isFile && <span style={{color:themed.textTertiary,fontSize:spacing[12].value}}>File</span>}
            </button>
          )}
          {!isDetail && !isDisabled && hasImage && buttonEditPosition===EButtonEditPositionUploadPhoto.inTop && (
            <button type="button" onClick={onPress} aria-label="Edit photo"
              style={{position:"absolute",top:spacing[4].value,right:spacing[4].value,backgroundColor:"rgba(0,0,0,0.6)",color:"#fff",border:"none",borderRadius:radius.sm.value,padding:`${spacing[4].value}px ${spacing[8].value}px`,cursor:"pointer",fontSize:spacing[12].value}}>
              Edit
            </button>
          )}
        </div>
        {errorMessage && <div style={{color:themed.textDanger,fontSize:spacing[12].value}}>{errorMessage}</div>}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text, Image } = require("react-native") as {

    Text:React.ComponentType<Record<string,unknown>>; Image:React.ComponentType<Record<string,unknown>>;

  };
  return (
    <View style={{...(style as Record<string,unknown>)}} testID={testID}>
      {title && (
        <View style={{flexDirection:"row",marginBottom:spacing[8].value}}>
          <Text style={{color:themed.textPrimary,fontSize:spacing[14].value,fontWeight:"600"}}>{title}</Text>
          {isRequired && <Text style={{color:themed.textDanger,marginLeft:2}}>{"*"}</Text>}
        </View>
      )}
      <View style={{position:"relative"}}>
        {hasImage ? (
          <View>
            <Image source={{uri:image}} style={{borderRadius:radius.md.value,width:120,height:120}} accessibilityLabel={title ?? "Uploaded photo"}/>
            {!isDetail && !isDisabled && (
              <TouchableOpacity onPress={onPress} accessibilityLabel="Edit photo"
                style={{position:"absolute",bottom:spacing[8].value,right:spacing[8].value,backgroundColor:"rgba(0,0,0,0.6)",borderRadius:radius.sm.value,paddingHorizontal:spacing[8].value,paddingVertical:spacing[4].value}}>
                <Text style={{color:"#fff",fontSize:spacing[12].value}}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={onPress} disabled={isDisabled} accessibilityLabel={title ?? "Upload photo"}
            style={{width:120,height:120,borderRadius:radius.md.value,borderWidth:2,borderStyle:"dashed",borderColor:isDisabled?themed.borderSecondary:themed.borderDefault,backgroundColor:isDisabled?themed.bgDisabled:themed.bgPrimary,alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:32,color:themed.textTertiary}}>{"+"}</Text>
            {centerText && <Text style={{color:themed.textSecondary,fontSize:spacing[12].value,textAlign:"center"}}>{centerText}</Text>}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={{color:themed.textDanger,fontSize:spacing[12].value,marginTop:spacing[4].value}}>{errorMessage}</Text>}
    </View>
  );
};

UploadPhoto.displayName = "UploadPhoto";
export default UploadPhoto;
